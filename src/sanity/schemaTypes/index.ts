import { type SchemaTypeDefinition } from "sanity";
import { avis } from "./avis";
import { blog } from "./blog";
import { faq } from "./faq";
import { features } from "./features";
import { footer } from "./footer";
import { home } from "./home";
import { ia } from "./ia";
import { logiciel } from "./logiciel";
import { nav } from "./nav";
import { organization } from "./organization";
import { trips } from "./trips";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    nav,
    home,
    features,
    organization,
    ia,
    trips,
    logiciel,
    avis,
    faq,
    footer,
    blog,
  ],
};
