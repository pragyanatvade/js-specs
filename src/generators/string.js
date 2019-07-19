const stringArbitrary = ({
  min, max, map, arb, array
}) => {
  const iterator = val => val.join('');
  return map(array({ arb, min, max }), iterator);
};

export const canGenerateString = ({ char, array, helpers: { map } }) => {
  const string = (params) => {
    const { min, max = params } = params || {};
    return stringArbitrary({
      min, max, arb: char(), array, map
    });
  };
  return ({ string });
};

export const canGenerateAsciiString = ({ ascii, array, helpers: { map } }) => {
  const asciiString = (params) => {
    const { min, max = params } = params || {};
    return stringArbitrary({
      min, max, arb: ascii(), array, map
    });
  };
  return ({ asciiString });
};
