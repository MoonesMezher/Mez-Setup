const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class SetupLibrary {
    constructor(baseFolder) {
        this.baseFolder = baseFolder;
    }

    createFolder(folderName) {
        const folderPath = path.join(this.baseFolder, folderName);
        return new Promise((resolve, reject) => {
            fs.mkdir(folderPath, { recursive: true }, (err) => {
                if (err) {
                    return reject(`Error creating folder: ${err.message}`);
                }
                resolve(`Folder created: ${folderPath}`);
            });
        });
    }

    createFile(fileName, content) {
        const filePath = path.join(this.baseFolder, fileName);
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    return reject(`Error creating file: ${err.message}`);
                }
                resolve(`File created: ${filePath}`);
            });
        });
    }

    createFileWithContent(fileName, content) {
        return this.createFile(fileName, content);
    }

    runCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    return reject(`Error executing command: ${err.message}`);
                }
                if (stderr) {
                    return reject(`Command stderr: ${stderr}`);
                }
                resolve(`Command output: ${stdout}`);
            });
        });
    }

    updatePackageJson(file) {
        // Step 1: Read the existing package.json
        const packageJsonPath = path.join(this.baseFolder, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            // Create the file if it doesn't exist
            fs.writeFileSync(packageJsonPath, '{}');
            // console.log('package.json file created!');
        }

        fs.readFile(packageJsonPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading package.json:', err);
                return;
            }

            // Step 2: Parse the JSON
            let packageJson;
            try {
                packageJson = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing package.json:', parseError);
                return;
            }

            // Step 3: Modify the object to add overrides
            packageJson = {
                "name": "express-app",
                "version": "1.0.0",
                "description": "",
                "main": "app.js",
                "scripts": {
                    "start": "node src/server.js",
                    "build": "npm run build:prod",
                    "watch": "nodemon --watch src/app.js --watch ./package.json --exec npm run start",
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "author": "CR7",
                "license": "ISC"
            };

            // Step 4: Write back to package.json
            fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (writeError) => {
                if (writeError) {
                    console.error('Error writing package.json:', writeError);
                    return;
                }
                // console.log('package.json updated successfully!');
            });
    });
}
}

module.exports = SetupLibrary;