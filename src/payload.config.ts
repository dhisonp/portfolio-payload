import path from 'path';

import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import Users from './collections/Users';
import Section from './collections/Section';
import Bio from './globals/Bio';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  collections: [Users, Section],
  globals: [Bio],
  editor: lexicalEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
});
