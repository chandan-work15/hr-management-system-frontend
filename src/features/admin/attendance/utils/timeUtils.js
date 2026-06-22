// Convert "HH:mm" → minutes
export const timeToMinutes = (time) => {
  if (!time) return 0;

  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Convert minutes → hours
export const minutesToHours = (minutes) => {
  return (minutes / 60).toFixed(2);
};

// Calculate working hours
export const calculateWorkHours = (entryTime, exitTime) => {
  if (!entryTime || !exitTime) return 0;

  const entry = timeToMinutes(entryTime);
  const exit = timeToMinutes(exitTime);

  return minutesToHours(exit - entry);
};

export const formatWorkHours = (entryTime, exitTime) => {
  if (!entryTime || !exitTime) return "--";

  const entry = timeToMinutes(entryTime);
  const exit = timeToMinutes(exitTime);

  const totalMinutes = exit - entry;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};
