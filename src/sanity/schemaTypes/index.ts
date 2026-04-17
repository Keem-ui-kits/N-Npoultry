import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import testimonial from './testimonial'
import educationArticle from './educationArticle'
import siteConfig from './siteConfig'
import { aboutConfigType } from './aboutConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, testimonial, educationArticle, siteConfig, aboutConfigType],
}
