// Example holiday list (later from API)
const HOLIDAYS = [
  "2026-04-14",
  "2026-04-21",
];

// Check holiday
export const isHoliday = (date) => {
  return HOLIDAYS.includes(date);
};

// Check weekend
export const isWeekend = (date) => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};