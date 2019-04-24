export const canCheckPositive = ({ number }) => {
  const positive = data => number(data) && data > 0;
  return ({
    positive,
    isPositive: positive
  });
};

export default canCheckPositive;
