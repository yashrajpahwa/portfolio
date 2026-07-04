export function formatDate(date) {
  // Frontmatter dates like "2025-05-01" parse as UTC midnight; render in UTC
  // so the displayed day never shifts with the build machine's timezone.
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
