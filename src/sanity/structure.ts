import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("nav").title("Navigation"),
      S.documentTypeListItem("home").title("Home"),
      S.documentTypeListItem("features").title("Features"),
      S.documentTypeListItem("organization").title("Organization"),
      S.documentTypeListItem("ia").title("IA"),
      S.documentTypeListItem("trips").title("Leurs voyages"),
      S.documentTypeListItem("logiciel").title("Logiciel"),
      S.documentTypeListItem("avis").title("Avis"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("footer").title("Footer"),
    ]);
