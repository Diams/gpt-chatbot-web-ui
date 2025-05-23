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
