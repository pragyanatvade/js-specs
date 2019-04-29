export const canApplyCollOf = ({
  transduce: { reduce }
}) => {
  const collOf = predicate => (data) => {
    // const { predicate = params, op = and } = params || {};
    // const predicates = Array.isArray(predicate) ? predicate : [predicate];
    // const combinedPredicate = op(predicates);
    const reducer = (acc, datum) => acc && predicate(datum);
    return reduce(reducer, true, data);
  };
  return ({ collOf });
};

export default canApplyCollOf;
