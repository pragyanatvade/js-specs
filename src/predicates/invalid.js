export const canCheckInvalid = () => {
  const invalid = str => Symbol.for(str || ':vade.specs/invalid');
  return ({
    invalid
  });
};

export default canCheckInvalid;
