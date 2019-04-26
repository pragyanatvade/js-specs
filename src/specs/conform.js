export const canConformFn = ({ registry, predicates: { invalid } }) => {
  const conformFn = ({ key, data, predicate }) => {
    if (!key) return (predicate(data) ? data : invalid());
    const { predicate: specPredicate } = registry.get(key);
    return specPredicate(data) ? data : invalid();
  };
  return ({ conformFn });
};

export const canConform = ({ registry, conformFn }) => {
  const conform = ({ key, data, predicate }) => {
    if (!key && predicate) return conformFn({ key, data, predicate });
    const { conform: specConform } = registry.get(key);
    return specConform({ key, data });
  };
  return ({ conform });
};

export default { canConformFn, canConform };
