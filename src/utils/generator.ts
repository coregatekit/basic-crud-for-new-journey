export function generateEmployeeCode(prefix: string): string {
  const formattedPrefix = prefix.substring(0, 2).toUpperCase();

  const digits = Math.floor(Math.random() * 9000)

  return `${formattedPrefix}${digits}`;
}