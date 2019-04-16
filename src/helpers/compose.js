import { compose as comp, reduceRight } from 'lodash/fp';

const mergeFreeze = comp(
  Object.freeze,
  Object.assign
);

const reducer = (fn, agg) => mergeFreeze({}, agg, fn(agg));

export const compose = (...fns) => input => reduceRight(reducer, input || {}, fns);

export default compose;
