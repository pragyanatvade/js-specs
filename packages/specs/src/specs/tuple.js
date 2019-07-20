export const canDefineTuple = ({
  conformCombine, predicateCombine, validCombine, explainCombine, predicates: { tuple },
}) => {
  const specTuple = (params) => {
    const { predicate = params } = params || {};
    const items = Array.isArray(params) ? params : [predicate];
    const conform = conformCombine({ items, op: tuple });
    const pred = predicateCombine({ items, op: tuple });
    const valid = validCombine({ items, op: tuple });
    const explain = explainCombine({ items, op: tuple });

    return ({
      conform, predicate: pred, valid, isValid: valid, explain
    });
  };
  return ({ tuple: specTuple });
};

export default canDefineTuple;
