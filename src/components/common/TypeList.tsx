"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "String",
    label: "String",
  },
  {
    value: "number",
    label: "number",
  },
  {
    value: "nested",
    label: "nested",
  },
  {
    value: "double",
    label: "double",
  },
  {
    value: "float",
    label: "float",
  },
  {
    value: "boolean",
    label: "boolean",
  },
]

type typeListProps = {
  path: number[],
  fieldTypeChangeHandler : (path: number[], value: string) => void,
  fieldTypeVal: string,
}

export function TypeList({path, fieldTypeChangeHandler, fieldTypeVal}: typeListProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between "
        >
          <span className={`${value? "text-foreground": "text-muted-foreground"} font-normal`}>
            {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select type..."} */}
            {fieldTypeVal!= ""? fieldTypeVal: "Select type..."}
          </span>
          
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    // setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    fieldTypeChangeHandler(path, currentValue)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
