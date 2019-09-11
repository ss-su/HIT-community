import * as React from 'react'
import styled from 'styled-components'
import { Icon,Avatar } from 'antd'

export interface Props {}

export interface State {}

export default class WriterBox extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <HeadContainer>
          <Title>优秀作者</Title>
          <Redo>
            <Icon style={{ color: 'rgba(159, 163, 176, 1)', fontSize: '12px', marginRight: '3px' }} type='redo' />
            <a>换一批</a>
          </Redo>
        </HeadContainer>
        <BodyContainer>
         <WriterCon>
              <AvatarCon>
                <Avatar
                  size={40}
                  src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                />
              </AvatarCon>
              <NameCon>
                <a>王尼玛</a>
                <p>100关注 | 收录文章40篇</p>
              </NameCon>
            </WriterCon>
            <WriterCon>
              <AvatarCon>
                <Avatar
                  size={40}
                  src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                />
              </AvatarCon>
              <NameCon>
                <a>王尼玛</a>
                <p>100关注 | 收录文章40篇</p>
              </NameCon>
            </WriterCon>
            <WriterCon>
              <AvatarCon>
                <Avatar
                  size={40}
                  src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                />
              </AvatarCon>
              <NameCon>
                <a>王尼玛</a>
                <p>100关注 | 收录文章40篇</p>
              </NameCon>
            </WriterCon>
        </BodyContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin-top: 16px;
  padding:16px;
  margin-bottom:20px;
`

const HeadContainer = styled.div`
  width: 100%;
`

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  padding-top: 24px;
  display: inline;
`

const Redo = styled.div`
  float: right;
  margin-right: 24px;
  a {
    font-size: 12px;
    font-weight: 400;
    color: rgba(159, 163, 176, 1);
  }
`

const BodyContainer = styled.div`
  width: 100%;
  padding: 16px;
`

const WriterCon = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  height: 70px;
`
const AvatarCon = styled.div`
  width: 80px;
  text-align: center;
`

const NameCon = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  width: 500px;
  a {
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.65);
  }
`