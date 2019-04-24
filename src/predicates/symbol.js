export const canCheckSymbol = ({ _ }) => {
  const sym = data => _.isSymbol(data);
  return ({
    sym,
    symbol: sym,
    isSymbol: sym
  });
};

export default canCheckSymbol;
