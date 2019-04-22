const canGenerate = ({
  min, max, shrink, shrinkable
}) => {
  const wrapper = ({ value, shrunkOnce }) => {
    const tmpShrink = () => shrink({ value, shrunkOnce }).map(
      v => wrapper({ value: v, shrunkOnce: true })
    );
    return shrinkable({ value, shrink: tmpShrink });
  };

  const generate = (params) => {
    const { rng = params } = params;
    return wrapper({ value: rng.nextInt({ min, max }), shrunkOnce: false });
  };
  return ({ generate });
};

const canShrinkNumeric = ({ stream }) => {
  const shrinkNumeric = ({
    current, target, shrunkOnce, halvePos, halveNeg
  }) => {
    const realGap = target - current;
    function* shrinkDecr() {
      const gap = shrunkOnce ? halvePos(realGap) : realGap;
      for (let i = gap; i > 0; i = halvePos(i)) {
        yield current - i;
      }
    }

    function* shrinkIncr() {
      const gap = shrunkOnce ? halveNeg(realGap) : realGap;
      for (let i = gap; i < 0; i = halveNeg(i)) {
        yield current - i;
      }
    }

    return realGap > 0 ? stream(shrinkDecr()) : stream(shrinkIncr());
  };
  return ({ shrinkNumeric });
};

const canShrinkNumber = ({ shrinkNumeric }) => {
  const shrinkNumber = ({
    zero, min, max, current, shrunkOnce, halvePos, halveNeg
  }) => {
    if (min <= zero && max >= zero) {
      return shrinkNumeric({
        current, target: zero, shrunkOnce, halvePos, halveNeg
      });
    }
    return current < zero ? shrinkNumeric({
      current, target: max, shrunkOnce, halvePos, halveNeg
    }) : shrinkNumeric({
      current, target: min, shrunkOnce, halvePos, halveNeg
    });
  };
  return ({ shrinkNumber });
};

const canShrink = ({
  min, max, shrinkNumber
}) => {
  const halvePos = n => Math.floor(n / 2);
  const halveNeg = n => Math.ceil(n / 2);

  const shrink = (params) => {
    const { value = params, shrunkOnce = false } = params;

    return shrinkNumber({
      zero: 0, min, max, current: value, shrunkOnce, halvePos, halveNeg
    });
  };
  return ({ shrink });
};

const canShrinkableFor = ({ shrink, shrinkable }) => {
  const shrinkableFor = ({ value, shrunkOnce }) => shrinkable({
    value,
    shrink: () => shrink({ value, shrunkOnce })
      .map(v => shrinkableFor({
        value: v,
        shrunkOnce: true
      }))
  });
  return ({ shrinkableFor });
};

export const canGenerateInteger = ({ compose, stream, shrinkable }) => {
  const integer = (params) => {
    const MIN_INT = 0x80000000 | 0; // eslint-disable-line
    const MAX_INT = 0x7fffffff | 0; // eslint-disable-line
    const { min = MIN_INT, max = MAX_INT } = params || {};

    const { generate, shrink, shrinkableFor } = compose(
      canGenerate,
      canShrinkableFor,
      canShrink,
      canShrinkNumber,
      canShrinkNumeric
    )({
      min, max, stream, shrinkable
    });
    return ({
      generate, shrink, shrinkableFor, min, max
    });
  };
  return ({ integer });
};

export const canGenerateNatural = ({ integer }) => {
  const nat = (params) => {
    const { min, max = params || integer.max } = params || {};
    return integer({ min: Math.max(0, min), max });
  };
  return ({ nat });
};

export default canGenerateInteger;
