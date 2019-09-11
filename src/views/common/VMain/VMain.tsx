import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { Menu, Input, Badge, Icon, Avatar, Dropdown, Modal, message } from 'antd'

import { to } from '@/libs/fans'
import { appStore } from '@/stores'
import RouterView, { RouteComponentProps } from '@/components/RouterView'
import NoticeModel from '@/components/NoticeModel'
import avatar from '@/assets/images/avatar.png'
import logo from '@/assets/images/logo.png'

export interface Props extends RouteComponentProps {}

export interface State {
  current: string
  query: string
  noticeModelVisible: boolean
}

@observer
export default class VMain extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      noticeModelVisible: false,
      current: 'home',
      query: ''
    }
  }

  public componentWillMount () {
    this.getUserInfo()
    const pathName = window.location.hash.split('/')[1]
    if (pathName === 'blog') {
      this.setState({
        current: 'blog'
      })
    }
    if (pathName === 'question') {
      this.setState({
        current: 'question'
      })
    }
    if (pathName === 'personal') {
      this.setState({
        current: 'person'
      })
    }
  }

  // 通知相关
  private onNoticeCancel = () => {
    this.setState({
      noticeModelVisible: false
    })
  }

  private onShowNotice = () => {
    this.setState({
      noticeModelVisible: true
    })
  }

  private onViewQuestion = (questionId: string) => {
    this.props.history.push(`/question/detail/${questionId}`)
    this.setState({
      noticeModelVisible: false
    })
  }

  private getUserInfo = async () => {
    if (appStore.loginedUser !== null) {
      const [err] = await to(appStore.getUserInfo(appStore.loginedUser.userId))
      if (err) {
        message.error('获取用户信息出错')
      }
    }
  }

  private handleClick = (e: any) => {
    this.setState({
      current: e.key
    })
  }

  private onLogout = () => {
    Modal.confirm({
      content: '确定退出登录？',
      onOk: () => {
        appStore.logout()
        this.props.history.push('/login')
      }
    })
  }

  private onLogin = () => {
    this.props.history.push('/login')
  }

  private onSignUp = () => {
    this.props.history.push('/signUp')
  }

  private onPersonal = () => {
    this.props.history.push(`/personal`)
  }

  private onChangePassword = () => {}

  private onHome = () =>{
     this.props.history.push('/')
  } 

  public render () {
    const { routes } = this.props
    const { noticeModelVisible } = this.state
    const Search = Input.Search
    const logined = appStore.loginedUser
    const user = appStore.userInfo

    if (logined) {
      if (!user) return null
    }

    const menu = (
      <Menu style={{ width: '80px' }}>
        <Menu.Item key='0'>
          <a onClick={this.onPersonal}>个人中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='1'>
          <a onClick={this.onChangePassword}>修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key='2'>
          <a onClick={this.onLogout}>退出登录</a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Wrapper>
        <TopBar>
          <Banner>
            <LogoBox onClick={this.onHome}>
              <img src={logo}/>
            </LogoBox>
            <MenuBox>
              <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode='horizontal'>
                <Menu.Item key='home' className='ml20'>
                  <Link to={'/'}>首页</Link>
                </Menu.Item>
                <Menu.Item key='blog' className='ml50'>
                  <Link to={'/blog'}>专栏</Link>
                </Menu.Item>
                <Menu.Item key='question' className='ml50'>
                  <Link to={'/question'}>问答</Link>
                </Menu.Item>
              </Menu>
            </MenuBox>
            <InfoBox>
              <InnerBox1>
                <Search placeholder='站内搜索' onSearch={(value) => console.log(value)} style={{ width: 200 }} />
              </InnerBox1>
              <InnerBox2>
                <Badge count={1} dot>
                  <a href='javascript:void(0);' onClick={this.onShowNotice} style={{ color: 'grey' }}>
                    <Icon type='notification' style={{ fontSize: 20 }} />
                  </a>
                </Badge>
              </InnerBox2>
              <InnerBox3>
                {logined && (
                  <span>
                    {user && user.headSculpture ? (
                      <Avatar src={user.headSculpture} size={32} />
                    ) : (
                      <Avatar src={avatar} size={32} />
                    )}

                    <Dropdown overlay={menu} placement='bottomRight'>
                      <a className='ant-dropdown-link' href='#' style={{ marginLeft: '20px' }}>
                        {user && user.userName ? user.userName : '无昵称'} <Icon type='down' />
                      </a>
                    </Dropdown>
                  </span>
                )}
                {!logined && (
                  <InnerBox4>
                    <a onClick={this.onLogin}>登录</a>
                    <p>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</p>
                    <a onClick={this.onSignUp}>注册</a>
                  </InnerBox4>
                )}
              </InnerBox3>
            </InfoBox>
          </Banner>
        </TopBar>
        <Container>
          <RouterView routes={routes} />
        </Container>
        <NoticeModel visible={noticeModelVisible} onViewQuestion={this.onViewQuestion} onCancel={this.onNoticeCancel} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  background: #f7f7f7;
`

const TopBar = styled.div`
  background: #ffffff;
  width: 100%;
  height: 56px;
`
const Banner = styled.div`
  width: 1025px;
  margin: 0 auto;
  display: fixd;
`

const MenuBox = styled.div`
  width: 350px;
  margin-left: 30px;
  margin-top: 10px;
`

const LogoBox = styled.div`
  text-align: center;
  img{
    margin-top:18px;
    margin-left:40px;
  }
`
const InfoBox = styled.div`
  margin-left: 20px;
  display: fixd;
`

const InnerBox1 = styled.div`
  margin-top: 15px;
`

const InnerBox2 = styled.div`
  margin-top: 20px;
  margin-left:20px;
`

const InnerBox3 = styled.div`
  margin-top: 12px;
  margin-left: 40px;
`
const InnerBox4 = styled.div`
  margin-top: 8px;
  p {
    display: inline;
  }
`

const Container = styled.div`
  flex: 1;
  min-height: 0;
  width: 1025px;
  margin: 0 auto;
`
