const canGenerate = ({ arb }) => {
  const generate = (params) => {
    const { rng = params } = params || {};
    return arb.generate(rng);
  };
  return ({ generate });
};

const canRun = ({ beforeEach, afterEach, predicate }) => {
  const run = ({ value }) => {
    beforeEach();
    try {
      const output = predicate(value);
      return output == null || output === true ? null : 'Property failed by returning false';
    } catch (err) {
      if (err instanceof Error && err.stack) return `${err}\n\nStack trace: ${err.stack}`;
      return `${err}`;
    } finally {
      afterEach();
    }
  };
  return ({ run });
};

export const canDefineSyncProp = ({ compose }) => {
  const sync = (params) => {
    const {
      arb = params, predicate, beforeEach = () => {}, afterEach = () => {}
    } = params || {};
    const { generate, run, isAsync = () => false } = compose(canGenerate, canRun)({
      arb, predicate, beforeEach, afterEach
    });
    return ({ generate, run, isAsync });
  };
  return ({ sync });
};

export default canDefineSyncProp;
