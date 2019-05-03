export const canMerge = ({
  _: { set },
  specTransducer
}) => {
  const keyReducer = () => (acc, spec) => {
    const { keys } = spec;
    const [key] = keys();
    acc.push(key);
    return acc;
  };

  const conformReducer = params => (acc, spec) => {
    const { data = params } = params || {};
    const { keys, conform } = spec;
    const [key] = keys();
    const value = conform({ key, data: data[key] });
    set(acc, key, value);
    return acc;
  };

  const predicateReducer = params => (acc, spec) => {
    const { data = params } = params || {};
    const { keys, predicate } = spec;
    const [key] = keys();
    const value = acc && predicate(data[key]);
    return value;
  };

  const merge = (...params) => {
    let items = params;
    if (Array.isArray(params[0])) [items] = params;
    const keys = specTransducer({ items, reducer: keyReducer, init: [] });
    const conform = specTransducer({ items, reducer: conformReducer, init: {} });
    const predicate = specTransducer({ items, reducer: predicateReducer, init: true });
    return ({
      keys, conform, predicate, valid: predicate
    });
  };
  return ({ merge });
};

export default canMerge;
