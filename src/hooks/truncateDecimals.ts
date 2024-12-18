export const truncateDecimals = (num: number): number => {
    return Math.floor(num * 1000) / 1000;
  };