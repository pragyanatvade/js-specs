import { compose } from './compose';
import { canStream } from './stream';
import { canDistribute } from './distribute';
import { canRandomize } from './xorshift';
import { canGenerateRandom } from './random';

export default compose(
  canStream,
  canGenerateRandom,
  canDistribute,
  canRandomize
)({ compose });
