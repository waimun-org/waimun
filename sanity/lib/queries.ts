import { groq } from "next-sanity";

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  ...,
  content[] {
    ...,
  }
}`;

export const PAGES_SLUGS_QUERY = groq`*[_type == "page" && defined(slug.current)]{
  "slug": slug.current
}`;

export const NAVIGATION_QUERY = groq`*[_type == "navigation"][0] {
  ...,
  links[] {
    ...,
  }
}`;

export const FOOTER_QUERY = groq`*[_type == "footer"][0] {
  ...,
  links[] {
    ...,
  }
}`;

export const EVENTS_QUERY = groq`*[_type == "event"] {
  ...,
  image {
    ...,
  }
}`;

export const EVENT_BY_SLUG_QUERY = groq`*[_type == "event" && slug.current == $slug][0] {
  ...,
}`;

export const EVENTS_SLUGS_QUERY = groq`*[_type == "event" && defined(slug.current)]{
  "slug": slug.current
}`;

export const FORM_BY_SLUG_QUERY = groq`*[_type == "form" && slug.current == $slug][0] {
  ...,
  content[] {
    ...,
  }
}`;

export const FORMS_SLUGS_QUERY = groq`*[_type == "form" && defined(slug.current)]{
  "slug": slug.current
}`;

export const FORM_BY_ID_QUERY = groq`*[_type == "form" && _id == $id][0] {
  ...,
  content[] {
    ...,
  }
}`;
