interface languageMap {
  [key: string]: string | undefined;
}

const programmingLanguages: languageMap = {
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  css: "css",
  "c++": "cpp",
  "c#": "cs",
  go: "go",
  haskell: "hs",
  html: "html",
  java: "java",
  javascript: "js",
  kotlin: "kt",
  lua: "lua",
  "objective-c": "m",
  perl: "pl",
  php: "php",
  python: "py",
  ruby: "rb",
  rust: "rs",
  scala: "scala",
  shell: "sh",
  sql: "sql",
  swift: "swift",
  typescript: "ts",
};

export function GetExtension(langueage: string): string {
  return programmingLanguages[langueage] ?? "txt";
}
