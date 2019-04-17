import { compose } from './compose';

import { canStream } from './stream';

import { canShrink } from './shrinkable';

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
  canStream,

  canShrink,

  ...randomGenerators
)({ compose });
