export function GetExtension(langueage: string): string {
  console.log(langueage);
  switch (langueage) {
    case "bash":
      return "sh";
    case "jsx":
      return "jsx";
    case "python":
      return "py";
    default:
      return "txt";
  }
}
