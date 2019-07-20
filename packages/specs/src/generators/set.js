const subArrayContains = (tab, upperBound, includValue) => {
  for (let i = 0; i < upperBound; i += 1) {
    if (includValue(tab[i])) return true;
  }
  return false;
};

const swap = (tab, idx1, idx2) => {
  const tmp = tab[idx1];
  tab[idx1] = tab[idx2]; // eslint-disable-line
  tab[idx2] = tmp; // eslint-disable-line
};

const buildCompareFilter = compare => (tab) => {
  let finalLength = tab.length;
  for (let i = finalLength - 1; i >= 0; i -= 1) {
    if (subArrayContains(tab, i, arb => compare(arb.value, tab[i].value))) {
      finalLength -= 1;
      swap(tab, i, finalLength);
    }
  }
  return tab.slice(0, finalLength);
};

export const canGenerateSet = ({ array, filter }) => {
  const set = (params) => {
    const {
      arb = params, min = 0, max = 10, compare = (a, b) => a === b
    } = params || {};
    const arrayArb = array({
      arb, min, max, preFilter: buildCompareFilter(compare)
    });
    if (min === 0) return arrayArb;
    const iterator = val => val.length >= min;
    return filter(arrayArb, iterator);
  };
  return ({ set });
};

export default canGenerateSet;
