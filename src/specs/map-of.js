export const canDefineMapOf = ({
  conformCombine,
  predicateCombine,
  validCombine,
  explainCombine,
  predicates: { mapOf, string }
}) => {
  const specMapOf = (params) => {
    const defaultOptions = {
      conformKeys: false
    };
    const { key = string, value = params, options = defaultOptions } = params || {};

    if (!value) throw new Error('value predicate is mandatory');

    let items = Array.isArray(value) ? value : [value];
    if (options.conformKeys) {
      items = Array.isArray(key)
        ? [...key, ...items]
        : [key, ...items];
    }

    const conform = conformCombine({ items, op: mapOf, options });
    const pred = predicateCombine({ items, op: mapOf, options });
    const valid = validCombine({ items, op: mapOf, options });
    const explain = explainCombine({ items, op: mapOf, options });

    return ({
      conform, predicate: pred, valid, isValid: valid, explain
    });
  };
  return ({ mapOf: specMapOf });
};

export default canDefineMapOf;
