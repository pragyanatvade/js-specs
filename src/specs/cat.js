export const canDefineCat = ({
  transduce: {
    into, map, partitionAll, comp, transduce
  },
  predicates: { invalid }
}) => {
  const conformReducer = ({ items }) => (params) => {
    const { data = params } = params || {};

    const part = partitionAll(2);
    let idx = 0;
    const mapper = (item) => {
      const [key, pred] = item;
      const trans = [key, pred(data[idx]) ? data[idx] : invalid()];
      idx += 1;
      return trans;
    };
    const xf = comp(part, map(mapper));
    const resp = into({}, xf, items);
    return resp;
  };

  const predicateReducer = ({ items }) => (params) => {
    const { data = params } = params || {};
    let idx = 0;
    const part = partitionAll(2);
    const reducer = (acc, item) => {
      const [, pred] = item;
      const tmpAcc = acc && pred(data[idx]);
      idx += 1;
      return tmpAcc;
    };
    const resp = transduce(part, reducer, true, items);
    return resp;
  };

  const specCat = (...params) => {
    let items = params;
    if (Array.isArray(params[0])) [items] = params;
    const conform = conformReducer({ items });
    const predicate = predicateReducer({ items });
    return ({
      conform, predicate, valid: predicate, isValid: predicate
    });
  };
  return ({ cat: specCat });
};

export default canDefineCat;
