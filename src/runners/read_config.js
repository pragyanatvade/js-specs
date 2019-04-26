
export const VERBOSITY = {
  // Minimal reporting, minimum failing case, error log corresponding to minimum failing case
  NONE: 0,
  // Failures reporting, List of all failures encountered during shrinking process
  VERBOSE: 1,
  // Execution flow reporting, all runs with their associated status displayed as tree
  VERY_VERBOSE: 2
};

const readSeed = (params) => {
  let { seed = (Date.now() ^ (Math.random() * 0x100000000)) } = params || {}; // eslint-disable-line
  const seed32 = seed | 0; // eslint-disable-line
  if (seed > seed32) {
    const gap = seed - seed32;
    seed = seed32 ^ (gap * 0x100000000); // eslint-disable-line
  }

  return ({ seed });
};

const readRandomType = (params) => {
  const { randomType = params.xorshift128plus } = params || {};
  return ({ randomType });
};

const readEndOnFailure = (params) => {
  const { endOnFailure = true } = params;
  return ({ endOnFailure });
};

const readNumRuns = (params) => {
  const { numRuns = 100 } = params || {};
  return ({ numRuns });
};

const readMaxSkipsPerRun = (params) => {
  const { maxSkipsPerRun = 100 } = params || {};
  return ({ maxSkipsPerRun });
};

const readTimeout = (params) => {
  const { timeout = null } = params || {};
  return ({ timeout });
};

const readPath = (params) => {
  const { path = '' } = params || {};
  return ({ path });
};

const readUnbiased = (params) => {
  const { unbiased = true } = params || {};
  return ({ unbiased });
};

const readVerbose = (params) => {
  let { verbose = VERBOSITY.NONE } = params;
  verbose = verbose === true ? VERBOSITY.VERBOSE : VERBOSITY.NONE;
  if (verbose >= VERBOSITY.VERY_VERBOSE) verbose = VERBOSITY.VERY_VERBOSE;
  if (verbose <= VERBOSITY.NONE) verbose = VERBOSITY.NONE;

  return ({ verbose });
};

const readLogger = (params) => {
  const { logger = v => console.log(v) } = params;
  return ({ logger });
};

const readExamples = (params) => {
  const { examples = [] } = params;
  return ({ examples });
};

export const canReadConfig = ({ compose, xorshift128plus }) => {
  const readConfig = params => compose(readSeed,
    readRandomType,
    readEndOnFailure,
    readNumRuns,
    readMaxSkipsPerRun,
    readTimeout,
    readPath,
    readUnbiased,
    readVerbose,
    readLogger,
    readExamples)({ xorshift128plus, ...params });
  return ({ readConfig });
};
