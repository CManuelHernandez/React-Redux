const complement = fn => (...args) => !fn(...args);
const isNullOrUndefined = value => [null, undefined].includes(value);
const isValidValue = complement(isNullOrUndefined);
// const isValidValue = (value) => !isNullOrUndefined(value);

const objectToFormData = object =>
  Object.entries(object).reduce((formData, [key, value]) => {
    if (isValidValue(value)) {
      formData.append(key, value);
    }
    return formData;
  }, new FormData());

export const withFormData = fn => object => {
  const formData = objectToFormData(object);
  return fn(formData);
};
