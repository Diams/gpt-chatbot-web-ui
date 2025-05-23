"use client";

import { IconRobot, IconUser } from "@tabler/icons-react";

export default function ChatMessage({
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
            <div>{message}</div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 dark:bg-gray-800 flex justify-center">
          <div className="w-[min(90%,750px)] flex flex-row py-6 gap-6">
            <div>
              <IconRobot size={30} />
            </div>
            <div>{message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
