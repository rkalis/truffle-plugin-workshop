# Truffle University - Plugin Creation Workshop
This repository contains the example code for the plugin creation workshop as part of Truffle University. The repository contains a simple Express server that connects with a local MongoDB instance and exposes an API to store artifacts and count the numebr of stored artifacts. Additionally the repository contains a simple truffle project that integrates `truffle-plugin-store`. The `master` branch merely contains boilerplate for this plugin, whereas the `reference` branch contains an implementation for it.

## Prerequisites
To complete this workshop, you need Node.js, Truffle, and MongoDB installed locally.

1. [Install Node.js](https://nodejs.org/en/download/)
2. Install Truffle
    ```
    npm install -g truffle
    ```
3. [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Running the server
Make sure MongoDB is running locally, either as a service or as a standalone process through `mongod`.

```bash
cd artifact-storage-server
npm install
npm start
```

Keep the server running during the rest of the workshop.

## Using truffle-plugin-store
Compile the contracts in the `simplestorage/` directory and run the plugin's store function.

```
cd simplestorage
npm install
truffle compile
truffle run store SimpleStorage
```

In case of the boilerplate code, this will simply output `hello` to the console.

## Implementing truffle-plugin-store
To actually add utility to the plugin, we can implement the requirements.

1. A contract name is passed as a positional argument (`truffle run store SimpleStorage`).
2. The build artifact of the specified contract is sent as a body parameter with name `artifact` to the storage server.
3. An optional `url` parameter can be passed in, while the default is `http://localhost:3000/artifacts`.
4. The stored artifact count is retrieved from the storage server at `http://localhost:3000/artifacts/${contractName}`.
5. The results are meaningfully logged to the console.

Since the boilerplate code is set up to integrate `truffle-plugin-store` into `simplestorage` already, there are no extra steps, and only the `store.js` file needs to be changed.
