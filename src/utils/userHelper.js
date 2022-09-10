export const getAccessLevelText = (value) => {
  switch (value) {
    case 1:
      return "Director";

    case 2:
      return "Manager";

    case 3:
      return "Member";

    default:
      return "---";
  }
};
