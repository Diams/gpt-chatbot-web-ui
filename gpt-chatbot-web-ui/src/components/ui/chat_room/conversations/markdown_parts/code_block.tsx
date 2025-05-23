"use client";

import { ReactNode, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GetExtension } from "@/lib/utils";

export default function CodeBlock({
  children,
  className,
}: {
  children?: ReactNode;
  inline?: boolean;
  className?: string;
}) {
  if (!(!!className && className.startsWith("language-"))) {
    return <code className={className}>{children}</code>;
  }
  const [copy_value, set_copy] = useState<"Copy" | "Copied!">("Copy");
  const [save_value, set_save] = useState<"Save" | "Saved!">("Save");
  const code = String(children).trim();
  const language = className.replace("language-", "");
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      set_copy("Copied!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set_copy("Copy");
    } catch {
      alert("Failed to copy.");
    }
  };
  const handleSave = async () => {
    try {
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `code.${GetExtension(language)}`;
      a.click();
      URL.revokeObjectURL(url);
      set_save("Saved!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set_save("Save");
    } catch {
      alert("Failed to save.");
    }
  };
  return (
    <div className="relative group">
      <div>{language}</div>
      <SyntaxHighlighter language={language} style={oneDark}>
        {code}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-9 right-20 opacity-0 group-hover:opacity-100 text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        {copy_value}
      </button>
      <button
        onClick={handleSave}
        className="absolute top-9 right-2 opacity-0 group-hover:opacity-100 text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        {save_value}
      </button>
    </div>
  );
}
