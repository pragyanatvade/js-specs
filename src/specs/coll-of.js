export const canDefineCollOf = ({
  conformCombine, predicateCombine, validCombine, explainCombine, predicates: { collOf },
}) => {
  const collOfSpec = (params) => {
    const { predicate = params } = params || {};
    const items = Array.isArray(params) ? params : [predicate];
    const conform = conformCombine({ items, op: collOf });
    const pred = predicateCombine({ items, op: collOf });
    const valid = validCombine({ items, op: collOf });
    const explain = explainCombine({ items, op: collOf });

    return ({
      conform, predicate: pred, valid, isValid: valid, explain
    });
  };
  return ({ collOf: collOfSpec });
};

export default canDefineCollOf;
