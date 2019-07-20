export const canCheckDivisibility = () => {
  const divisible = ({ data, by = 2 }) => (data % by) === 0;
  return ({
    divisible,
    isDivisible: divisible
  });
};

export default canCheckDivisibility;
