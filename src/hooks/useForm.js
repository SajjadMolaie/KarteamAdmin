import { useState } from "react";
import Joi from "joi-browser";

export const useForm = (initialState = {}, onSubmit, schema) => {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, schema, options);
    if (!error) return null;

    let errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const sch = { [name]: schema[name] };
    const { error } = Joi.validate(obj, sch);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ target: input }) => {
    if (schema) {
      let errors = { ...formError };
      const errorMessage = validateProperty(input);
      if (errorMessage) errors[input.name] = errorMessage;
      else delete errors[input.name];

      setFormError(errors);
    }

    setFormData({ ...formData, [input.name]: input.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (schema) {
      const errors = validate();
      setFormError(errors);
      if (errors) return;
    }

    onSubmit?.(formData);
  };

  return { formData, formError, handleChange, handleSubmit, validate };
};
