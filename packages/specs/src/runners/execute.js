import { VERBOSITY } from './read_config';

const EXECUTION_STATUS = {
  SUCCESS: 0,
  SKIP: -1,
  FAILURE: 1
};


const canAppendExecutionTree = ({ currentLevelExecutionTrees }) => {
  const appendExecutionTree = ({ status, value }) => {
    const currentTree = { status, value, children: [] };
    currentLevelExecutionTrees.push(currentTree);
    return currentTree;
  };
  return ({ appendExecutionTree });
};

const canToRunDetails = ({
  value,
  mergePaths,
  numSkips,
  extractFailures,
  numSuccesses,
  rootExecutionTrees,
  verbose,
  execution
}) => {
  const isSuccess = () => execution.pathToFailure === null;
  const firstFailure = () => (execution.pathToFailure ? execution.pathToFailure.split(':')[0] : -1);
  const numShrinks = () => (execution.pathToFailure ? execution.pathToFailure.split(':').length - 1 : 0);

  const toRunDetails = ({
    seed, basePath, numRuns, maxSkips
  }) => {
    if (!isSuccess()) {
      return {
        failed: true,
        numRuns: firstFailure() + 1 - numSkips,
        numSkips,
        numShrinks: numShrinks(),
        seed,
        counterexample: value,
        counterexamplePath: mergePaths(basePath, execution.pathToFailure),
        error: execution.failure,
        failures: extractFailures(),
        executionSummary: rootExecutionTrees,
        verbose
      };
    }
    if (numSkips > maxSkips) {
      return {
        failed: true,
        numRuns: numSuccesses,
        numSkips,
        numShrinks: 0,
        seed,
        counterexample: null,
        counterexamplePath: null,
        error: null,
        failures: [],
        executionSummary: rootExecutionTrees,
        verbose
      };
    }
    return {
      failed: false,
      numRuns,
      numSkips,
      numShrinks: 0,
      seed,
      counterexample: null,
      counterexamplePath: null,
      error: null,
      failures: [],
      executionSummary: rootExecutionTrees,
      verbose
    };
  };

  return ({ toRunDetails });
};

const canSucceed = ({ verbose, appendExecutionTree, execution }) => {
  const success = (params) => {
    const { value = params } = params || {};
    if (verbose >= VERBOSITY.VERY_VERBOSE) {
      appendExecutionTree({ status: EXECUTION_STATUS.SKIP, value });
    }

      if (execution.pathToFailure === null) numSuccesses += 1; // eslint-disable-line
  };
  return ({ success });
};

const canSkip = ({
    verbose, appendExecutionTree, pathToFailure, numSkips // eslint-disable-line
}) => {
  const skip = (params) => {
    const { value = params } = params || {};
    if (verbose >= VERBOSITY.VERY_VERBOSE) {
      appendExecutionTree({ status: EXECUTION_STATUS.SKIP, value });
    }
      if (pathToFailure === null) numSkips += 1; // eslint-disable-line
  };
  return ({ skip });
};


  const canFail = ({ verbose, appendExecutionTree, execution }) => { // eslint-disable-line
  const fail = (params) => {
    const { value: v = params, message = '', index } = params || {};
    if (verbose >= VERBOSITY.VERBOSE) {
      const currentTree = appendExecutionTree({ status: EXECUTION_STATUS.FAILURE, value: v });
        currentLevelExecutionTrees = currentTree.children; // eslint-disable-line
    }
      if (execution.pathToFailure === null) execution.pathToFailure = `${index}`; // eslint-disable-line
      else execution.pathToFailure += `:${index}`; // eslint-disable-line
      execution.value = v; // eslint-disable-line
      execution.failure = message; // eslint-disable-line
  };
  return ({ fail });
};

const canMergePaths = () => {
  const mergePaths = (params) => {
    const { offsetPath, path } = params || {};
    if (offsetPath.length === 0) return path;
    const offsetItems = offsetPath.split(':');
    const remainingItems = path.split(':');
    const middle = +offsetItems[offsetItems.length - 1] + +remainingItems[0];
    return [...offsetItems.slice(0, offsetItems.length - 1), `${middle}`, ...remainingItems.slice(1)].join(':');
  };
  return ({ mergePaths });
};

export const canExecute = ({ helpers: { compose } }) => {
  const execute = (params) => {
    const { verbose = params } = params || {};
    const rootExecutionTrees = [];
    const execution = {
      pathToFailure: null,
      rootExecutionTrees,
      currentExecutionTree: rootExecutionTrees,
      numSkips: 0,
      numSuccesses: 0
    };
    const resp = compose(
      canFail,
      canSucceed,
      canSkip,
      canToRunDetails,
      canAppendExecutionTree,
      canMergePaths
    )({ verbose, execution });
    return resp;
  };
  return ({ execute });
};

export default canExecute;
