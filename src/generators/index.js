import helpers from '../helpers';

import { canGenerateInteger, canGenerateNatural } from './integer';

const { compose, stream, shrinkable } = helpers;

const numbers = [
  canGenerateNatural,
  canGenerateInteger
];

export default compose(
  ...numbers
)({ compose, stream, shrinkable });
