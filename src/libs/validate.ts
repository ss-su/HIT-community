import { WrappedFormUtils } from 'antd/lib/form/Form'

export const rules = {
  email: [
    {
      type: 'email',
      message: '请输入正确的邮箱地址'
    },
    {
      required: true,
      message: '请输入邮箱'
    }
  ],
  password: [{ required: true, message: '请输入密码' }],
  comfirmPwd: [{ required: true, message: '请再次输入密码' }]
}

export function getMessage (err: any): string {
  if (err) {
    return err[Object.keys(err)[0]].errors[0].message
  }
  return ''
}

export function validateForm<T = any> (form: WrappedFormUtils) {
  return new Promise<T>((resolve, reject) => {
    form.validateFieldsAndScroll((errors: any, values: T) => {
      if (errors) reject(new Error(getMessage(errors)))
      else resolve(values)
    })
  })
}
