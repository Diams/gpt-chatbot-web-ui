"use client";

import { IconRobot, IconUser } from "@tabler/icons-react";
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
  return (
    <div>
      {role === "user" ? (
        <div className="flex justify-center">
          <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
            <div>
              <IconUser size={30} />
            </div>
            <div className="whitespace-pre-wrap">{message}</div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 dark:bg-gray-800 flex justify-center">
          <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
            <div>
              <IconRobot size={30} />
            </div>
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
        </div>
      )}
    </div>
  );
}
