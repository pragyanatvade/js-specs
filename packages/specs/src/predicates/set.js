export const canCheckSet = ({ _ }) => {
  const set = data => _.isSet(data);
  return ({
    set,
    isSet: set
  });
};

export default canCheckSet;
