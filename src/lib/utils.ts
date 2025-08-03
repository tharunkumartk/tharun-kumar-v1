export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const startYear = start.getFullYear().toString().slice(-2);

  if (endDate === "present") {
    return `${startMonth} ${startYear} - present`;
  }

  const end = new Date(endDate);
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  const endYear = end.getFullYear().toString().slice(-2);

  const startFormatted = `${startMonth} ${startYear}`;
  const endFormatted = `${endMonth} ${endYear}`;

  if (startFormatted === endFormatted) {
    return startFormatted;
  }

  return `${startFormatted} - ${endFormatted}`;
}

// Helper function to estimate read time
export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to format date
export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
