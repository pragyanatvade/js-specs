export const canCheckString = ({ _ }) => {
  const str = (params) => {
    const { data = params } = params || {};
    return _.isString(data);
  };
  return ({
    str,
    string: str,
    isString: str
  });
};

export default canCheckString;
