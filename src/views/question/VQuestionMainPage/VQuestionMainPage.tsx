import * as React from 'react'
import styled from 'styled-components'
import { Menu, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { appStore } from '@/stores'
import { to } from '@/libs/fans'
import { questionApiService } from '@/services'
import RouterView, { RouteComponentProps } from '@/components/RouterView'
import AskModel from '@/components/AskModel'
import LabelCon from './components/LabelCon'
import PolicyCon from '@/components/PolicyCon'
import AnswererCon from './components/AnswererCon'

export interface Props extends RouteComponentProps {}

export interface State {
  current: string
  askModelVisible: boolean
  askConfirmLoading: boolean
}

@observer
export default class VQuestionMainPage extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)
    this.state = {
      current: 'recommend',
      askModelVisible: false,
      askConfirmLoading: false
    }
  }

  private handleClick = (e: any) => {
    this.setState({
      current: e.key
    })
  }

  private onAskModalConfirm = async (info: any) => {
    this.setState({
      askConfirmLoading: true
    })

    const [err, data] = await to(questionApiService.askQuestion(info.labels, info.title, info.htmlContent))
    if (err) {
      this.setState({
        askConfirmLoading: false
      })
      return message.error(err.message)
    } else {
      message.success('发布成功')
      this.setState({
        askModelVisible: false,
        askConfirmLoading: false
      })
      this.props.history.push(`/question/detail/${data.id}`)
    }
  }

  private onAskModalCancel = () => {
    this.setState({ askModelVisible: false, askConfirmLoading: false })
  }

  private onAsk = () => {
    if (appStore.loginedUser) {
      this.setState({ askModelVisible: true })
    } else {
      message.error('请登录后操作')
    }
  }

  public render () {
    const { routes } = this.props
    const { askModelVisible, askConfirmLoading } = this.state

    return (
      <Wrapper>
        <LeftContainer>
          <MainCon>
            <Banner>
              <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode='horizontal'>
                <Menu.Item key='recommend' className='ml16'>
                  <Link to={'/question/mainPage/recommend'}>推荐</Link>
                </Menu.Item>
                <Menu.Item key='hotspot' className='ml16'>
                  <Link to={'/question/mainPage/hotspot'}>热点</Link>
                </Menu.Item>
                {appStore.loginedUser && (
                  <Menu.Item key='follow' className='ml16'>
                    <Link to={'/question/mainPage/follow'}>关注</Link>
                  </Menu.Item>
                )}
              </Menu>
            </Banner>
            <Container>
              <RouterView routes={routes} />
            </Container>
          </MainCon>
        </LeftContainer>
        <RightContainer>
          <AskButtonCon>
            <MButton type='primary' icon='edit' onClick={this.onAsk}>
              提问
            </MButton>
            <p>医信社区已解决12,000条问题</p>
          </AskButtonCon>
          <LabelCon />
          <PolicyCon />
          <AnswererCon />
        </RightContainer>
        <AskModel
          visible={askModelVisible}
          confirmLoading={askConfirmLoading}
          onConfirm={this.onAskModalConfirm}
          onCancel={this.onAskModalCancel}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 16px;
  background: #f7f7f7;
  width: 100%;
  display: flex;
`
const LeftContainer = styled.div`
  width: 729px;
`
const RightContainer = styled.div`
  margin-left: 16px;
  width: 280px;
`
const MainCon = styled.div`
  background: white;
  width: 729px;
  min-height: 703px;
`

const Container = styled.div`
  flex: 1;
  min-height: 0;
  width: 729px;
  margin: 0 auto;
  padding: 16px;
`

const AskButtonCon = styled.div`
  background: #e8edff;
  width: 100%;
  height: 124px;
  text-align: center;
  p {
    color: #5579f3;
    font-size: 13px;
    margin-top: 15px;
  }
`

const MButton = styled(Button as any)`
  width: 150px;
  height: 40px;
  margin-top: 27px;
  border-radius: 6px;
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
