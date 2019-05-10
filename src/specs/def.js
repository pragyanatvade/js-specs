export const canDefineMultiple = ({
  def,
  transduce: { map, into },
  shortid,
  predicates: { isString, isFunction }
}) => {
  const mapper = (item) => {
    const {
      key = isString(item) ? item : shortid.generate(),
      predicate = isFunction(item) ? item : null
    } = item;
    if (key && predicate) def(key, predicate);
    return key;
  };
  const mdef = items => into([], map(mapper), items);
  return ({ mdef, multiDefine: mdef });
};

export const canDefine = ({ registry, defineSpec }) => {
  const def = (...params) => {
    let [{ key, predicate }] = params;
    if (params.length > 1) [key, predicate] = params;
    if (!key || !predicate) throw new Error('You must pass key and predicate to define spec appropriately');
    registry.set(key, {
      keys: () => [key],
      ...defineSpec(predicate)
    });
    return registry.get(key);
  };

  return ({ def, define: def });
};

export const canDefineByPredicate = ({
  conformFn,
  explainFn,
  describeFn,
  docFn,
  predicates: {
    isFunction,
    isSpec
  }
}) => {
  const defineSpec = (params) => {
    const { predicate = params } = params || {};
    if (isSpec(predicate)) return predicate;
    if (isFunction(predicate)) {
      const valid = ({ data }) => predicate(data);
      return {
        conform: conformFn,
        predicate,
        valid,
        isValid: valid,
        explain: explainFn,
        doc: docFn,
        describe: describeFn
      };
    }
    return {};
  };

  return ({ defineSpec });
};

export default { canDefine, canDefineMultiple, canDefineByPredicate };
