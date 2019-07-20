const canGenerate = ({ arb }) => {
  const generate = (params) => {
    const { rng = params } = params || {};
    return arb.generate(rng);
  };
  return ({ generate });
};

const canRun = ({ beforeEach, afterEach, predicate }) => {
  const run = async ({ value }) => {
    await beforeEach();
    try {
      const output = await predicate(value);
      return output == null || output === true ? null : 'Property failed by returning false';
    } catch (err) {
      if (err instanceof Error && err.stack) return `${err}\n\nStack trace: ${err.stack}`;
      return `${err}`;
    } finally {
      await afterEach();
    }
  };
  return ({ run });
};

export const canDefineAsyncProp = ({ compose }) => {
  const async = (params) => {
    const {
      arb = params, predicate, beforeEach = async () => {}, afterEach = async () => {}
    } = params || {};
    const { generate, run, isAsync = () => true } = compose(canGenerate, canRun)({
      arb, predicate, beforeEach, afterEach
    });
    return ({ generate, run, isAsync });
  };
  return ({ async });
};

export default canDefineAsyncProp;
