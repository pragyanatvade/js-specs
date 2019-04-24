export const canCheckCollection = ({ array, set }) => {
  const coll = data => array(data) || set(data);
  return ({
    coll,
    isColl: coll,
    isCollection: coll
  });
};

export default canCheckCollection;
