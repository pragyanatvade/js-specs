const canGenerate = ({
  arb, lengthArb, preFilter, shrink, shrinkable
}) => {
  const wrapper = ({ items, shrunkOnce }) => {
    const tmpItems = preFilter(items);
    const values = [];
    for (let i = 0; i < tmpItems.length; i += 1) {
      const item = tmpItems[i];
      values.push(item.value);
    }

    const arbShrink = () => shrink({ items, shrunkOnce }).map(
      v => wrapper({ items: v, shrunkOnce: true })
    );
    const resp = shrinkable({ value: values, shrink: arbShrink });
    return resp;
  };

  const generate = (params) => {
    const { rng = params } = params;
    const size = lengthArb.generate(rng).value;
    const items = [];
    for (let i = 0; i < size; i += 1) {
      items.push(arb.generate(rng));
    }
    return wrapper({ items, shrunkOnce: false });
  };
  return ({ generate });
};

const canShrink = ({
  min, lengthArb, stream
}) => {
  const shrink = (params) => {
    const { items = params, shrunkOnce = false } = params;
    if (items.length === 0) return stream().nil();
    const size = lengthArb.shrinkableFor({ value: items.length, shrunkOnce });
    const streamItems = size
      .shrink()
      .map(l => items.slice(items.length - l.value))
      .join(items[0].shrink().map(v => [v].concat(items.slice(1))))
      .join(
        items.length > min
          ? shrink({ items: items.slice(1), shrunkOnce: false })
            .filter(values => values.length + 1 > min)
            .map(values => [items[0]].concat(values))
          : stream().nil()
      );
    return streamItems;
  };

  return ({ shrink });
};

export const canGenerateArray = ({
  integer, compose, shrinkable, stream
}) => {
  const array = (params) => {
    const {
      arb = params, min = 0, max = 10, preFilter = pred => pred
    } = params || {};

    if (typeof arb.generate !== 'function') throw new Error('array arbitrary expects another arbitrary');

    const lengthArb = integer({ min, max });
    const { generate, shrink } = compose(
      canGenerate,
      canShrink
    )({
      arb, min, max, preFilter, lengthArb, shrinkable, stream
    });

    return ({ generate, shrink });
  };

  return ({ array });
};

export default canGenerateArray;
