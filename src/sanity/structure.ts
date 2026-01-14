import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Landing Page
      S.listItem()
        .title("Landing Page")
        .icon(() => "🏠")
        .child(
          S.document()
            .schemaType("landingPage")
            .documentId("landingPage")
        ),

      // Divider
      S.divider(),

      // Global Settings Section
      S.listItem()
        .title("Global Settings")
        .icon(() => "⚙️")
        .child(
          S.list()
            .title("Global Settings")
            .items([
              S.listItem()
                .title("SEO Settings")
                .icon(() => "🔍")
                .child(
                  S.document()
                    .schemaType("seoSettings")
                    .documentId("seoSettings")
                ),
              S.listItem()
                .title("Navigation")
                .icon(() => "🧭")
                .child(
                  S.document()
                    .schemaType("navigation")
                    .documentId("navigation")
                ),
              S.listItem()
                .title("Footer")
                .icon(() => "🦶")
                .child(
                  S.document()
                    .schemaType("footer")
                    .documentId("footer")
                ),
            ])
        ),
    ]);
