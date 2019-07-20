export const canCheckEven = ({ divisible, number }) => {
  const even = data => number(data) && divisible({ data, by: 2 });
  return ({
    even,
    isEven: even
  });
};

export default canCheckEven;
