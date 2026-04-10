export interface Weekend {
  saturday: string;
  label: string;
}

export function getWeekendsBetween(startDate: string, endDate: string): Weekend[] {
  const weekends: Weekend[] = [];
  
  // Parse as UTC to avoid timezone shifts
  const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
  const [endYear, endMonth, endDay] = endDate.split("-").map(Number);
  
  const start = new Date(Date.UTC(startYear, startMonth - 1, startDay));
  const end = new Date(Date.UTC(endYear, endMonth - 1, endDay));

  const current = new Date(start);
  while (current <= end) {
    if (current.getUTCDay() === 6) {
      const saturday = new Date(current);
      const sunday = new Date(current);
      sunday.setUTCDate(sunday.getUTCDate() + 1);
      
      const satMonth = saturday.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
      const sunMonth = sunday.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
      const satDay = saturday.getUTCDate();
      const sunDay = sunday.getUTCDate();
      
      const label =
        satMonth === sunMonth
          ? `${satMonth} ${satDay}-${sunDay}`
          : `${satMonth} ${satDay}-${sunMonth} ${sunDay}`;
      weekends.push({
        saturday: `${saturday.getUTCFullYear()}-${String(saturday.getUTCMonth() + 1).padStart(2, "0")}-${String(satDay).padStart(2, "0")}`,
        label,
      });
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }
  return weekends;
}
