import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Interactive Resume")
    .items([
      S.listItem().title("Theme Options").child(
        S.editor().id("themeOptions").schemaType("themeOptions").documentId("themeOptions"), // Ensure only one document
      ),
      S.documentTypeListItem("skill").title("Skills"),
      S.documentTypeListItem("company").title("Companies"),
      S.documentTypeListItem("position").title("Positions"),
      S.documentTypeListItem("education").title("Education"),
    ]);
