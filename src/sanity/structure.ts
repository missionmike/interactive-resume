import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Interactive Resume")
    .items([
      S.documentTypeListItem("company").title("Companies"),
      S.documentTypeListItem("position").title("Positions"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("technology").title("Technologies"),
    ]);
