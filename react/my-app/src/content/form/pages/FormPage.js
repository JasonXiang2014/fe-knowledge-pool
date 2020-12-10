import React, { Component, useEffect } from "react";
import { Form, Field, useForm } from "../components/my-rc-field-form";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

export default function FormPage(props) {
  const [formInstance] = useForm();

  const onFinish = (results) => {
    console.log(results);
  };
  const onFinishFailed = (err) => {
    console.log(err);
  };

  useEffect(() => {});
  console.log("formInstance", formInstance);
  formInstance.setFieldsValue(
    {
      username: "default",
    },
    []
  );

  return (
    <div>
      <h3>Form Page</h3>
      <Form
        form={formInstance}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username"></Input>
        </Field>
        <Field name="password" rules={[passwordRules]}>
          <Input placeholder="input UR Password"></Input>
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}
