import logger from './logger';
import app from './app';
import fs from 'fs';
import https from 'https';
const port = app.get('port');
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
console.log('directory-name 👉️', __dirname);
// const server = app.listen(port);
process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));
// server.on('listening', () =>
//   logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
// );
const server = https.createServer({
    key: fs.readFileSync(join(__dirname, '..', 'ssl', 'example.com+2-key.pem')),
    cert: fs.readFileSync(join(__dirname, '..', 'ssl', 'example.com+2.pem'))
}, app).listen(port);
// Call app.setup to initialize all services and SocketIO
app.setup(server);
app.set('server', server);
process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: Promise ', p, reason));
server.on('listening', () => logger.info('Feathers application started on https://%s:%d', app.get('host'), port));
