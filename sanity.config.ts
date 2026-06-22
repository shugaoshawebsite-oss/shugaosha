import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { projectId, dataset } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Shugaosha Admin Studio',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
})
