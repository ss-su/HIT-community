import * as React from 'react'
import styled from 'styled-components'
import RouterView, { RouteComponentProps } from '@/components/RouterView'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

export interface Props extends RouteComponentProps {}

export interface State {
  current: string
}

export default class MainCon extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      current: 'follow'
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
            <Menu.Item key='follow' className='ml16'>
              <Link to={'/question/follow'}>关注</Link>
            </Menu.Item>
            <Menu.Item key='hotspot' className='ml50'>
              <Link to={'/question/hotspot'}>热点</Link>
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
  background: white;
  width: 729px;
  min-height: 703px;
`

const Banner = styled.div`
  width: 729px;
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
  width: 729px;
  margin: 0 auto;
`
