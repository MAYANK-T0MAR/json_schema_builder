"use client"

import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { TypeList } from "./TypeList";
import { SchemaProps } from "@/types";

type SchemaFieldProps = {
    schemaProps: SchemaProps,
    path: number[],
    addChildHandler: (path: number[]) => void,
    fieldNameUpdater: (path: number[], value: string) => void,
    fieldTypeUpdater: (path: number[], value: string) => void,
    fieldDeleter: (path: number[]) => void,
}


export default function SchemaField({ schemaProps, addChildHandler, path, fieldNameUpdater, fieldTypeUpdater, fieldDeleter }: SchemaFieldProps) {
    // const hasNestedChildren = typeof Object.values(schemaProps)[0] === "object";
    // const fieldName = Object.keys(schemaProps)[0];
    // const fieldValue = Object.values(schemaProps)[0];



    const fieldNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        fieldNameUpdater(path, event.target.value)
    }


    return (
        <div className="w-full schema-field flex flex-col gap-4">

            <div className="flex gap-4 items-end flex-wrap">

                <div className="grid flex-1 max-w-sm items-center gap-3">
                    <Label htmlFor={"fieldName"+path}>Field Name</Label>
                    <Input
                        type="text"
                        id={"fieldName"+path}
                        placeholder="Field Name"
                        value={schemaProps.fieldName}
                        onChange={fieldNameChangeHandler}
                    />
                </div>

                <div className="flex-1 grid items-center gap-3">
                    <div className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">Field Type</div>
                    <TypeList path={path} fieldTypeChangeHandler={fieldTypeUpdater} fieldTypeVal={schemaProps.fieldType} />
                </div>

                <Button className="cursor-pointer" variant={"destructive"} onClick={()=> fieldDeleter(path)}>
                    <Trash2 />
                </Button>

            </div>




            {schemaProps.children.length > 0 && schemaProps.children.map((field: SchemaProps, i) => (
                <div key={i} className="flex w-full">
                    <div className="border-s-2 border-b-2 rounded-bl-sm w-[40px] h-[44px]"></div>
                    <SchemaField
                        key={path.join("-") + "-" + i}
                        schemaProps={field}
                        path={[...path, i]}
                        addChildHandler={addChildHandler}
                        fieldNameUpdater={fieldNameUpdater}
                        fieldTypeUpdater={fieldTypeUpdater}
                        fieldDeleter={fieldDeleter}
                    />
                </div>
            ))}




            {schemaProps.children.length > 0 && (
                <div className="ms-[40px]">
                    {/* <Button onClick={()=>addChildHandler(path, "New Field", "string")}> */}
                    <Button className="cursor-pointer" onClick={()=>addChildHandler(path)}>
                        <Plus />
                        Add Field
                    </Button>
                </div>
            )}

        </div>
    )
}