export const canCheckArray = ({ _ }) => {
  const array = data => _.isArray(data);
  return ({
    array,
    isArray: array
  });
};

export default canCheckArray;
