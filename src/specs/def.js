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
      ...defineSpec(key, predicate)
    });
    return registry.get(key);
  };

  return ({ def, define: def });
};

export const canDefineByPredicate = ({
  conformFn,
  explainFn,
  predicates: {
    isFunction
  }
}) => {
  const defineSpec = (...params) => {
    const [key, methods] = params;
    const {
      keys = () => [key],
      predicate = isFunction(methods) ? methods : null,
      conform = conformFn,
      explain = explainFn
    } = methods;

    return {
      keys,
      predicate,
      conform,
      valid: predicate,
      isValid: predicate,
      explain
    };
  };

  return ({ defineSpec });
};

export default { canDefine, canDefineMultiple, canDefineByPredicate };
