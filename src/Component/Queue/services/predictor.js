
export const predictWaitTime = (queueLength) => {

  return (queueLength + 1) * 5;
};
