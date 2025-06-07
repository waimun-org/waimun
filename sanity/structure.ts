import type { StructureResolver } from "sanity/structure";
import {
  DocumentIcon,
  CalendarIcon,
  CogIcon,
  EditIcon,
  ComponentIcon,
  DocumentTextIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("WaiMUN")
    .items([
      S.documentTypeListItem("page").title("Pages").icon(DocumentIcon),
      S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
      S.documentTypeListItem("post").title("Posts").icon(DocumentTextIcon),
      S.documentTypeListItem("form").title("Forms").icon(EditIcon),
      S.divider(),
      S.listItem()
        .title("Settings")
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
