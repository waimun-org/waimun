import groq from "groq";

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  ...,
  content[] {
    ...,
  }
}`;

export const HEADER_QUERY = groq`*[_type == "header"][0] {
  ...,
  links[] {
    ...,
  },
  socials[] {
    ...,
  }
}`;

export const FOOTER_QUERY = groq`*[_type == "footer"][0] {
  ...,
  links[] {
    ...,
  },
  socials[] {
    ...,
  }
}`;

export const EVENTS_QUERY = groq`*[_type == "event"] | order(startDate desc) {
  ...,
}`;

export const EVENT_BY_SLUG_QUERY = groq`*[_type == "event" && slug.current == $slug][0] {
  ...
}`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug.current)]{
  "slug": slug.current,
  "lastModified": _updatedAt
}`;

export const EVENTS_SLUGS_QUERY = groq`*[_type == "event" && defined(slug.current)] {
  "slug": slug.current,
  "lastModified": _updatedAt
}`;

export const SITEMAP_QUERY = groq`{
  "pages": *[_type == "page" && defined(slug.current)]{
    "slug": slug.current,
    "lastModified": _updatedAt,
    "priority": select(
      slug.current == "home" => 1.0,
      0.8
    )
  },
  "events": *[_type == "event" && defined(slug.current)]{
    "slug": slug.current,
    "lastModified": _updatedAt,
    "priority": 0.7
  }
}`;
