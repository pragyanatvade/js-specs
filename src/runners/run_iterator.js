const canIterate = params => ({ [Symbol.iterator]: () => params });

const canNext = ({ current }) => {
  const next = (value) => {
    const nextValue = current.nextValues.next();
    if (nextValue.done) return ({ done: true, value });
    current.shrinkable = nextValue.value; // eslint-disable-line
    current.index += 1; // eslint-disable-line
    return ({ done: false, value: nextValue.value });
  };
  return ({ next });
};

const canHandleResult = ({
  runExecution, sourceValues, current
}) => {
  const handleResult = (params) => {
    const { result = params } = params || {};
    if (result !== null && typeof result === 'string') {
      runExecution.fail({ value: current.shrinkable.value, index: current.index, message: result });
      current.index = -1; // eslint-disable-line
      current.nextValues = current.shrinkable.shrink(); // eslint-disable-line
    } else if (result !== null) {
      runExecution.skip(current.shrinkable.value);
      sourceValues.skippedOne();
    } else {
      runExecution.success(current.shrinkable.value);
    }
  };
  return ({ handleResult });
};

export const canRunIterator = ({ compose, execute }) => {
  const runIterator = (params) => {
    const { sourceValues, verbose } = params || {};
    const runExecution = execute({ verbose });
    const nextValues = sourceValues;
    const current = {
      shrinkable: {},
      index: -1,
      nextValues
    };
    const {
      ...methods
    } = compose(
      canIterate,
      canNext,
      canHandleResult,
    )({
      runExecution, runIterator, current
    });
    return methods;
  };

  return ({ runIterator });
};

export default canRunIterator;
