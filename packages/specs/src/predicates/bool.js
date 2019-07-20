export const canCheckBoolean = ({ _ }) => {
  const bool = data => _.isBoolean(data);
  return ({
    bool,
    isBoolean: bool,
    boolean: bool
  });
};

export default canCheckBoolean;
