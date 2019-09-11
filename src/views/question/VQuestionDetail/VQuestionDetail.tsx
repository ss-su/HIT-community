import * as React from 'react'
import styled from 'styled-components'
import { Tag, Button, Icon, message } from 'antd'

import { to } from '@/libs/fans'
import { questionApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'
import PolicyCon from '@/components/PolicyCon'
import AboutQuestion from './components/AboutQuestion'
import InviteSpecialist from './components/InviteSpecialist'
import AnswerList from './components/AnswerList'
import AskModel from '@/components/AskModel'


export interface Props extends RouteComponentProps<{ id: string }> {}

export interface State {
  questionData: any
  askModelVisible: boolean
  askConfirmLoading: boolean
}

export default class VQuestionDetail extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)
    this.state = {
      questionData: {},
      askModelVisible: false,
      askConfirmLoading: false
    }
  }

  public componentDidMount () {
    this.loadQuestion()
  }

  private loadQuestion = async () => {
    const id = this.props.match.params.id
    const [err, data] = await to(questionApiService.viewQuestion(id))
    if (err) return message.error(err.message)
    this.setState({
      questionData: data
    })
  }

  //修改问题相关

  private onAnswer = () => {
     const questionId = this.props.match.params.id
     this.props.history.push(`/question/answer/${questionId}/${'new'}`)
  }

  private onEditQuestion = () => {
    this.setState({ askModelVisible: true })
  }

  private onAskModalConfirm = async (info: any) => {
    const id = this.props.match.params.id
    this.setState({
      askConfirmLoading: true
    })

    const [err] = await to(questionApiService.updateQuestion(id,info.labels, info.title, info.htmlContent))
    if (err) {
      this.setState({
        askConfirmLoading: false
      })
      return message.error(err.message)
    } else {
      message.success('修改成功')
      this.setState({
        askModelVisible: false,
        askConfirmLoading: false
      })
      this.loadQuestion()
    }
  }

  private onAskModalCancel = () => {
    this.setState({ askModelVisible: false, askConfirmLoading: false })
  }

  private onViewAnswer = (answerId:string) =>{
    const questionId = this.props.match.params.id
    this.props.history.push(`/question/viewAnswer/${questionId}/${answerId}`)
  }

  public render () {
    const { questionData,askConfirmLoading,askModelVisible } = this.state
    const questionId = this.props.match.params.id
    const id = this.props.match.params.id

    return (
      <Wrapper>
        <TopContainer>
          <LabelCon>
            {questionData.questionTopicIdList &&
              questionData.questionTopicIdList !== [] &&
              questionData.questionTopicIdList.map((i: any) => (
                <Tag color='#E8EDFF' key={i.id} style={{ fontSize: '14px', color: '#5579F3' }}>
                  {i.topicContent}
                </Tag>
              ))}

            <a onClick={this.onEditQuestion}>
              <Icon type='edit' />
              修改
            </a>
          </LabelCon>
          <TitleCon>{questionData.name}</TitleCon>
          <DescCon>
            <div
              dangerouslySetInnerHTML={{
                __html: questionData.questionDesc
              }}
            />
          </DescCon>
          <ButtonCon>
            <Button type='primary' style={{ width: '110px' }}>
              关注问题
            </Button>
            <Button onClick={this.onAnswer} type='primary' ghost style={{ marginLeft: '20px', width: '110px' }}>
              回答
            </Button>
          </ButtonCon>
        </TopContainer>
        <MainContainer>
          <LeftContainer>
            <InviteSpecialist  questionId={questionId}/>
            <AnswerList onViewAnswer={this.onViewAnswer} questionId={questionId}/>
          </LeftContainer>
          <RightContainer>
            <AboutQuestion />
            <PolicyCon />
          </RightContainer>
        </MainContainer>
        <AskModel
          visible={askModelVisible}
          confirmLoading={askConfirmLoading}
          onConfirm={this.onAskModalConfirm}
          onCancel={this.onAskModalCancel}
          questionId={id}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #f7f7f7;
  width: 100%;
`

const TopContainer = styled.div`
  border-top: 1px solid #a5b2ba;
  padding: 20px;
  background: white;
  min-height: 232px;
  width: 100%;
`

const LabelCon = styled.div`
  min-height: 34px;
  margin-top: 10px;
  a {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(128, 134, 151, 1);
    float: right;
  }
`
const TitleCon = styled.h2`
  min-height: 20px;
`

const DescCon = styled.div`
  width: 100%;
`

const ButtonCon = styled.div`
  min-height: 50px;
`

const MainContainer = styled.div`
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
