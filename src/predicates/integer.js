export const canCheckInteger = ({ _ }) => {
  const int = data => _.isInteger(data);

  return ({
    int,
    isInteger: int
  });
};

export default canCheckInteger;
