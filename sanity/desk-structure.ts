import type { StructureResolver } from "sanity/structure";
import {
  DocumentIcon,
  CalendarIcon,
  CogIcon,
  ComponentIcon,
  ImagesIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("WaiMUN")
    .items([
      S.documentTypeListItem("page").title("Pages").icon(DocumentIcon),
      S.listItem()
        .title("Galleries")
        .icon(ImagesIcon)
        .child(
          S.documentList()
            .title("Galleries")
            .schemaType("page")
            .filter(
              '_type == "page" && count(content[_type == "gallery"]) > 0',
            ),
        ),
      S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
      S.divider(),
      S.listItem()
        .title("Settings")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Settings")
            .items([
              S.listItem()
                .title("Header")
                .icon(ComponentIcon)
                .child(
                  S.editor()
                    .id("header")
                    .schemaType("header")
                    .documentId("header"),
                ),
              S.listItem()
                .title("Footer")
                .icon(ComponentIcon)
                .child(
                  S.editor()
                    .id("footer")
                    .schemaType("footer")
                    .documentId("footer"),
                ),
            ]),
        ),
    ]);
