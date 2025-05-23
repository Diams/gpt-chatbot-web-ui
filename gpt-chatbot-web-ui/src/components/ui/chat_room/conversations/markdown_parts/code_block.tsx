"use client";

import { ReactNode, useState } from "react";

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
  const code = String(children).trim();
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
  return (
    <div className="relative group">
      <pre className={`${className} p-4, bg-gray-900 text-white rounded`}>
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-sm px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        {copy_value}
      </button>
    </div>
  );
}
