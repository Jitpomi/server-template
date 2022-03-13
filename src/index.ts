import logger from './logger';
import app from './app';
import fs from 'fs';
import https from 'https';
const port = app.get('port');
import { join, dirname } from 'path';
// @ts-ignore
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import express from '@feathersjs/express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import schema from './graphql/example.schema';

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
console.log('directory-name 👉️', __dirname);

async function listen(port: number) {


  const httpServer = https.createServer({
    key: fs.readFileSync(join(__dirname, '..','ssl', 'example.com+2-key.pem')),
    cert: fs.readFileSync(join(__dirname, '..','ssl', 'example.com+2.pem'))
  }, app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // Call app.setup to initialize all services and SocketIO
  app.setup(httpServer);

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use(express.notFound());
  return new Promise((resolve, reject) => {

    // process.on('unhandledRejection', (reason, p) =>
    //   logger.error('Unhandled Rejection at: Promise ', p, reason)
    // );
    httpServer.listen(port).once('listening', resolve).once('unhandledRejection', reject)
  })
}


(
  async () =>{
    try {
      await listen(port)
      logger.info('GraphQl application started on https://%s:%d/%s', app.get('host'), port,'graphql')
      logger.info('Rest application started on https://%s:%d', app.get('host'), port)
      }catch (reason){
        logger.error('Unhandled Rejection at: Promise ', reason)
    }
  }
)()
