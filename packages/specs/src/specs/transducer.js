export const canTransduceSpec = ({
  predicates: { isString },
  registry,
  transduce: {
    comp, transduce, map, mapcat
  }
}) => {
  const specTransducer = ({ items, reducer, init }) => (params) => {
    const mapcatter = (item) => {
      let spec = item;
      if (isString(item)) spec = registry.get(item);
      const { keys } = spec;
      return keys();
    };

    const mapper = (key) => {
      const spec = registry.get(key);
      return spec;
    };
    const xf = comp(mapcat(mapcatter), map(mapper));
    const resp = transduce(xf, reducer(params), init, items);
    return resp;
  };

  return ({ specTransducer });
};

export default canTransduceSpec;
