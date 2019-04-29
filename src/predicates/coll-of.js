export const canApplyCollOf = ({
  transduce: { reduce }, and
}) => {
  const collOf = params => (data) => {
    const { predicate = params, op = and } = params || {};
    const predicates = Array.isArray(predicate) ? predicate : [predicate];
    const combinedPredicate = op(predicates);
    const reducer = (acc, datum) => acc && combinedPredicate(datum);
    return reduce(reducer, true, data);
  };
  return ({ collOf });
};

export default canApplyCollOf;
