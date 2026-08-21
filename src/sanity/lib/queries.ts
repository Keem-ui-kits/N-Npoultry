import { defineQuery } from "next-sanity";

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    place,
    role,
    quote,
    featured
  }
`);

const articleCardFields = /* groq */ `
  _id,
  "slug": slug.current,
  fieldNote,
  category,
  title,
  excerpt,
  image {
    asset->{ _id, url, metadata { lqip, dimensions } },
    alt
  },
  aspect,
  span
`;

export const ARTICLES_LIST_QUERY = defineQuery(`
  *[_type == "educationArticle"] | order(fieldNote asc) {
    ${articleCardFields},
    "hasFull": defined(full)
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "educationArticle" && slug.current == $slug][0] {
    ${articleCardFields},
    full {
      readTime,
      dek,
      heroAlt,
      heroCaption,
      factRail[] { label, value },
      body[] {
        ...,
        _type == "pullQuote" => { text, attribution }
      },
      farmerTip,
      stats[] { number, label },
      productCrossSell {
        productSlug,
        body
      }
    }
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "educationArticle" && defined(slug.current)].slug.current
`);
