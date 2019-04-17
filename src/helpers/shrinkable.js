const canMap = ({
  shrinkable, shrink, value
}) => {
  const map = (mapper) => {
    const tmpValue = mapper(value);
    const tmpShrink = () => shrink().map(v => v.map(mapper));
    return shrinkable({ value: tmpValue, shrink: tmpShrink });
  };
  return ({ map });
};

const canFilter = ({ shrinkable, shrink, value }) => {
  const filter = (pred) => {
    const tmpShrink = shrink().filter(v => pred(v.value)).map(v => pred(v.filter(pred)));
    return shrinkable({ value, shrink: tmpShrink });
  };
  return ({ filter });
};

export const canShrink = ({ compose, stream }) => {
  const shrinkable = (params) => {
    const { value = params, shrink = () => stream().nil() } = params || {};
    const { map, filter } = compose(
      canMap,
      canFilter
    )({ value, shrink, shrinkable });
    return ({
      map, filter, value, shrink
    });
  };
  return ({ shrinkable });
};

export default canShrink;
