import { compose } from './compose';
import { streamify } from './stream';
import { uniformRandomDistribution } from './distribute';
import { randomGenerator } from './xorshift';
import { canRandomizeByGenerator, canRandomizeBySeed } from './random';

const randomGenerators = [
  canRandomizeBySeed,
  canRandomizeByGenerator,
  uniformRandomDistribution,
  randomGenerator
];

export default compose(
  streamify,
  ...randomGenerators
)({ compose });
