import { letterAvatar } from '~/styles/colors';

export const createLetterAvatar = (name, index) => {
  const split = name.split(' ');
  const letters =
    split.length > 1
      ? split[0].charAt(0) + split[1].charAt(0)
      : split[0].charAt(0) + split[0].charAt(1);

  const color = letterAvatar[index % letterAvatar.length];
  return {
    color,
    letters: letters.toUpperCase(),
  };
};
