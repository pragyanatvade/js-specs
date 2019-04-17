import helpers from '../helpers';

import { canGenerateInteger } from './integer';

const { compose, stream, shrinkable } = helpers;

const numbers = [
  canGenerateInteger
];

export default compose(
  ...numbers
)({ compose, stream, shrinkable });
