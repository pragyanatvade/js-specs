export const canValidate = ({ registry }) => {
  const valid = ({ key, data, predicate }) => {
    if (!key) { return predicate(data); }
    const { valid: specValidate } = registry.get(key);
    return specValidate({ key, data });
  };
  return ({ valid, isValid: valid });
};

export default { canValidate };
