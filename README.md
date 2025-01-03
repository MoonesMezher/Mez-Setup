# mez-setup

It is a pure and open source node js library that provides easy setup and helpfull structure

## First lunch
**Date**: 2024-12-23

## Installation
```sh
$ npm install --save mez-setup
```

## How it works?
You must make these steps:
- 1) Make initial app
```sh
    $ npm init -y
```
- 2) Install the library
```sh
    $ npm install --save mez-setup
```
- 3) Create index.js file
- 4) Inside index.js file add this
```sh
    const initialize = require("mez-setup");

    initialize(__dirname);
```
- 5) Run this command
```sh
    $ node index.js
```
- 6) You did it :)
Now you will be able to see the MVC structure and the initial configuration and files

## Files structure
```sh
    - >node_modules
    - >src
        - >controllers
        - >helpers
        - >middlewares
        - >models
        - >routes
        - app.js 
        - server.js
    - .gitignore
    - .env
    - package.json
```

## License

[MIT](LICENSE)