export function preprocessText(text: string): string[] {
  const lines = text.replace(
    /[.][ ][A-Z]/g,
    str => `.\n${str[str.length - 1]}`
  ).split('\n');

  const lastLine = lines[lines.length - 1];
  const end = lastLine.search(/[?]/);
  if (end > 0) {
    lines[lines.length - 1] = lastLine.slice(0, end + 1);
  }

  return lines;
}