import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'N&N poultry palace',

  projectId: 'ik167lhg',
  dataset: 'freshbuild',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
