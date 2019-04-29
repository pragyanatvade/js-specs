export const canApplyMapOf = ({
  transduce: { reduce }, tuple, string
}) => {
  const mapOf = params => (data) => {
    const { key = string, value = params } = params || {};
    if (!value) throw new Error('value predicate is mandatory');

    let predicates = Array.isArray(value) ? value : [value];
    predicates = Array.isArray(key)
      ? [...key, ...predicates]
      : [key, ...predicates];

    const finalPredicate = tuple(predicates);
    const reducer = (acc, itemKey) => acc && finalPredicate([itemKey, data[itemKey]]);
    return reduce(reducer, true, Object.keys(data));
  };
  return ({ mapOf });
};

export default canApplyMapOf;
