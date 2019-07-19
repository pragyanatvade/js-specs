const canGenerate = ({
  arbs, shrink, shrinkable
}) => {
  const wrapper = (params) => {
    const { items = params } = params || {};
    const values = [];
    for (let i = 0; i < items.length; i += 1) {
      const s = items[i];
      values.push(s.value);
    }
    const arbShrink = () => shrink({ items }).map(wrapper);
    return shrinkable({ value: values, shrink: arbShrink });
  };

  const generate = (params) => {
    const { rng = params } = params;
    return wrapper({ items: arbs.map(a => a.generate(rng)) });
  };

  return ({ generate });
};

const canShrink = ({ stream }) => {
  const shrink = (params = {}) => {
    const { items = params } = params;
    let s = stream().nil();
    for (let i = 0; i < items.length; i += 1) {
      s = s.join(
        items[i].shrink().map(
          v => items // eslint-disable-line
            .slice(0, i)
            .concat([v])
            .concat(items.slice(i + 1))
        )
      );
    }
    return s;
  };
  return ({ shrink });
};

export const canGenerateTuple = ({ helpers: { compose, stream, shrinkable } }) => {
  const tuple = (params) => {
    let { arbs = params } = params;
    if (Array.isArray(params)) arbs = params;
    const { generate, shrink } = compose([
      canGenerate,
      canShrink
    ])({ arbs, stream, shrinkable });
    return ({ generate, shrink });
  };
  return ({ tuple });
};

export default canGenerateTuple;
