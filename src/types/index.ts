export type SchemaProps = {
    fieldName: string,
    fieldType: string,
    children: SchemaProps[],
};

export type JsonSchemaObject = {
  [key: string]: string | JsonSchemaObject;
};

// export type SchemaType = {
//     [key: string] : string | SchemaType
// }