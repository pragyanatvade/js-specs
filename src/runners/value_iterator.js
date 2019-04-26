const canIterate = ({ sourceValuesIterator }) => ({
  [Symbol.iterator]: () => sourceValuesIterator
});

const canNext = ({ initialValues, maxInitialIterations, remainingSkips }) => {
  const next = (params) => {
    const { value = params } = params || {};
      maxInitialIterations -= 1; // eslint-disable-line
    if (maxInitialIterations !== -1 && remainingSkips >= 0) {
      const n = initialValues.next();
      if (!n.done) return { value: n.value(), done: false };
    }
    return ({ value, done: true });
  };
  return ({ next });
};

  const canSkip = ({ maxInitialIterations, remainingSkips }) => { // eslint-disable-line
  const skippedOne = () => {
      remainingSkips -= 1; // eslint-disable-line
      maxInitialIterations += 1; // eslint-disable-line
  };
  return ({ skippedOne });
};

export const canValueIterator = ({ compose }) => {
  const valueIterator = (params) => {
    const { initialValues, maxInitialIterations, remainingSkips } = params || {};
    const {
      initialValues: omit1, maxInitialIterations: omit2, remainingSkips: omit3, ...methods
    } = compose(canIterate, canNext, canSkip)({
      initialValues,
      maxInitialIterations,
      remainingSkips,
      valueIterator
    });
    return methods;
  };
  return ({ valueIterator });
};

export default canValueIterator;
