const canXorshift = () => {
  const xorshift = (s01, s00, s11, s10) => {
    const min = () => -0x80000000;
    const max = () => 0x7fffffff;
    const next = () => {
      const a0 = s00 ^ (s00 << 23); // eslint-disable-line
      const a1 = s01 ^ ((s01 << 23) | (s00 >>> 9)); // eslint-disable-line
      const b0 = a0 ^ s10 ^ ((a0 >>> 17) | (a1 << 15)) ^ ((s10 >>> 26) | (s11 << 6)); // eslint-disable-line
      const b1 = a1 ^ s11 ^ (a1 >>> 17) ^ (s11 >>> 26); // eslint-disable-line
      return { value: (b0 + s10) | 0, next: xorshift(s11, s10, b1, b0) }; // eslint-disable-line
    };

    return ({ min, max, next });
  };
  return ({ xorshift });
};

const canXorShift128Plus = ({ xorshift }) => {
  const xorshift128plus = seed => (xorshift(-1, ~seed, 0, seed | 0)); // eslint-disable-line
  return ({ xorshift128plus });
};

export const canRandomize = ({ compose }) => {
  const { xorshift, xorshift128plus } = compose(
    canXorShift128Plus,
    canXorshift
  )();
  return ({ xorshift, xorshift128plus });
};

export default canRandomize;
