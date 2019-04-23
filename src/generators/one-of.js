const canGenerate = ({ arbs }) => {
  const generate = (rng) => {
    const id = rng.nextInt({ min: 0, max: arbs.length - 1 });
    return arbs[id].generate(rng);
  };
  return ({ generate });
};

export const canGenerateOneOf = ({ compose }) => {
  const oneOf = (params) => {
    let { arbs = params } = params;
    if (Array.isArray(params)) arbs = params;
    if (arbs.length === 0) throw new Error('oneOf arbitrary expects at least one parameter');
    const { generate } = compose(canGenerate)({ arbs });
    return ({ generate });
  };
  return ({ oneOf });
};

export default canGenerateOneOf;
