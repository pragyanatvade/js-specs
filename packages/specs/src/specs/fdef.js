
export const canDefineFdef = ({ registry, predicates: { invalid } }) => {
  const conformFSpec = ({ key, data: { args, ret }, predicate }) => {
    if (!key) {
      const { args: pargs, ret: pret } = predicate;
      const rargs = pargs(args) ? args : invalid();
      const rret = pret(ret) ? ret : invalid();
      return { args: rargs, ret: rret };
    }
    const { predicate: { args: pargs, ret: pret } } = registry.get(key);
    const rargs = pargs(args) ? args : invalid();
    const rret = pret(ret) ? ret : invalid();
    return ({ args: rargs, ret: rret });
  };

  const fdef = ({
    key, args, ret
  }) => {
    const pred = params => (data) => {
      const { predicate = params } = params || {};
      return predicate(data);
    };

    registry.set(key, {
      conform: conformFSpec,
      predicate: { args: pred(args), ret: pred(ret) }
    });
  };
  return ({ fdef });
};

export default canDefineFdef;
