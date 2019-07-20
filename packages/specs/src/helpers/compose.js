import { compose as comp, reduceRight } from 'lodash/fp';

const mergeFreeze = comp(
  Object.freeze,
  Object.assign
);

const reducer = (fn, agg) => mergeFreeze({}, agg, fn(agg));

export const compose = (...args) => (input) => {
  let fns = args;
  if (Array.isArray(fns[0])) [fns] = args;
  return reduceRight(reducer, input || {}, fns);
};

export default compose;
