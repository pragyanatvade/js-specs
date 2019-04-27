const DOUBLE_FACTOR = 2 ** 27;
const DOUBLE_DIVISOR = 2 ** -53;


export const canGenerateFloat = ({ map, integer }) => {
  const next = n => integer({ min: 0, max: (1 << n) - 1 }); // eslint-disable-line

  const floatArb = () => {
    const iterator = v => v / (1 << 24); // eslint-disable-line
    const arb = next(24);
    return map(arb, iterator);
  };

  const float = (params) => {
    const { min, max } = params || {};
    if (min === undefined) return floatArb();
    if (max === undefined) return floatArb().map(v => v * min);
    return floatArb().map(v => min + v * (max - min));
  };
  return ({ float });
};

export const canGenerateDouble = ({ tuple, map, integer }) => {
  const next = n => integer({ min: 0, max: (1 << n) - 1 }); // eslint-disable-line

  const doubleArb = () => {
    const iterator = v => (v[0] * DOUBLE_FACTOR + v[1]) * DOUBLE_DIVISOR;
    const arb = tuple([next(26), next(27)]);
    return map(arb, iterator);
  };

  const double = (params = {}) => {
    const { min, max } = params;
    if (min === undefined) return doubleArb();
    if (max === undefined) return doubleArb().map(v => v * min);
    return doubleArb().map(v => min + v * (max - min));
  };
  return ({ double });
};
