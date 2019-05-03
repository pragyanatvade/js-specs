export const canDefineMultiple = ({
  def, transduce: { map, into }
}) => {
  const mapper = (item) => {
    const { key, predicate } = item;
    if (key && predicate) {
      def(item);
      return key;
    }
    return item;
  };
  const mdef = items => into([], map(mapper), items);
  return ({ mdef, multiDefine: mdef });
};

export const canDefine = ({ registry, defineSpec }) => {
  const def = ({ key, predicate }) => {
    registry.set(key, {
      req: [key], opt: [], keys: [key], ...defineSpec({ predicate })
    });
    return registry;
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
  const defineSpec = ({ predicate }) => {
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
