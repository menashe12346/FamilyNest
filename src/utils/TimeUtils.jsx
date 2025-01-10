export const getSecondsRemaining = (endTime) => {
    const currentTime = new Date(); // Current time
    const endTimeDate = new Date(endTime); // Convert endTime string to Date object
  
    // Calculate the difference in milliseconds and convert to seconds
    const timeDifference = Math.max(0, Math.floor((endTimeDate - currentTime) / 1000));
    return timeDifference;
  };

  