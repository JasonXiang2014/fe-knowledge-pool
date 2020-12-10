import { useRef } from 'react'

class FormStore {
  constructor() {
    this.store = {} //存储数据，比如 userName password
    //存储field
    this.fieldEntities = []
    this.callbacks = {}
  }

  registerEntity = (entity) => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
      delete this.store[entity.props.name]
    }
  }

  setFieldValue = () => {

  }
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    }
    console.log(this.store, this.fieldEntities)
    //对应的组件要更新
    this.fieldEntities.forEach(entity => {
      const { name } = entity.props
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange()
        }
      })
    })
  }

  setCallback = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }
  validate = () => {
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        //  出错
        err.push({
          [name]: rule.message,
          value
        });
      }
    });
    return err;
  };

  submit = () => {
    console.log("this.", this.fieldEntities); //sy-log
    let err = this.validate();
    // 在这里校验 成功的话 执行onFinish ，失败执行onFinishFailed
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      // 成功的话 执行onFinish
      onFinish(this.getFiledsValue());
    } else if (err.length > 0) {
      // 失败执行onFinishFailed
      onFinishFailed(err);
    }
  };


  getFieldValue = (name) => {
    return this.store[name]
  }

  getFiledsValue = () => {
    return this.store
  }

  getForm() {
    return {
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      getFieldValue: this.getFieldValue,
      registerEntity: this.registerEntity,
      submit: this.submit,
      setCallback: this.setCallback,
    }
  }
}

//自定义hook 共享逻辑
export default function useForm(form) {
  const formRef = useRef()
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }
  return [formRef.current]
}