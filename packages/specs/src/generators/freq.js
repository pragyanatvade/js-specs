const canGenerate = ({ totalWeight, summedWarbs }) => {
  const generate = (rng) => {
    const selected = rng.nextInt({ min: 0, max: totalWeight - 1 });
    for (let i = 0; i < summedWarbs.length; i += 1) {
      if (selected < summedWarbs[i].weight) return summedWarbs[i].arbitrary.generate(rng);
    }
    throw new Error('Unable to generate from frequency');
  };
  return ({ generate });
};

export const canGenerateFreq = ({ helpers: { compose } }) => {
  const freq = (params) => {
    const { arbs = params } = params || {};
    let currentWeight = 0;
    const summedWarbs = [];
    for (let i = 0; i < arbs.length; i += 1) {
      currentWeight += arbs[i].weight;
      summedWarbs.push({ weight: currentWeight, arbitrary: arbs[i].arbitrary });
    }
    const totalWeight = currentWeight;
    const { generate } = compose(canGenerate)({ arbs, totalWeight, summedWarbs });
    return ({ generate });
  };
  return ({ frequency: freq, freq });
};

export default canGenerateFreq;
