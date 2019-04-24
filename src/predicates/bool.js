export const canCheckBoolean = ({ _ }) => {
  const bool = data => _.isBoolean(data);
  return ({
    bool,
    isBoolean: bool
  });
};

export default canCheckBoolean;
