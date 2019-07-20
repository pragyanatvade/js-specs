export const canDefineOr = ({
  mdef, conformCombine, predicateCombine, validCombine, explainCombine, predicates: { or }
}) => {
  const orSpec = (arr) => {
    const items = mdef(arr);
    const conform = conformCombine({ items, op: or });
    const predicate = predicateCombine({ items, op: or });
    const valid = validCombine({ items, op: or });
    const explain = explainCombine({ items, op: or });

    return ({
      conform, predicate, valid, isValid: valid, explain
    });
  };

  return ({ or: orSpec });
};

export default { canDefineOr };
