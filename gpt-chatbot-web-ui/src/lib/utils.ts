export function GetExtension(langueage: string): string {
  console.log(langueage);
  switch (langueage) {
    case "python":
      return "py";
    default:
      return "txt";
  }
}
