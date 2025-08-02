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
