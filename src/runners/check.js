
export const canCheckProp = ({
  readConfig, shrinkable, stream, sourceValuesIterator, runnerIterator, randomBySeed
}) => {
  const decorateProperty = ({ prop, params }) => {
    const dProp = prop.isAsync() && params.timeout !== null ? {} : prop;
    return params.unbiased === true ? dProp : {};
  };

  const runSync = ({ prop, sourceValues, verbose }) => {
    const runner = runnerIterator({ sourceValues, verbose });

    for (const v of runner) { // eslint-disable-line
      const out = prop.run(v);
      runner.handleResult(out);
    }
    return runner.runExecution;
  };

  const lazyGenerate = ({ prop, rng, idx }) => () => prop.generate({ rng, runId: idx });

  function* toss({
    prop, seed, random, examples = []
  }) {
    yield* examples.map(example => () => shrinkable(example));
    const idx = 0;
    const rng = random(seed);
    for (let i = 0; i < 5; i += 1) {
      yield lazyGenerate({ prop, rng, idx });
    }
  }

  const buildInitialValues = ({ gen, params }) => {
    const rawValues = params.path.length === 0 ? stream(gen) : {};
    if (!params.endOnFailure) return rawValues;

    return rawValues.map(shrinkableGen => () => {
      const { value } = shrinkableGen();
      return shrinkable(value);
    });
  };

  const check = (args) => {
    const { prop, params } = args || {};
    if (!prop || !prop.generate) { throw new Error('You gave me an invalid property to validate, please get me a valid one instead'); }
    if (!prop.run) { throw new Error('You are passing me an arbitrary instead of a property, please pass a valid property'); }
    const qParams = readConfig(params);
    const property = decorateProperty({ prop, params: qParams });
    const gen = toss({
      prop: property, seed: qParams.seed, random: randomBySeed, examples: qParams.examples
    });

    const maxInitialIterations = qParams.path.length === 0 ? qParams.numRuns : -1;
    const maxSkips = qParams.numRuns * qParams.maxSkipsPerRun;
    const initialValues = buildInitialValues({ gen, params: qParams });
    const sourceValues = sourceValuesIterator({
      initialValues,
      maxInitialIterations,
      remainingSkips: maxSkips
    });

    return runSync({ prop: property, sourceValues, verbose: qParams.verbose });
  };

  return ({ check });
};

export default canCheckProp;
