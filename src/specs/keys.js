export const canDefineKeys = ({

  _, transduce: {
    into, map, filter, comp
  },
  jsonpath,
  registry
}) => {
  const conformReducer = ({ items }) => ({ data }) => {
    const reducer = (acc, item) => {
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

  const explainReducer = ({ items, spec }) => ({ data }) => {
    const mapper = (item) => {
      const { explain } = registry.get(item);
      const [resp] = explain({
        key: item, data: data[item], spec
      });
      return resp;
    };
    const filterBy = item => item;
    const pathMapper = (item) => {
      const { key } = item;
      const [path] = jsonpath.paths(data, `$..${key}`);
      return { ...item, path };
    };
    const xf = comp(map(mapper), filter(filterBy), map(pathMapper));
    return into([], xf, items);
  };

  const keys = (items) => {
    const { req = items, opt = [] } = items;
    const keywords = [...req, ...opt];
    const conform = conformReducer({ items: keywords });
    const predicate = predicateReducer({ items: keywords });
    const explain = explainReducer({ items: keywords });

    return ({
      req,
      opt,
      keys: () => [...req, ...opt],
      conform,
      predicate,
      valid: predicate,
      isValid: predicate,
      explain
    });
  };
  return ({ keys });
};

export default { canDefineKeys };
