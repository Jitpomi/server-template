import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
console.log('directory-name 👉️', __dirname);
export default __dirname;
//# sourceMappingURL=__dirname.js.map