export const canSelect = ({
  _,
  registry,
  transduce: {
    map, into, filter
  }

}) => {
  const conformReducer = ({ items }) => (params) => {
    const reducer = (acc, item) => {
      const { data = params } = params || {};
      const { conform } = registry.get(item);
      const value = conform({ key: item, data: data[item] });
      _.set(acc, item, value);
      return acc;
    };
    return _.reduce(items, reducer, {});
  };

  const predicateReducer = ({ items }) => ({ data }) => {
    const reducer = (acc, item) => {
      const { predicate } = registry.get(item);
      const value = predicate(data[item]);
      _.set(acc, item, value);
      return acc;
    };
    return _.reduce(items, reducer, {});
  };

  const select = (...args) => {
    let [{ schema, selection }] = args;
    if (args.length > 1) [schema, selection] = args;
    const spec = registry.get(schema);
    const schemaKeys = spec.keys();

    const selectKeys = into({}, map(key => [key, true]), selection);
    const items = into([], filter(key => selectKeys[key] === true), schemaKeys);
    const conform = conformReducer({ items });
    const predicate = predicateReducer({ items });

    return ({
      keys: () => items, conform, predicate, valid: predicate, isValid: predicate
    });
  };
  return ({ select });
};

export default canSelect;
