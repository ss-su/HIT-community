import * as React from 'react'
import styled from 'styled-components'
import { Avatar, Icon, message } from 'antd'

import { to } from '@/libs/fans'
import { questionApiService } from '@/services'

export interface Props  {
  questionId: string
  onViewAnswer: (answerId:string) => void
}

export interface State {
  data: any
}

export default class AnswerList extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data: {}
    }
  }

  public componentDidMount () {
    this.load()
  }

  private load = async () => {
    const [err, data] = await to(questionApiService.ListAnswer(this.props.questionId, 1, 10))
    if (err) return message.error(err.message)
    this.setState({
      data: data
    })
  }

 /* private onView = (answerId:string) => {
  }
*/
  public render () {
    const {} = this.props
    const { data } = this.state

    return (
      <Wrapper>
        <TopContainer>
          <h3>{data.total}个回答</h3>
        </TopContainer>
        <MainContainer>
          {data.records &&
            data.records.map((i: any) => (
              <AnswerContainer key={i.id}>
                <TopCon>
                  <AvatarCon>
                    <Avatar size={40} src={i.userHeadSculpture} />
                  </AvatarCon>
                  <NameCon>
                    <a>{i.userName}</a>
                    <p>{i.userPersonalIntro}</p>
                  </NameCon>
                  <TimeCon>
                    <p>{i.updatedAt}</p>
                  </TimeCon>
                </TopCon>
                <MiddleCon>
                  <a href='javascript:void(0);' onClick={this.props.onViewAnswer.bind(this,i.id)}>
                    {i.answerShortDesc}...
                  </a>
                </MiddleCon>
                <BottomCon>
                  <Oparation>
                    <Icon type='like' style={{ marginRight: 8 }} /> {i.likeNum}支持
                  </Oparation>
                  <Oparation>
                    <Icon type='dislike' style={{ marginRight: 8 }} />
                    {i.unlikeNum}反对
                  </Oparation>
                  <Oparation>
                    <Icon type='heart' style={{ marginRight: 8 }} />
                    {i.collectNum}收藏
                  </Oparation>
                  <Oparation>
                    <Icon type='message' style={{ marginRight: 8 }} />
                    {i.commentNum}条评论
                  </Oparation>
                  <Oparation>
                    <Icon type='eye' style={{ marginRight: 8 }} />
                   {i.readNum}浏览
                  </Oparation>
                </BottomCon>
              </AnswerContainer>
            ))}
        </MainContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 16px;
  background: white;
  width: 100%;
`
const TopContainer = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 16px;
  display: flex;
  h3 {
    display: inline;
    line-height: 60px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(56, 57, 62, 1);
  }
`

const MainContainer = styled.div`
  width: 100%;
  padding: 16px;
  padding-bottom: 50px;
  margin-bottom: 200px;
`
const AnswerContainer = styled.div`
  padding: 15px 0;
  border-bottom: 2px solid #f0f0f0;
`

const TopCon = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
`
const AvatarCon = styled.div`
  width: 60px;
  text-align: center;
`

const NameCon = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  width: 470px;
  a {
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.65);
  }
`

const TimeCon = styled.div`
  text-align: center;
  line-height: 50px;
  font-size: 14px;
`

const MiddleCon = styled.div`
  width: 100%;
  padding: 0px 20px;
  a {
    color: rgba(0, 0, 0, 0.65);
  }
`

const BottomCon = styled.div`
  padding: 15px 0;
  width: 100%;
`
const Oparation = styled.div`
  display: inline-block;
  height: 20px;
  margin-left: 30px;
  p {
    display: inline;
  }
  span {
    color: rgba(0, 0, 0, 0.65);
  }
`
