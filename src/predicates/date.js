export const canCheckDate = ({ _ }) => {
  const date = data => _.isDate(data);
  return ({
    date,
    isDate: date
  });
};

export default canCheckDate;
