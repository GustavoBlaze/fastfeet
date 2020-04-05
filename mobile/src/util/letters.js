export const createLetterAvatar = (name) => {
  const split = name.split(' ');
  const letters =
    split.length > 1
      ? split[0].charAt(0) + split[1].charAt(0)
      : split[0].charAt(0) + split[0].charAt(1);

  return letters.toUpperCase();
};
