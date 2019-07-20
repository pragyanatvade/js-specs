export const canExplain = ({ registry }) => {
  const explain = ({ key, data }) => {
    const { explain: specExplain } = registry.get(key);
    return specExplain({
      key, data, spec: key
    });
  };
  return ({ explain });
};

export const canExplainFn = ({ registry, predicates: { fn } }) => {
  const explainFn = ({
    key, data, predicate
  }) => {
    if (!key && fn(predicate) && !predicate(data)) {
      const predicateName = predicate.name || `${predicate}`;
      return [{
        val: data,
        status: 'failed',
        predicate: predicateName,
        key,
        path: []
      }];
    }
    const { predicate: specPredicate } = registry.get(key);
    if (!specPredicate(data)) {
      const predicateName = specPredicate.name || `${specPredicate}`;
      return [{
        val: data, status: 'failed', predicate: predicateName, key, path: []
      }];
    }
    return [];
  };

  return ({ explainFn });
};

export default { canExplainFn, canExplain };
