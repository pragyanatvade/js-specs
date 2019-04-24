export const canCheckSpec = ({ _ }) => {
  const spec = data => _.has(data, 'conform');
  return ({ isSpec: spec, spec });
};

export default canCheckSpec;
