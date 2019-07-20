export const canCheckFinite = ({ _ }) => {
  const finite = data => _.isFinite(data);

  return ({
    finite,
    isFinite: finite
  });
};

export default canCheckFinite;
