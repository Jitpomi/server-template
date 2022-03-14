# server-template

> rest grapghql and websockets api for the training app

## About

This project's rest api is powered by [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

This graphql api is powered by:
~ [Apollo Express Server](https://github.com/apollographql/apollo-server). an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.
~ [Nexus](https://github.com/graphql-nexus/nexus) A Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/training-server
    npm install
    ```
    
 2. Create an ssl/ directory, [install mkcert](https://www.gogetssl.com/wiki/ssl-basics/ssl-for-localhost/) and use it to [generate an SSL certificate](https://words.filippo.io/mkcert-valid-https-certificates-for-localhost/) to use in development following these commands (If you're a Macos Users)

    ```
    brew install mkcert
    brew install nss # if you use Firefox
    mkcert -install
    ```   

4. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
