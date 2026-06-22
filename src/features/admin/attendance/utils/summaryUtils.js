export const calculateSummary = (records) => {
  const summary = {
    total: records.length,
    present: 0,
    absent: 0,
    late: 0,
    half_day: 0,
    leave: 0,
  };

  records.forEach((record) => {
    const status = record.finalStatus;

    if (summary[status] !== undefined) {
      summary[status]++;
    }
  });

  return summary;
};
