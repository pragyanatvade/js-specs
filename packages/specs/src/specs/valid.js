export const canValidate = ({ registry, predicates: { isFunction } }) => {
  const valid = (...params) => {
    let [{ key, data, predicate }] = params;
    if (params.length > 1) [key, data] = params;
    if ((key && isFunction(key)) || isFunction(predicate)) {
      predicate = key || predicate;
      return predicate(data);
    }
    const { valid: specValidate } = registry.get(key);
    return specValidate(data);
  };
  return ({ valid, isValid: valid });
};

export default { canValidate };
