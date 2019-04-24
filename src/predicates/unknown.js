export const canCheckUnknown = () => {
  const unknown = Symbol.for(':vade.specs/unknown');
  return ({ unknown });
};

export default canCheckUnknown;
