export const canCheckOdd = ({ even, number }) => {
  const odd = data => number(data) && !even(data);
  return ({
    odd,
    isOdd: odd
  });
};

export default canCheckOdd;
