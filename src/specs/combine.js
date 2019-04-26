export const canCombine = ({
  _, transduce: { into, map },
  registry, predicates: { string, fn }, conformFn, explainFn
}) => {
  const predicateMapper = (item) => {
    if (string(item)) { // Get predicate from registry if item is a string
      const { predicate } = registry.get(item);
      return predicate;
    }
    if (fn(item.predicate)) return item.predicate; // get predicate if item is an object
    if (fn(item)) return item; // if item is a function
    throw new Error(`Predicate is of type ${typeof predicate}. We don't support this as of now.`);
  };


  const conformCombine = ({ items, op }) => ({ data }) => {
    const preds = into([], map(predicateMapper), items);
    const predicate = op(preds);
    return conformFn({ data, predicate });
  };

  const predicateCombine = ({ items, op }) => (data) => {
    const preds = into([], map(predicateMapper), items);
    const predicate = op(preds);
    return predicate(_.get(data, 'data', data));
  };

  const validCombine = predicateCombine;

  const explainCombine = ({ items }) => ({ data }) => {
    const explainMapper = (item) => {
      if (string(item)) {
        const { explain, predicate } = registry.get(item);
        return explain({ key: item, data, predicate });
      }
      if (fn(item.predicate)) return explainFn({ predicate: item.predicate, data });
      if (fn(item)) return explainFn({ predicate: item, data });
      throw new Error(`Predicate is of type ${typeof predicate}. We don't support this as of now.`);
    };
    return _.map(items, explainMapper);
  };

  return {
    conformCombine, predicateCombine, validCombine, explainCombine
  };
};

export default { canCombine };
