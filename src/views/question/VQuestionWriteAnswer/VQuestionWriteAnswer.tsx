import * as React from 'react'
import styled from 'styled-components'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

import RouterView, { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {
   current: string
}

export default class VQuestionWriteAnswer extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
       current: 'recommend'
    }
  }

  private handleClick = (e: any) => {
    this.setState({
      current: e.key
    })
  }

  public render () {
    const { routes } = this.props

    return (
      <Wrapper>
        <Banner>
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode='horizontal'>
            <Menu.Item key='recommend' className='ml16'>
              <Link to={'/question/writeAnswer/recomment'}>推荐问题</Link>
            </Menu.Item>
            <Menu.Item key='hotspot' className='ml16'>
              <Link to={'/question/writeAnswer/hot'}>热门问题</Link>
            </Menu.Item>
            <Menu.Item key='invite' className='ml16'>
              <Link to={'/question/writeAnswer/invite'}>邀请回答</Link>
            </Menu.Item>
            <Menu.Item key='follow' className='ml16'>
              <Link to={'/question/writeAnswer/follow'}>我的关注</Link>
            </Menu.Item>
          </Menu>
        </Banner>
        <Container>
          <RouterView routes={routes} />
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 16px;
  background: #f7f7f7;
  width: 100%;
`

const Banner = styled.div`
  height: 45px;
  font-size: 14px;
  margin: 0 auto;
  width:100%;
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
  width: 100%;
`
