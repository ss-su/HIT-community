import * as React from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message, Modal } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'

import imgBackground from '@/assets/images/bg.jpg'
import { SignUp } from '@/models'
import { RouteComponentProps } from '@/components/RouterView'
import { validateForm } from '@/libs/validate'
import { to } from '@/libs/fans'
import { authApiService } from '@/services'

export interface Props extends RouteComponentProps, FormComponentProps {}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

export interface State {}

export class VSignUp extends React.Component<Props, State> {
  public state: State = {}

  private fieldOptions: { [key in keyof SignUp]?: GetFieldDecoratorOptions } = {
    email: {
      rules: [
        {
          type: 'email',
          message: '请输入正确的邮箱地址'
        },
        {
          required: true,
          message: '请输入邮箱'
        }
      ]
    },
    password: { rules: [{ required: true, message: '请输入密码' }, { min: 6, message: '密码不能少于6位' }] },
    confirmPassword: {
      rules: [
        { required: true, message: '请再次输入密码' },
        {
          validator: (rule: any, value: string, callback: any) => {
            if (value && value !== this.props.form.getFieldValue('password')) {
              callback('两次输入密码不一致')
            }
            callback()
          }
        }
      ]
    }
  }

  private onLogin = () => {
    this.props.history.push('/login')
  }

  private onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const [err1, values] = await to(validateForm(this.props.form))
    if (err1) return message.error(err1.message)

    const { email, password, confirmPassword } = values

    const [err2] = await to(authApiService.signUp(email, password, confirmPassword))
    if (err2) return message.error(err2.message)

    Modal.confirm({
      content: '恭喜您注册成功！请留意您的邮箱,点击邮箱链接进行验证,验证成功后即可用邮箱和密码登录',
      onOk: () => {
        this.props.history.push('/login')
      }
    })
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Wrapper>
        <Container>
          
          <ContainerTitle>账号注册</ContainerTitle>
          <Form onSubmit={this.onSubmit}>
            <Form.Item {...formItemLayout} label='邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱'>
              {getFieldDecorator('email', this.fieldOptions.email)(<Input placeholder='请输入邮箱' />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label='密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码'>
              {getFieldDecorator('password', this.fieldOptions.password)(
                <Input type='password' placeholder='请输入密码' />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label='确认密码'>
              {getFieldDecorator('confirmPassword', this.fieldOptions.confirmPassword)(
                <Input type='password' placeholder='请确认密码' />
              )}
            </Form.Item>
            <LoginButton type='primary' htmlType='submit'>
              注册
            </LoginButton>
          </Form>
          <More>
            <p>已有账号？</p>
            <a onClick={this.onLogin}>登录</a>
          </More>
        </Container>
      </Wrapper>
    )
  }
}

export default Form.create()(VSignUp)

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #0e263c;
  background-image: url(${imgBackground});
  background-size: cover;
  background-position: center;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 15%;
  z-index: 1;
  padding: 50px;
  width: 400px;
  max-width: 70%;
  transform: translateY(-50%);
  text-align: center;
  background: white;
`

const ContainerTitle = styled.p`
  font-size: 16px;
  text-align: left;
`

const LoginButton = styled(Button as any)`
  &.ant-btn {
    width: 100%;
    margin-top: 10px;
    height: 40px;
  }
`

const More = styled.div`
  margin-top: 20px;
  p {
    display: inline;
  }
`
