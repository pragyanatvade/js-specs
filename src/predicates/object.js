export const canCheckObject = ({ _ }) => {
  const obj = data => _.isPlainObject(data);
  return ({
    obj,
    object: obj,
    isObject: obj
  });
};

export default canCheckObject;
