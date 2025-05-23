"use client";

import {
  IconCopy,
  IconCopyCheckFilled,
  IconFileDownload,
} from "@tabler/icons-react";
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
  const [copy_value, set_copy] = useState<"Copy" | "Copied!">("Copy");
  if (!(!!className && className.startsWith("language-"))) {
    return <code className={className}>{children}</code>;
  }
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
      <div className="absolute top-8 right-13 opacity-0 group-hover:opacity-100 transition">
        <div className="relative group/copy">
          <button
            onClick={handleCopy}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {copy_value === "Copy" ? (
              <IconCopy size={20} />
            ) : (
              <IconCopyCheckFilled size={20} color="lightgreen" />
            )}
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover/copy:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
            {copy_value}
          </span>
        </div>
      </div>
      <div className="absolute top-8 right-2 opacity-0 group-hover:opacity-100 transition">
        <div className="relative group/save">
          <button
            onClick={handleSave}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            <IconFileDownload size={20} />
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover/save:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
            Save
          </span>
        </div>
      </div>
    </div>
  );
}
