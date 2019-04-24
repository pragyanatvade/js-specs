export const canCheckNil = ({ _ }) => {
  const nil = data => _.isNil(data);
  return ({
    nil,
    isNil: nil
  });
};

export default canCheckNil;
