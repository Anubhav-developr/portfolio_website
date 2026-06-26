export function toMailto(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
