import { makeSchema } from 'nexus'
import { join, dirname } from 'path'

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
console.log('directory-name 👉️', __dirname);

export const schema = makeSchema({
  types: [], // 1
  outputs: {
    typegen: join(__dirname, '..','graphql', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'graphql','schema.graphql'),
  },
  shouldExitAfterGenerateArtifacts: process.env.NEXUS_SHOULD_EXIT_AFTER_GENERATE_ARTIFACTS === 'true',
})
