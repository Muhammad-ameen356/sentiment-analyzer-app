export const emoji = (item) => {
  if (item?.score <= 1) {
    return "😡";
  }
  if (item?.score <= 2) {
    return "😨";
  }
  if (item?.score <= 3) {
    return "😐";
  }
  if (item?.score <= 4) {
    return "😇";
  }
  if (item?.score <= 5) {
    return "😍";
  }
  return "😫";
};
