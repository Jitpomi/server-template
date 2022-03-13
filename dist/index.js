import logger from './logger';
import app from './app';
import fs from 'fs';
import https from 'https';
const port = app.get('port');
import { join, dirname } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import schema from './graphql/example.schema';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
console.log('directory-name 👉️', __dirname);
async function listen(port) {
    const httpServer = https.createServer({
        key: fs.readFileSync(join(__dirname, '..', 'ssl', 'example.com+2-key.pem')),
        cert: fs.readFileSync(join(__dirname, '..', 'ssl', 'example.com+2.pem'))
    }, app);
    const apolloServer = new ApolloServer({
        ...schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    // Call app.setup to initialize all services and SocketIO
    app.setup(httpServer);
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    return new Promise((resolve, reject) => {
        // process.on('unhandledRejection', (reason, p) =>
        //   logger.error('Unhandled Rejection at: Promise ', p, reason)
        // );
        httpServer.listen(port).once('listening', resolve).once('unhandledRejection', reject);
    });
}
(async () => {
    try {
        await listen(port);
        logger.info('GraphQl application started on https://%s:%d/%s', app.get('host'), port, 'graphql');
        logger.info('Rest application started on https://%s:%d', app.get('host'), port);
    }
    catch (reason) {
        logger.error('Unhandled Rejection at: Promise ', reason);
    }
})();
