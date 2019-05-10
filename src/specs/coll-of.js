export const canDefineCollOf = ({
  mdef,
  specTransducer,
  transduce: { reduce }
}) => {
  const predicateReducer = params => (acc, spec) => {
    const { data = params } = params || {};
    const { predicate } = spec;
    const reducer = (ac, datum) => ac && predicate(datum);
    const resp = reduce(reducer, true, data);
    return acc && resp;
  };

  const collOf = (...params) => {
    const [predicate, options = {}] = params;
    const predicates = Array.isArray(predicate) ? predicate : [predicate];
    const items = mdef(predicates);
    const preds = specTransducer({
      items, reducer: predicateReducer, init: [], options
    });

    return ({ predicate: preds });
  };
  return ({ collOf });
};

export default canDefineCollOf;
