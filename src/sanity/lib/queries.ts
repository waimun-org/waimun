import { groq } from "next-sanity";

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0] {
  ...,
  content[] {
    ...,
  }
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
}`;

export const EVENT_QUERY = groq`*[_type == "event" && slug.current == $slug][0] {
  ...,
}`;

export const FORM_QUERY = groq`*[_type == "form" && slug.current == $slug][0] {
  ...,
  content[] {
    ...,
  }
}`;
