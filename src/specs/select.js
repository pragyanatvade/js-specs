// export const canSelect = ({
//   specTransducer,
//   registry,
//   predicates: { isString },
//   transduce: {
//     map, reduce, transduce
//   }
// }) => {
//   const keyReducer = selection => () => (acc, spec) => {
//     const { keys } = spec;
//     console.log(spec);
//     console.log(keys(), selection);
//   };
//   const select = (...args) => {
//     let [{ schema, selection }] = args;
//     if (args.length > 1) [schema, selection] = args;


//     const spec = registry.get(schema);
//     const schemaKeys = spec.keys();

//     console.log(schemaKeys);
//     // console.log('test', schema, selection);
//     // const keys = specTransducer({ items: [schema],
// reducer: keyReducer(selection), init: [] });

//     return ({});
//     // if (isString(schema)) {
//     //   const spec = registry.get(schema);
//     //   console.log(, selection);
//     // }
//   };
//   return ({ select });
// };

// export default canSelect;
