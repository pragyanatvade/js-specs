const canGenerateUniform = ({ gen, uniformIntDistribution }) => {
  const uniformIn = ({ min, max }) => {
    const rng = uniformIntDistribution({ min, max, gen });
    gen = rng.next; // eslint-disable-line
    return rng.value;
  };
  return ({ uniformIn });
};

const canGenerateBoolean = ({ uniformIn }) => {
  const nextBoolean = () => uniformIn(0, 1) === 1;
  return ({ nextBoolean });
};

const canGenerateNext = ({ uniformIn }) => {
  const next = bits => uniformIn({ min: 0, max: (1 << bits) - 1 }); // eslint-disable-line
  return ({ next });
};

const canGenerateNextInt = ({ uniformIn }) => {
  const MIN_INT = 0x80000000 | 0; // eslint-disable-line
  const MAX_INT = 0x7fffffff | 0; // eslint-disable-line
  const nextInt = ({ min, max } = {}) => {
    const tmin = min || min === 0 ? min : MIN_INT;
    const tmax = max || max === 0 ? max : MAX_INT;
    const fmin = tmin > tmax ? tmax : tmin;
    const fmax = tmin > tmax ? tmin : tmax;
    return uniformIn({ min: fmin, max: fmax });
  };
  return ({ nextInt });
};

const canGenerateNextBigInt = () => {
  const nextBigInt = () => { };
  return ({ nextBigInt });
};

const canGenerateDouble = ({ next }) => {
  const DBL_FACTOR = 2 ** 27;
  const DBL_DIVISOR = 2 ** -53;
  const nextDouble = () => {
    const a = next(26);
    const b = next(27);
    return (a * DBL_FACTOR + b) * DBL_DIVISOR;
  };
  return ({ nextDouble });
};

const canClone = (params) => {
  const clone = () => ({ ...params, clone });
  return ({ clone });
};

export const canGenerateRandom = ({ compose, uniformIntDistribution }) => {
  const random = (params) => {
    const { gen = params } = params;
    return compose(
      canClone,
      canGenerateDouble,
      canGenerateNextBigInt,
      canGenerateNextInt,
      canGenerateBoolean,
      canGenerateNext,
      canGenerateUniform
    )({ gen, uniformIntDistribution });
  };
  return ({ random });
};

export default canGenerateRandom;
