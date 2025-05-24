"use client";

import {
  IconCopy,
  IconCopyCheckFilled,
  IconRobot,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import CodeBlock from "./markdown_parts/code_block";
import "katex/dist/katex.min.css";

export default function ChatMessageUI({
  role,
  message,
}: {
  role: string;
  message: string;
}) {
  const [copy_value, set_copy] = useState<"Copy" | "Copied!">("Copy");
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      set_copy("Copied!");
      await new Promise((resolve) => setTimeout(resolve, 400));
      set_copy("Copy");
    } catch {
      alert("Failed to copy.");
    }
  };
  return (
    <div>
      {role === "user" ? (
        <div className="flex justify-center items-start">
          <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
            <div>
              <IconUser size={30} />
            </div>
            <div className="flex-grow whitespace-pre-wrap overflow-auto">
              {message}
            </div>
            <div>
              <div className="relative group">
                <button
                  onClick={handleCopy}
                  className="hover:text-gray-600 cursor-pointer flex"
                >
                  {copy_value === "Copy" ? (
                    <IconCopy size={20} />
                  ) : (
                    <IconCopyCheckFilled size={20} color="lightgreen" />
                  )}
                </button>
                <span className="absolute top-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                  {copy_value}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 dark:bg-gray-800 flex justify-center items-start">
          <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
            <div>
              <IconRobot size={30} />
            </div>
            <div className="flex-grow overflow-auto">
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeSanitize, rehypeKatex]}
                  components={{ code: CodeBlock }}
                >
                  {message}
                </ReactMarkdown>
              </div>
            </div>
            <div>
              <div className="relative group">
                <button
                  onClick={handleCopy}
                  className="hover:text-gray-600 cursor-pointer flex"
                >
                  {copy_value === "Copy" ? (
                    <IconCopy size={20} />
                  ) : (
                    <IconCopyCheckFilled size={20} color="lightgreen" />
                  )}
                </button>
                <span className="absolute top-full mb-1 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10">
                  {copy_value}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
