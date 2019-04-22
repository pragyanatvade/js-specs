import { compose } from './compose';

import { canStream } from './stream';

import { canShrink } from './shrinkable';

import { canMap } from './map';

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
  canMap,

  canStream,

  canShrink,

  ...randomGenerators
)({ compose });
