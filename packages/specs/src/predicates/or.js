export const canApplyOr = ({ transduce: { reduce } }) => {
  const or = predicates => (data) => {
    const reducer = (acc, predicate) => acc || predicate(data);
    return reduce(reducer, false, predicates);
  };
  return ({ or });
};

export default canApplyOr;
