export interface Weekend {
  saturday: string;
  label: string;
}

export function getWeekendsBetween(startDate: string, endDate: string): Weekend[] {
  const weekends: Weekend[] = [];
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  const current = new Date(start);
  while (current <= end) {
    if (current.getDay() === 6) {
      const saturday = new Date(current);
      const sunday = new Date(current);
      sunday.setDate(sunday.getDate() + 1);
      const satMonth = saturday.toLocaleDateString("en-US", { month: "short" });
      const sunMonth = sunday.toLocaleDateString("en-US", { month: "short" });
      const satDay = saturday.getDate();
      const sunDay = sunday.getDate();
      const label =
        satMonth === sunMonth
          ? `${satMonth} ${satDay}-${sunDay}`
          : `${satMonth} ${satDay}-${sunMonth} ${sunDay}`;
      weekends.push({
        saturday: saturday.toISOString().split("T")[0],
        label,
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return weekends;
}
