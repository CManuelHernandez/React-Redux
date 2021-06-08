import React from 'react';

const getValueByType = {
  checkbox: ({ checked }) => checked,

  number: ({ value }) => Number(value),

  'select-multiple': ({ selectedOptions }) =>
    [...selectedOptions].map(({ value }) => value),

  file: ({ files }) => files[0] || null,
};

const defaultGetValue = ({ value }) => value;

function useForm(initialFormValue) {
  const [formValue, setFormValue] = React.useState(initialFormValue);

  const updateFormValue = (name, value) => {
    setFormValue(currentFormValue => ({
      ...currentFormValue,
      [name]: value,
    }));
  };

  const handleChange = ev => {
    const valueGetter = getValueByType[ev.target.type] || defaultGetValue;
    updateFormValue(ev.target.name, valueGetter(ev.target));
  };

  const handleSubmit = onSubmit => ev => {
    ev.preventDefault();
    onSubmit(formValue);
  };

  const validate = (...validations) =>
    validations.map(validation => validation(formValue)).every(valid => valid);

  return {
    formValue,
    setFormValue,
    handleChange,
    handleSubmit,
    validate,
  };
}

export default useForm;
