export const canGenerateDictionary = ({ tuple, set, helpers: { map } }) => {
  const iterator = (items) => {
    const obj = {};
    for (const item of items) { // eslint-disable-line
      const [key, value] = item;
      obj[key] = value;
    }
    return obj;
  };

  const dictionary = (params) => {
    const { key, value } = params || {};
    if (!key) throw new Error('dictionary arbitrary expects valid arbitrary to generate key');
    if (!value) throw new Error('dictionary arbitrary expects valid arbitrary to generate values');
    const arb = set({ arb: tuple([key, value]), compare: (t1, t2) => t1[0] === t2[0] });
    return map(arb, iterator);
  };

  return ({ dictionary, dict: dictionary });
};

export default canGenerateDictionary;
