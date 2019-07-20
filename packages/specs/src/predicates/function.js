export const canCheckFunction = ({ _ }) => {
  const fn = data => _.isFunction(data);
  return ({
    fn,
    isFunction: fn
  });
};

export default canCheckFunction;
