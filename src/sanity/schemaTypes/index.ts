import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { avis } from "./avis";
import { blogPost } from "./blogPost";
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
    author,
    blogPost,
  ],
};
