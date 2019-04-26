export const canGenerateDocFn = ({ predicates: { fn } }) => {
  const docFn = ({
    key, predicate
  }) => {
    if (!key && fn(predicate)) {
      return {};
    }
    return '';
  };

  return ({ docFn });
};

export default { canGenerateDocFn };
