const canGenerateUniformDistribution = () => {
  const uniformDistribution = ({ from, diff, gen }) => {
    const MIN = gen.min();
    const NUM_VALUES = (gen.max() - gen.min()) + 1;
    if (diff <= NUM_VALUES) {
      let rng = gen;
      const MAX_ALLOWED = NUM_VALUES - (NUM_VALUES % diff);
      while (true) { // eslint-disable-line
        const out = rng.next();
        const deltaV = out.value - MIN;
        rng = out.next;
        if (deltaV < MAX_ALLOWED) return ({ value: (deltaV % diff) + from, next: rng });
      }
    }

    let FINAL_NUM_VALUES = 1;
    let NUM_ITERATIONS = 0;
    while (FINAL_NUM_VALUES < diff) {
      FINAL_NUM_VALUES *= NUM_VALUES;
      NUM_ITERATIONS += 1;
    }
    const MaxAcceptedRandom = diff * Math.floor((1 * FINAL_NUM_VALUES) / diff);

    let rng = gen;
    while (true) { // eslint-disable-line
      // Aggregate mutiple calls to next() into a single random value
      let value = 0;
      for (let num = 0; num !== NUM_ITERATIONS; num += 1) {
        const out = rng.next();
        value = NUM_VALUES * value + (out.value - MIN);
        rng = out.next;
      }
      if (value < MaxAcceptedRandom) {
        const inDiff = value - diff * Math.floor((1 * value) / diff);
        return ({ value: inDiff + from, next: rng });
      }
    }
  };

  return ({ uniformDistribution });
};

const canGenerateUniformIntDistribution = ({ uniformDistribution }) => {
  const uniformIntDistribution = ({ min, max, gen }) => {
    const diff = max - min + 1;
    if (gen) return uniformDistribution({ from: min, diff, gen });
    return rng => uniformDistribution({ from: min, diff, gen: rng });
  };
  return ({ uniformIntDistribution });
};

export const canDistribute = ({ compose }) => {
  const { uniformDistribution, uniformIntDistribution } = compose(
    canGenerateUniformIntDistribution,
    canGenerateUniformDistribution
  )();
  return ({ uniformDistribution, uniformIntDistribution });
};

export default canDistribute;
