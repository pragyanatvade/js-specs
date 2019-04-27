export const canGenerateRecord = ({ tuple, map, option }) => {
  const rawRecord = (schema) => {
    const keys = Object.keys(schema);
    const arbs = keys.map(key => schema[key]);
    const arb = tuple(arbs);
    const iterator = (item) => {
      const obj = {};
      for (let i = 0; i < keys.length; i += 1) {
        obj[keys[i]] = item[i];
      }
      return obj;
    };
    return map(arb, iterator);
  };
  const record = (params) => {
    const { schema = params, constraints } = params;
    if (constraints == null
        || (constraints.withDeletedKeys !== true && constraints.with_deleted_keys !== true)) {
      return rawRecord(schema);
    }

    const updatedschema = {};
    const keys = Object.keys(schema);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      updatedschema[k] = option(schema[k].map(v => ({ value: v })));
    }
    return rawRecord(updatedschema).map((obj) => {
      const nobj = {};
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        if (obj[k] != null) { nobj[k] = obj[k].value; }
      }
      return nobj;
    });
  };
  return ({ record });
};

export default canGenerateRecord;
