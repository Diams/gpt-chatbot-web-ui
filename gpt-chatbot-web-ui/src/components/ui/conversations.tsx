"use client";

import { useTranslation } from "react-i18next";
import { IconRobot, IconUser } from "@tabler/icons-react";

export default function Conversations() {
  const { t } = useTranslation("temporary");
  const dummy_conversations = [
    {
      role: "user",
      message: "Hello.",
    },
    {
      role: "assistant",
      message: "Hi there! How are you?",
    },
    {
      role: "user",
      message: "I'm good, thanks. And you?",
    },
    {
      role: "assistant",
      message: "I'm doing well, too.",
    },
  ];
  return (
    <div>
      {dummy_conversations.map((conversation, index) => (
        <div key={index}>
          {conversation.role === "user" ? (
            <div className="flex justify-center">
              <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
                <div>
                  <IconUser size={30} />
                </div>
                <div>{conversation.message}</div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-200 dark:bg-gray-800 flex justify-center">
              <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
                <div>
                  <IconRobot size={30} />
                </div>
                <div>{conversation.message}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
