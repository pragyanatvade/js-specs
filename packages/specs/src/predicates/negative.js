export const canCheckNegative = ({ number }) => {
  const negative = data => number(data) && data < 0;

  return ({
    negative,
    isNegative: negative
  });
};

export default canCheckNegative;
