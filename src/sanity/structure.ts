import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Resume")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("technology").title("Technologies"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["project", "technology"].includes(item.getId()!),
      ),
    ]);
