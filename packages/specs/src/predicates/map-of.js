export const canApplyMapOf = ({
  transduce: { reduce }, tuple, string
}) => {
  const mapOf = params => (data) => {
    const defaultOptions = {
      conformKeys: false
    };
    const { key = string, value = params, options = defaultOptions } = params || {};
    if (!value) throw new Error('value predicate is mandatory');

    let predicates = Array.isArray(value) ? value : [value];
    if (options.conformKeys) {
      predicates = Array.isArray(key)
        ? [...key, ...predicates]
        : [key, ...predicates];
    }

    const finalPredicate = tuple(predicates);
    const reducer = (acc, itemKey) => {
      let items = [data[itemKey]];
      if (options.conformKeys) items = [itemKey, ...items];
      return acc && finalPredicate(items);
    };
    return reduce(reducer, true, Object.keys(data));
  };
  return ({ mapOf });
};

export default canApplyMapOf;
