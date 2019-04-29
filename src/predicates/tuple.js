export const canApplyTuple = ({
  transduce: { reduce }
}) => {
  const tuple = params => (data) => {
    const { predicate = params } = params || {};
    const predicates = Array.isArray(predicate) ? predicate : [predicate];
    let idx = 0;
    const reducer = (acc, datum) => {
      const tmpAcc = acc && predicates[idx](datum);
      idx += 1;
      return tmpAcc;
    };
    return reduce(reducer, data.length === predicates.length, data);
  };
  return ({ tuple });
};

export default canApplyTuple;
