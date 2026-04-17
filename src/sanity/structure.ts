import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('N&N Poultry Palace')
    .items([
      S.listItem()
        .title('Products')
        .child(S.documentTypeList('product')),

      S.listItem()
        .title('Testimonials')
        .child(S.documentTypeList('testimonial')),

      S.listItem()
        .title('Education Articles')
        .child(S.documentTypeList('educationArticle')),

      S.divider(),

      S.listItem()
        .title('Site Configuration')
        .child(
          S.document()
            .schemaType('siteConfig')
            .documentId('siteConfig')
        ),

      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .schemaType('aboutConfig')
            .documentId('aboutConfig')
        ),
    ])
