const canGenerate = ({ values, shrinkable, stream }) => {
  const generate = (rng) => {
    if (values.length === 1) return shrinkable(values[0]);
    const id = rng.nextInt({ min: 0, max: values.length - 1 });
    if (id === 0) return shrinkable(values[0]);
    function* g(v) {
      yield shrinkable(v);
    }
    return shrinkable({ value: values[id], shrink: () => stream(g(values[0])) });
  };
  return ({ generate });
};

export const canGenerateConstant = ({ helpers: { compose, shrinkable, stream } }) => {
  const constant = (params) => {
    const { value = params } = params || {};
    const { generate } = compose(canGenerate)({ values: [value], shrinkable, stream });
    return ({ generate });
  };

  return ({ constant });
};

export const canGenerateConstantFrom = ({ helpers: { compose, shrinkable, stream } }) => {
  const constantFrom = (params) => {
    let { values = params } = params || {};
    if (Array.isArray(params)) values = params;
    if (values.length === 0) throw new Error('constantFrom arbitrary expects atleast one parameter');
    const { generate } = compose(canGenerate)({ values, shrinkable, stream });
    return ({ generate });
  };
  return ({ constantFrom });
};
