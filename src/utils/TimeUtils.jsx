export const getSecondsRemaining = (endTime) => {
  const currentTime = new Date(); // Current time
  const endTimeDate = new Date(endTime); // Convert endTime string to Date object

  // Calculate the difference in milliseconds and convert to seconds
  const timeDifference = Math.max(
    0,
    Math.floor((endTimeDate - currentTime) / 1000)
  );
  return timeDifference;
};

export const getStartAndEndOfWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek); // Last Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Next Saturday
  endOfWeek.setHours(23, 59, 59, 999);

  return { startOfWeek, endOfWeek };
};
