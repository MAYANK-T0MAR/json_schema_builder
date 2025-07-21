"use client"

import SchemaField from "@/components/common/SchemaField";
import { useCallback, useState } from "react";
import { Bug, Check, Copy, ExternalLink, Plus, Star, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonSchemaObject, SchemaProps } from "@/types";
import CodeBlock from "@/components/common/CodeBlock";



export default function Home() {
  const demoSchema: SchemaProps[] = [
    { fieldName: "Name", fieldType: "nested", children: [{ fieldName: "First Name", fieldType: "string", children: [] }, { fieldName: "Middle Name", fieldType: "string", children: [] }, { fieldName: "Last Name", fieldType: "string", children: [] }] },
    { fieldName: "Phone", fieldType: "number", children: [] },
    { fieldName: "Address", fieldType: "nested", children: [{ fieldName: "City", fieldType: "string", children: [] }, { fieldName: "State", fieldType: "string", children: [] }] },
  ]
  const [schema, setSchema] = useState<SchemaProps[]>(demoSchema);
  const jsonString = JSON.stringify(convertSchemaToObject(schema), null, 2);
  const [copied, setCopied] = useState(false);

  function convertSchemaToObject(schema: SchemaProps[]): JsonSchemaObject {
    const result: JsonSchemaObject = {};

    for (const field of schema) {
      const type = field.fieldType.trim().toLowerCase();

      if (type === "nested") {
        // console.log("Parsing nested field:", field.fieldName);
        result[field.fieldName] = convertSchemaToObject(field.children);
      } else {
        result[field.fieldName] = type;
      }
    }

    return result;
  }



  const addChildren = (path: number[]) => {
    setSchema((prev) => {
      const child: SchemaProps = {
        fieldName: "",
        fieldType: "",
        children: [],
      };

      const newSchema = structuredClone(prev);

      if (path.length === 0) {
        newSchema.push(child);
        return newSchema;
      }

      let currentLevel = newSchema;
      for (let i = 0; i < path.length; i++) {
        const index = path[i];
        if (i === path.length - 1) {
          currentLevel[index].children.push(child);
        } else {
          currentLevel = currentLevel[index].children;
        }
      }

      return newSchema;
    });
  };

  const updateFieldName = useCallback(
    (path: number[], newValue: string) => {
      setSchema((prev) => {
        const newSchema = structuredClone(prev);
        let currentLevel: SchemaProps[] = newSchema;

        for (let i = 0; i < path.length; i++) {
          const index = path[i];
          if (i === path.length - 1) {
            currentLevel[index].fieldName = newValue;
          } else {
            currentLevel = currentLevel[index].children;
          }
        }
        return newSchema;
      })
    }, []
  )


  const updateFieldType = useCallback(
    (path: number[], newType: string) => {
      setSchema((prev) => {
        const newSchema = structuredClone(prev);
        let currentLevel = newSchema;

        for (let i = 0; i < path.length; i++) {
          const index = path[i];

          if (i === path.length - 1) {
            const field = currentLevel[index];

            const isCurrentlyNested = field.fieldType === "nested";
            const isBecomingNested = newType === "nested";

            // Toggle OFF behavior for nested (clear both type and children)
            if (isCurrentlyNested && isBecomingNested) {
              field.fieldType = "";
              field.children = [];
              return newSchema;
            }

            // Transition from nested to non-nested
            if (isCurrentlyNested && !isBecomingNested) {
              field.fieldType = newType;
              field.children = []; // wipe children
              return newSchema;
            }

            // Transition from non-nested to nested
            if (!isCurrentlyNested && isBecomingNested) {
              field.fieldType = "nested";
              field.children = [
                {
                  fieldName: "",
                  fieldType: "",
                  children: []
                }
              ];
              return newSchema;
            }

            // Toggle off for same non-nested type
            if (!isBecomingNested && field.fieldType === newType) {
              field.fieldType = "";
              return newSchema;
            }

            // Change between primitive types
            if (!isBecomingNested && field.fieldType !== newType) {
              field.fieldType = newType;
              return newSchema;
            }

            return newSchema; // fallback
          } else {
            currentLevel = currentLevel[index].children;
          }
        }

        return newSchema;
      });
    },
    []
  );


  const deleteField = useCallback((path: number[]) => {
    setSchema((prev) => {
      const newSchema = structuredClone(prev);

      // Handle root-level deletion
      if (path.length === 1) {
        newSchema.splice(path[0], 1);
        return newSchema;
      }

      // Traverse to parent of the node to be deleted
      let currentLevel = newSchema;
      for (let i = 0; i < path.length - 2; i++) {
        currentLevel = currentLevel[path[i]].children;
      }

      const parentIndex = path[path.length - 2];
      const targetIndex = path[path.length - 1];

      const parentNode = currentLevel[parentIndex];

      // Delete the target node from the parent's children
      parentNode.children.splice(targetIndex, 1);

      // Cleanup: if parent has no more children, reset its type
      if (parentNode.children.length === 0) {
        parentNode.fieldType = "";
        parentNode.children = [];
      }

      return newSchema;
    });
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      })
      .catch((err) => {
        console.error("Copy failed", err);
      });
  };




  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-30 px-4">
      <div className="max-w-5xl flex flex-col items-center gap-3 lg:gap-6">

        <div className="lg:text-8xl md:text-6xl text-3xl font-bold text-center">JSON Schema Builder</div>
        {/* <div className="lg:px-28 md:px-35 px-0 lg:text-2xl md:text-xl text-sm text-center text-muted-foreground leading-4 lg:leading-6 md:leading-5">The goal was to make a builder form that can create json schema with custom key names and value as datatype name string while supporting real time editting and nesting structure.</div> */}
        <div className="flex justify-center w-full">
          <div className="max-w-3xl text-sm sm:text-xl text-center">The goal was to make a builder form that can create json schema with custom key names and value as datatype name string while supporting real time editting and nesting structure.</div>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-3">
          <a href="https://github.com/MAYANK-T0MAR/json_schema_builder/issues" target="_blank" rel="noopener noreferrer">
            <Button variant={"outline"}>
              <Bug /> <span>Open an Issue</span> <ExternalLink />
            </Button>
          </a>

          <a href="https://github.com/MAYANK-T0MAR/json_schema_builder" target="_blank" rel="noopener noreferrer">
            <Button>
              <Star /> <span>Star on Github</span> <ExternalLink />
            </Button>
          </a>

        </div>

      </div>
      <div className="w-7xl max-w-full flex flex-col lg:flex-row gap-2">

        <div className="flex flex-col flex-2 border border-border bg-card rounded-2xl p-4 lg:p-6 gap-6 shadow-[488px_-10px_180px_#bebebe,_-20px_-10px_180px_#ffffff]">
          <span className="text-2xl">Schema Fields</span>
          {schema.map((field: SchemaProps, i) => (
            <SchemaField
              key={Number("" + i)}
              schemaProps={field} path={[i]}
              addChildHandler={addChildren}
              fieldNameUpdater={updateFieldName}
              fieldTypeUpdater={updateFieldType}
              fieldDeleter={deleteField}
            />
          ))}
          <Button className="cursor-pointer" onClick={() => addChildren([])}>
            <Plus />
            Add Field
          </Button>
        </div>

        {/* <div className="flex-1 border border-border bg-card rounded-2xl p-4">
          <div className="w-full flex justify-between">
            <span className="text-2xl">Schema Json</span>
            <Button variant={"outline"} className="cursor-pointer sticky top-20">
              <Copy/> <span>Copy</span>
            </Button>
          </div>
          <pre>
            <code>{JSON.stringify(convertSchemaToObject(schema), null, 2)}</code>
          </pre>
        </div> */}
        <div className="flex-1 border border-border bg-card rounded-2xl p-4 relative">
          <div className="sticky top-4 z-10 flex justify-end">
            {/* <Button variant={"outline"} className="cursor-pointer" onClick={handleCopy}>
              <Copy />
              <span>Copy</span>
            </Button> */}
            <Button onClick={handleCopy} variant={"outline"} className="cursor-pointer">
              {copied ? <Check className="text-green-500" /> : <Copy />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
          </div>

          <div className="text-2xl mb-2 w-fit absolute top-[17px]">Schema Json</div>

          {/* <pre className="mt-2">
            <code ref={codeRef}>{JSON.stringify(convertSchemaToObject(schema), null, 2)}</code>
          </pre> */}
          <CodeBlock code={jsonString} />
        </div>
      </div>

    </div>
  );
}
