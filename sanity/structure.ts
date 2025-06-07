import type { StructureResolver } from "sanity/structure";
import {
  DocumentIcon,
  CalendarIcon,
  CogIcon,
  EditIcon,
  ComponentIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("WaiMUN")
    .items([
      S.listItem()
        .title("Content")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Content")
            .items([
              S.documentTypeListItem("page").title("Pages").icon(DocumentIcon),
              S.documentTypeListItem("event")
                .title("Events")
                .icon(CalendarIcon),
              S.documentTypeListItem("form").title("Forms").icon(EditIcon),
            ]),
        ),
      S.listItem()
        .title("Website Configuration")
        .icon(CogIcon)
        .child(
          S.list()
            .title("Website Settings")
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
