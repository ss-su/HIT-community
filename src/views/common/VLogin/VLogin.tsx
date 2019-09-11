import * as React from 'react'
import styled from 'styled-components'
import { Button, Form, Input, message, Icon } from 'antd'

import imgBackground from '@/assets/images/bg.jpg'
import { RouteComponentProps } from '@/components/RouterView'
import { to } from '@/libs/fans'
import { appStore } from '@/stores'

export interface Props extends RouteComponentProps {}

export interface State {
  username: string
  password: string
}

export default class VLogin extends React.Component<Props, State> {
  public state: State = {
    username: localStorage.getItem('username') || '',
    password: ''
  }

  private onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  private onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }

  private onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      this.onLogin()
    }
  }

  private onLogin = async () => {
    const { username, password } = this.state

    if (!username) return message.warning('账号不能为空')
    if (!password) return message.warning('密码不能为空')

    const [err] = await to(appStore.login(username, password))

    if (err) {
      message.error(err.message)
    } else {
      this.props.history.push('/')
    }
  }

  private onSignUp = () => {
    this.props.history.push('/signup')
  }

  private onTrip = () => {
    appStore.logout()
    this.props.history.push('/')
  }

  public render () {
    const { username, password } = this.state

    return (
      <Wrapper>
        <Container>
          <HeadCon>
            <ContainerTitle>账号登录</ContainerTitle>
            <a onClick={this.onTrip}>游客登录>>></a>
          </HeadCon>

          <Form>
            <Form.Item>
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                value={username}
                onChange={this.onUsernameChange}
                placeholder='请输入账号/邮箱'
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                value={password}
                onChange={this.onPasswordChange}
                onKeyDown={this.onKeyDown}
                placeholder='请输入密码'
              />
            </Form.Item>
            <LoginButton type='primary' onClick={this.onLogin}>
              登录
            </LoginButton>
          </Form>
          <More>
            <a onClick={this.onSignUp}>注册</a>
            <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</p>
            <a>忘记密码</a>
          </More>
        </Container>
      </Wrapper>
    )
  }
}

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
const HeadCon = styled.div`
  width: 100%;
  a {
    margin-right: -120px;
  }
`

const ContainerTitle = styled.p`
  font-size: 16px;
  float: left;
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
