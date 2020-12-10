import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form({ children, form, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);
  console.log("formInstance", formInstance);
  formInstance.setCallback({
    onFinishFailed,
    onFinish,
  });
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
}
