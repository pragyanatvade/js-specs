export const canCheckString = ({ _ }) => {
  const str = data => _.isString(data);
  return ({
    str,
    string: str,
    isString: str
  });
};

export default canCheckString;
