import * as React from 'react'
import styled from 'styled-components'
import { Menu, Button, Avatar, message } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { appStore } from '@/stores'
import RouterView, { RouteComponentProps } from '@/components/RouterView'
import EditInfoModel from './components/EditInfoModel'
import { to } from '@/libs/fans'
import { personalApiService } from '@/services'
import BannerPic from '@/assets/images/banner.png'
import ava from '@/assets/images/avatar.png'

export interface Props extends RouteComponentProps<{ userId: string }> {}

export interface State {
  current: string
  editModelVisible: boolean
  userId:string
}

@observer
export default class VPersonal extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      current: 'answer',
      editModelVisible: false,
      userId:''
    }
  }

  public componentWillMount () {
   /* let urlarr = window.location.hash.split('/')
    console.log(window.location.hash)
    console.log(urlarr)
    console.log(urlarr[urlarr.length-1])
    this.setState({
      userId:urlarr[urlarr.length-1]
    })*/
    this.props.history.push(`/personal/mainPage/answer`)
    
  }

  private handleClick = (e: any) => {
    this.setState({
      current: e.key
    })
  }

  private onEditModalConfirm = async (info: any) => {
    const [err] = await to(personalApiService.updateUser(info.userName, info.sex, info.description, info.imageUrl))
    if (err) return message.error(err.message)

    message.success('修改成功')
    this.getUserInfo()
    this.setState({ editModelVisible: false })
  }

  private getUserInfo = async () => {
    if (appStore.loginedUser) {
      const [err] = await to(appStore.getUserInfo(appStore.loginedUser.userId))
      if (err) {
        message.error('获取用户信息出错')
      }
    }
  }

  private onEditModalCancel = () => {
    this.setState({ editModelVisible: false })
  }

  private onEdit = () => {
    this.setState({ editModelVisible: true })
  }

  public render () {
    const { routes } = this.props
    const { editModelVisible } = this.state

    const user = appStore.userInfo!
    if (!user) return null

    return (
      <Wrapper>
        <InfoContainer>
          <InfoPic />
          <InfoTxt>
            <LeftCon>
              <div style={{ marginTop: '-24px', marginLeft: '24px' }}>
                {user.headSculpture ? <Avatar size={150} src={user.headSculpture} /> : <Avatar size={150} src={ava} />}
              </div>
            </LeftCon>
            <MiddletCon>
              <h3>{user.userName}</h3>
              <p>个人简介：{user.personalIntro}</p>
              <a>关注：{user.concernNum}</a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a>粉丝：{user.fansNum}</a>
            </MiddletCon>
            <RightCon>
              <Button type='primary' ghost onClick={this.onEdit}>
                编辑个人信息
              </Button>
            </RightCon>
          </InfoTxt>
        </InfoContainer>
        <MainCon>
          <Banner>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode='horizontal'>
              {/*<Menu.Item key='action' className='ml16'>
                  <Link to={'/personal/mainPage/action'}>动态</Link>
                </Menu.Item>*/}
              <Menu.Item key='answer' className='ml16'>
                <Link to={`/personal/mainPage/answer`}>回答</Link>
              </Menu.Item>
              <Menu.Item key='ask' className='ml16'>
                <Link to={`/personal/mainPage/ask`}>提问</Link>
              </Menu.Item>
             
             
               <Menu.Item key='blog' className='ml16'>
                <Link to={`/personal/mainPage/blog`}>文章</Link>
              </Menu.Item>
              {/**<Menu.Item key='fllow' className='ml16'>
                <Link to={'/personal/mainPage/follow'}>关注的话题</Link>
              </Menu.Item> */}
               <Menu.Item key='collect' className='ml16'>
                <Link to={`/personal/mainPage/collect`}>收藏</Link>  
              </Menu.Item>
               <Menu.Item key='followQuestion' className='ml16'>
                <Link to={`/personal/mainPage/followQuestion`}>关注的问题</Link>
              </Menu.Item>
              <Menu.Item key='follow' className='ml16'>
                <Link to={`/personal/mainPage/follows`}>关注</Link>
              </Menu.Item>
              <Menu.Item key='fans' className='ml16'>
                <Link to={`/personal/mainPage/fans`}>粉丝</Link>
              </Menu.Item>
            </Menu>
          </Banner>
          <Container>
            <RouterView routes={routes} />
          </Container>
        </MainCon>
        <EditInfoModel
          visible={editModelVisible}
          onConfirm={this.onEditModalConfirm}
          onCancel={this.onEditModalCancel}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

const InfoContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 221px;
  background: #fff;
`

const InfoPic = styled.div`
  height: 66px;
  width: 100%;
  overflow: hidden;
  background-color: #0e263c;
  background-image: url(${BannerPic});
  background-size: cover;
  background-position: center;
`
const InfoTxt = styled.div`
  height: 155px;
  width: 100%;
  display: flex;
`

const LeftCon = styled.div`
  height: 155px;
  width: 191px;
`

const MiddletCon = styled.div`
  height: 155px;
  width: 634px;
  padding: 24px;
  h3 {
    font-size: 20px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(56, 57, 62, 1);
  }
  p {
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(159, 163, 176, 1);
  }
  a {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 600;
    color: rgba(98, 109, 163, 1);
  }
`

const RightCon = styled.div`
  height: 155px;
  width: 200px;
  button {
    width: 128px;
    border-radius: 3px;
    margin-top: 100px;
  }
`

const MainCon = styled.div`
  margin-top: 16px;
  background: white;
  width: 100%;
  min-height: 703px;
`
const Banner = styled.div`
  height: 45px;
  font-size: 14px;
  margin: 0 auto;
  display: fixd;
  border-bottom: 1px solid #e8e8e8;
  .ant-menu-horizontal {
    border: 0;
    border-bottom: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    line-height: 45px;
    white-space: nowrap;
  }
`

const Container = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
`
