"use client";


import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  language?: string;
  code: string;
};

export default function CodeBlock({ language = "json", code }: CodeBlockProps) {
  return (
    <div className="text-sm rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          background: "transparent",
          padding: "1rem",
          borderRadius: "0.75rem",
          overflowX: "auto",
        }}
        codeTagProps={{
          style: {
            background: "transparent",
          },
        }}
      >
        {code}
      </SyntaxHighlighter>

    </div>
  );
}
