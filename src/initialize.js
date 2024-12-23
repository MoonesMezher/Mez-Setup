const content = require('./content');
const SetupLibrary = require('./setup');

const setup = new SetupLibrary(process.cwd());

async function initialize() {
    try {
        setup.updatePackageJson();
        await setup.createFolder('src')
        await setup.createFileWithContent('.env', content.expressEnvCode)
        await setup.createFile('.gitignore', 'node_modules')
        await setup.createFileWithContent('src/server.js', content.expressServerCode)
        await setup.createFileWithContent('src/app.js', content.expressAppCode)
        await setup.createFolder('src/routes')
        await setup.createFileWithContent('src/routes/users.routes.js', content.expressRouteApp)
        await setup.createFolder('src/models')
        await setup.createFileWithContent('src/models/User.js', content.expressUserModel)
        await setup.createFolder('src/controllers')
        await setup.createFileWithContent('src/controllers/users.controllers.js', content.expressUsersController)
        await setup.createFolder('src/helpers')
        await setup.createFileWithContent('src/helpers/generateJWTSecret.helpers.js', content.expressGenerateJWTSecretKey)
        await setup.createFolder('src/middlewares');
        await setup.createFileWithContent('src/middlewares/checkFromId.js', content.middlewareCheckFromId);
        await setup.runCommand('npm i express nodemon mongoose cors dotenv morgan jsonwebtoken password-hash')
    } catch (error) {
        console.error(error);
    }
}

module.exports = initialize;