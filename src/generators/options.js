const canGenerate = ({ arb, optionArb, shrinkable }) => {
  const extendedShrinkable = (arbitrary) => {
    function* g() {
      yield shrinkable(null);
    }
    return shrinkable({
      value: arbitrary.value,
      shrink: () => arbitrary.shrink().map(extendedShrinkable).join(g())
    });
  };

  const generate = rng => (optionArb.generate(rng).value === 0
    ? shrinkable(null) : extendedShrinkable(arb.generate(rng)));
  return ({ generate });
};

export const canGenerateOptions = ({ helpers: { compose, shrinkable }, nat, }) => {
  const option = (params) => {
    const { arb = params, freq = 5 } = params || {};
    const optionArb = nat(freq);
    const { generate } = compose(canGenerate)({
      arb, freq, optionArb, shrinkable
    });
    return ({ generate });
  };
  return ({ option });
};

export default canGenerateOptions;
