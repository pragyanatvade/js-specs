export const canGenerateBoolean = ({ integer, helpers: { map } }) => {
  const iterator = value => value === 1;
  const boolean = () => map(integer({ min: 0, max: 1 }), iterator);
  return ({ boolean, bool: boolean });
};


export default canGenerateBoolean;
