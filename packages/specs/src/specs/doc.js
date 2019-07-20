export const canGenerateDoc = ({ predicates: { fn } }) => {
  const doc = ({
    key, predicate
  }) => {
    if (!key && fn(predicate)) {
      return {};
    }
    return '';
  };

  return ({ doc });
};

export default canGenerateDoc;
