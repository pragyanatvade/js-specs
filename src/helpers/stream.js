const canIterate = ({ gen }) => ({ [Symbol.iterator]: () => gen });

const canNil = ({ stream }) => {
  class Nil {
    [Symbol.iterator]() {
      return this;
    }

    next(value) {
      return { value, done: true };
    }
  }
  const nil = () => stream(new Nil());
  return ({ nil });
};

const canNext = ({ gen }) => {
  const next = () => gen.next();
  return ({ next });
};

const canMap = ({ gen, stream }) => {
  function* helper({ mapper, generator }) {
      for (const val of generator) { // eslint-disable-line
      yield mapper(val);
    }
  }
  const map = mapper => stream({ gen: helper({ mapper, generator: gen }) });
  return ({ map });
};

const canFlatMap = ({ gen, stream }) => {
  function* helper({ mapper, generator }) {
      for (const v of generator) { // eslint-disable-line
      yield* mapper(v);
    }
  }
  const flatMap = mapper => stream({ gen: helper({ mapper, generator: gen }) });
  return ({ flatMap });
};

const canDropWhile = ({ flatMap }) => {
  const dropWhile = (pred) => {
    let foundEligible = false;
    function* helper(val) {
      if (foundEligible || !pred(val)) {
        foundEligible = true;
        yield val;
      }
    }
    return flatMap(helper);
  };
  return ({ dropWhile });
};

const canDrop = ({ dropWhile }) => {
  const drop = (num) => {
    let idx = 0;
    function helper() {
      idx += 1;
      return idx <= num;
    }
    return dropWhile(helper);
  };
  return ({ drop });
};

const canTakeWhile = ({ gen, stream }) => {
  function* helper({ pred, generator }) {
    let current = generator.next();
    while (!current.done && pred(current.value)) {
      yield current.value;
      current = generator.next();
    }
  }
  const takeWhile = pred => stream({ gen: helper({ pred, generator: gen }) });
  return ({ takeWhile });
};

const canTake = ({ takeWhile }) => {
  const take = (num) => {
    let idx = 0;
    function helper() {
      idx += 1;
      return idx <= num;
    }
    return takeWhile(helper);
  };
  return ({ take });
};

const canFilter = ({ gen, stream }) => {
  function* helper({ pred, generator }) {
      for (const val of generator) { // eslint-disable-line
      if (pred(val)) {
        yield val;
      }
    }
  }
  const filter = pred => stream({ gen: helper({ pred, generator: gen }) });
  return ({ filter });
};

const canEvery = ({ gen }) => {
  const every = (pred) => {
      for (const val of gen) { // eslint-disable-line
      if (!pred(val)) return false;
    }
    return true;
  };

  return ({ every });
};

const canHas = ({ gen }) => {
  const has = (pred) => {
      for (const val of gen) { // eslint-disable-line
      if (pred(val)) return [true, val];
    }
    return [false, null];
  };
  return ({ has });
};

const canJoin = ({ gen, stream }) => {
  function* helper({ generator, others }) {
    const gens = [generator, ...others];
      for (const g of gens) { // eslint-disable-line
      for (let current = g.next(); !current.done; current = g.next()) {
        yield current.value;
      }
    }
  }
  const join = (...others) => stream({ gen: helper({ generator: gen, others }) });
  return ({ join });
};

const canGetNthorLast = ({ gen }) => {
  const getNthOrLast = (nth) => {
    let remaining = nth;
    let last = null;
      for (const val of gen) { // eslint-disable-line
      if (remaining === 0) return val;
      remaining -= 1;
      last = val;
    }
    return last;
  };
  return ({ getNthOrLast });
};

export const streamify = ({ compose }) => {
  const stream = (params) => {
    const { gen = params } = params || {};
    const { gen: omit1, ...methods } = compose(
      canIterate,
      canNil,
      canNext,
      canMap,

      canDrop,
      canDropWhile,
      canFlatMap,

      canTake,
      canTakeWhile,

      canFilter,

      canEvery,
      canHas,
      canJoin,

      canGetNthorLast
    )({ gen, stream });

    return methods;
  };
  return ({ stream });
};

export default streamify;
