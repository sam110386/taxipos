import React from "react";
import { Field } from "formik";
import InputMask from "react-input-mask";

const MaskedInput = (props) => (
  <InputMask {...props}>{(inputProps) => <Field {...inputProps} />}</InputMask>
);

export default MaskedInput;
