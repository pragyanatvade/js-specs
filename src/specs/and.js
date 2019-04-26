export const canDefineAnd = ({
  mdef, conformCombine, predicateCombine, validCombine, explainCombine, predicates: { and }
}) => {
  const andSpec = (arr) => {
    const items = mdef(arr);
    const conform = conformCombine({ items, op: and });
    const predicate = predicateCombine({ items, op: and });
    const valid = validCombine({ items, op: and });
    const explain = explainCombine({ items, op: and });

    return ({
      conform, predicate, valid, isValid: valid, explain
    });
  };

  return ({ and: andSpec });
};

export default { canDefineAnd };
