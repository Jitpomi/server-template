import { makeSchema } from 'nexus';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
console.log('directory-name 👉️', __dirname);
export const schema = makeSchema({
    types: [],
    outputs: {
        typegen: join(__dirname, '..', 'graphql', 'nexus-typegen.ts'),
        schema: join(__dirname, '..', 'graphql', 'schema.graphql'), // 3
    },
});
//# sourceMappingURL=schema.js.map