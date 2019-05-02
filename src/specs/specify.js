
export const canSpecify = ({ conform }) => {
  const specify = params => function spec() {
    const { fn = params, key = params.name } = params;
    const args = arguments; // eslint-disable-line
    const ret = fn.apply(this, args);
    const resp = conform({ key, data: { args, ret } });
    return resp;
  };
  return ({ specify });
};

export const canSpecifyAll = ({
  specify, predicates: { isFunction }, _
}) => {
  const specifyAll = obj => function spec() {
    const tempObj = obj;
    _.forEach(Object.getOwnPropertyNames(obj), (key) => {
      const func = obj[key];
      if (isFunction(func)) tempObj[`${key}Spec`] = specify(func);
    });
  };
  return ({ specifyAll });
};

export default canSpecify;
