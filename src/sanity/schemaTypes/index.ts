import { type SchemaTypeDefinition } from "sanity";
import { landingPage } from "./landingPage";
import { seoSettings } from "./seoSettings";
import { navigation } from "./navigation";
import { footer } from "./footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, seoSettings, navigation, footer],
};
