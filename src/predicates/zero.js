export const canCheckZero = () => {
  const zero = data => data === 0;

  return ({
    zero,
    isZero: zero
  });
};

export default canCheckZero;
