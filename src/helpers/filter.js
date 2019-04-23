export const canFilter = () => {
  const filter = (arb, iterator) => {
    const generate = rng => arb.generate(rng).filter(iterator);
    return ({ ...arb, generate });
  };
  return ({ filter });
};

export default canFilter;
