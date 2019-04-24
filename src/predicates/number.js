export const canCheckNumber = ({ _ }) => {
  const number = data => _.isNumber(data);

  return ({
    num: number,
    number,
    isNumber: number
  });
};

export default canCheckNumber;
