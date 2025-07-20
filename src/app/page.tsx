"use client"

import SchemaField from "@/components/common/SchemaField";
import { useCallback, useEffect, useState } from "react";
import { Key, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SchemaProps, SchemaType } from "@/types";



export default function Home() {
  const [schema, setSchema] = useState<SchemaProps[]>([]);

  function convertSchemaToObject(schema: SchemaProps[]): Record<string, any> {
    const result: Record<string, any> = {};

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
        console.log("path was found emptied so pushing at root")
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
        let currentLevel: any = newSchema;

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



  // useEffect(() => {
  //   console.log("Schema changed", JSON.stringify(schema, null, 2));
  // }, [schema]);



  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="w-6xl max-w-full flex flex-col lg:flex-row gap-2">

        <div className="flex flex-col flex-2 border border-border bg-card rounded-2xl p-4 lg:p-6 gap-6">
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
          <Button onClick={() => addChildren([])}>
            <Plus />
            Add Field
          </Button>
        </div>

        <div className="flex-1 border border-border bg-card rounded-2xl p-4">
          <span className="text-2xl">Schema JSON</span>
          <pre>
            <code>{JSON.stringify(convertSchemaToObject(schema), null, 2)}</code>
          </pre>
        </div>

      </div>

    </div>
  );
}
