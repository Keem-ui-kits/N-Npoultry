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
        .title('Home Page Content')
        .child(
          S.document()
            .schemaType('homeConfig')
            .documentId('homeConfig')
        ),

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

      S.listItem()
        .title('Founder Story')
        .child(
          S.document()
            .schemaType('founderConfig')
            .documentId('founderConfig')
        ),

      S.listItem()
        .title('Farm Gallery Photos')
        .child(S.documentTypeList('farmPhoto')),
    ])
