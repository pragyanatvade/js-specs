export const canMap = () => {
  const map = (arb, iterator) => {
    const generate = rng => arb.generate(rng).map(iterator);
    return ({ ...arb, generate });
  };
  return ({ map });
};

export default canMap;
