export const canApplyAnd = ({ transduce: { reduce } }) => {
  const and = predicates => (data) => {
    const reducer = (acc, predicate) => acc && predicate(data);
    return reduce(reducer, true, predicates);
  };
  return ({ and });
};

export default canApplyAnd;
