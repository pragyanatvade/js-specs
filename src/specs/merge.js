export const canMerge = ({
  _,
  specTransducer
}) => {
  const conformReducer = params => (acc, spec) => {
    const { data = params } = params || {};
    const { req: [key], conform } = spec;
    const value = conform({ key, data: data[key] });
    _.set(acc, key, value);
    return acc;
  };
  const predicateReducer = params => (acc, spec) => {
    const { data = params } = params || {};
    const { req: [key], predicate } = spec;
    const value = acc && predicate(data[key]);
    return value;
  };

  const merge = (...params) => {
    let items = params;
    if (Array.isArray(params[0])) [items] = params;
    const conform = specTransducer({ items, reducer: conformReducer, init: {} });
    const predicate = specTransducer({ items, reducer: predicateReducer, init: true });
    return ({ conform, predicate, valid: predicate });
  };
  return ({ merge });
};

export default canMerge;
