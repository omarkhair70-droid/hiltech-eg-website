export function normalizeEgyptPhone(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  let normalized = trimmed.replace(/[\s\-()]/g, '');
  normalized = normalized.replace(/^\+/, '');
  normalized = normalized.replace(/^00/, '');

  if (/^01\d{9}$/.test(normalized)) {
    return `20${normalized.slice(1)}`;
  }

  if (/^20(1\d{9})$/.test(normalized)) {
    return normalized;
  }

  return normalized;
}

export function isValidEgyptPhone(input: string): boolean {
  return /^20(1\d{9})$/.test(normalizeEgyptPhone(input));
}
