# **replaceToSanity** Prompt Documentation

## Description:

## Generate the Sanity schema and the corresponding code for a new schema in a Sanity project. The prompt will guide the user through the process of creating a new schema, including defining the schema name, fields, and types. It will also handle the necessary imports and updates to various files in the project.

### Steps:

#### 1. **Ask for the schema name**:

- Prompt the user for the name of the Sanity schema:
  "What is the name of the Sanity schema?"

---

#### 2. **Generate the schema file in `@/sanity/schemaTypes`**:

- Create a new file in `@/sanity/schemaTypes/{schemaName}.ts`.
- here an example of the schema file structure with the necessary imports and some of the fields which the file should contain linked to the selected code;
- by default for each string, prefer to use a type array of type block to make a rich text, except for the title
- Add the linked text in initial Value

```typescript
import { defineType } from "sanity";

export const { schemaName } = defineType({
  name: "{schemaName}",
  title: "{SchemaName}",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Title of the project",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "Subtitle of the project",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
    },
    {
      name: "arrayField",
      title: "Array Field",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
            },
            {
              name: "username",
              title: "Username",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
```

#### 3. Update @/sanity/schemaTypes/index.ts:

- Add the schema import to the index.ts file.
- like this :

```typescript
import { type SchemaTypeDefinition } from "sanity";
import { theSchemaTypeToImport } from "./theSchemaTypeToImport";

export const schema: { types: SchemaTypeDefinition[] } = {
  // Add the schema here without deleting the others
  types: [, theSchemaTypeToImport],
};
```

#### 4. Update @/sanity/structure.ts:

- Now we need to import the schema in the structure file
- like this :

```typescript
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("TitleOfTheProject")
    .items([
      // only add the schema here if you want to see it in the studio
      S.documentTypeListItem("exampleToImport").title("Example to Import"),
    ]);
```

#### 5. Update @/sanity/lib/type.ts:

- Create a TypeScript interface for the schema with the fields extracted from the selected code:
- for the image type as a string

```typescript
export interface {SchemaName} {
  title: string;
  subtitle: string;
  description: PortableTextBlock[];
  buttonText: string;
  arrayField: ArrayFieldType[];
  image: string;
}
```

#### 6. Update @/sanity/lib/query.ts:

- Create a query for the schema to fetch the data from Sanity:
- To fetch an image do like this : "image": image.asset->url,

```typescript
import { groq } from "next-sanity";

export const example = groq`*[_type == "example"][0] {
  title,
  subtitle,
  description,
  buttonText,
  socialLinks,
  "image": image.asset->url,
}`;
```

#### 7. Update the selected file:

- Now we need to update the selected file with the new schema
- First, import the query and the type

```typescript
import { exampleQuery } from "@/sanity/lib/query";
import { Example } from "@/sanity/lib/type";
```

- Then, use the query to fetch the data from Sanity:

```typescript
const example: Example = await sanityFetch({
  query: exampleQuery,
  tags: ["example"],
});
```

- Now we need to replace the text with the new schema
- make sure to add PortableText
- And loop on the array that you created in the schema and must be looped if there is an array

```typescript jsx
  <div>
    <h1>{example.title}</h1>
    <h2>{example.subtitle}</h2>
    <PortableText value={example.description} />
    <button>{example.buttonText}</button>
    {example.arrayField.map((item) => (
      <div key={item.platform}>
        <p>{item.platform}</p>
        <p>{item.username}</p>
      </div>
    ))}
    <img src={urlFor(example.image).url()} alt="Image" />
  </div>
```

#### 8. **Final Touches**:

- Verify that all necessary imports are correctly added.
- Run the Sanity Studio to check the new schema.
- Troubleshoot any issues by checking the console and making necessary fixes.
- Ensure the schema is functional in the Sanity Studio.
