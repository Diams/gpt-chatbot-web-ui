interface languageMap {
  [key: string]: string | undefined;
}

export function GetExtension(langueage: string): string {
  console.log(langueage);
  switch (langueage) {
    case "bash":
      return "sh";
    case "css":
      return "css";
    case "html":
      return "html";
    case "jsx":
      return "jsx";
    case "python":
      return "py";
    default:
      return "txt";
  }
}

export const programmingLanguages: languageMap = {
  c: ".c",
  cpp: ".cpp",
  css: ".css",
  "c++": ".cpp",
  "c#": ".cs",
  go: ".go",
  haskell: ".hs",
  html: ".html",
  java: ".java",
  javascript: ".js",
  kotlin: ".kt",
  lua: ".lua",
  "objective-c": ".m",
  perl: ".pl",
  php: ".php",
  python: ".py",
  ruby: ".rb",
  rust: ".rs",
  scala: ".scala",
  shell: ".sh",
  sql: ".sql",
  swift: ".swift",
  typescript: ".ts",
};
