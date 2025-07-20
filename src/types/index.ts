export type SchemaProps = {
    fieldName: string,
    fieldType: string,
    children: SchemaProps[],
};

export type SchemaType = {
    [key: string] : string | SchemaType
}

// [
//       {
//         fieldName: "name 1",
//         fieldType: "string",
//         children: []
//       },
//       {
//         fieldName: "name 2",
//         fieldType: "string",
//         children: []
//       },
//       {
//         fieldName: "name 3",
//         fieldType: "nested",
//         children: [
//           {
//             fieldName: "name 31",
//             fieldType: "string",
//             children: []
//           },
//           {
//             fieldName: "name 32",
//             fieldType: "string",
//             children: []
//           },
//         ]
//       },
//       {
//         fieldName: "name 2",
//         fieldType: "string",
//         children: []
//       },
//     ]

