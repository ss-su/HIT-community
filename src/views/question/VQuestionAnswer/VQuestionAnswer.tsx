import * as React from 'react'
import styled from 'styled-components'
import { message, Button } from 'antd'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css'
import { to } from '@/libs/fans'
import { questionApiService,authApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps<{ questionId: string; answerId: string }> {}

export interface State {
  QuestionTitle: string
  editorState: any
}

export default class VQuestionAnswer extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      QuestionTitle: '',
      editorState: BraftEditor.createEditorState(null)
    }
  }

  public componentDidMount () {
    const answerId = this.props.match.params.answerId
    this.loadQuestion()
    if(answerId!=='new') this.loadAnswer()
  }

  private myUploadFn = async(param:any) => {
    const form = new FormData()
    form.append('picture', param.file)

    const [err,data] = await to(authApiService.upload(form))
    if (err) {
       param.error({
      msg: 'unable to upload.'
    })
    }else{
       param.success({
      url: data.pictureUrl,
    })
    }
  }

  private loadQuestion = async () => {
    const questionId = this.props.match.params.questionId
    const [err, data] = await to(questionApiService.viewQuestion(questionId))
    if (err) return message.error(err.message)
    this.setState({
      QuestionTitle: data.name
    })
  }

  private loadAnswer = async () => {
    const answerId = this.props.match.params.answerId
    const [err, data] = await to(questionApiService.viewAnswer(answerId))
    if (err) return message.error(err.message)
    this.setState({
      editorState: BraftEditor.createEditorState(data.answerContent)
    })
  }

  private handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
  }

  private onSubmitAnswer = async () => {
    const questionId = this.props.match.params.questionId
    const answerId = this.props.match.params.answerId
    const htmlContent = this.state.editorState.toHTML()
    if (answerId === 'new') {
      const [err] = await to(questionApiService.answerQuestion(questionId, htmlContent))
      if (err) return message.error(err.message)
      else {
        message.success('发布成功')
        this.props.history.goBack()
      }
    }else{
      const [err] = await to(questionApiService.updateAnswer(answerId, htmlContent))
      if (err) return message.error(err.message)
      else {
        message.success('修改成功')
        this.props.history.goBack()
      }
    }

  }

  private onBack = () => {
    this.props.history.goBack()
  }

  public render () {
    const {} = this.props
    const { QuestionTitle, editorState } = this.state

    return (
      <Wrapper>
        <h2>{QuestionTitle}</h2>
        <div style={{ borderBottom: '2px solid #f7f7f7' }}>
          <BraftEditor
            style={{ height: '500px', overflow: 'hidden' }}
            value={editorState}
            onChange={this.handleEditorChange}
            media={{uploadFn: this.myUploadFn}}/>
        </div>

        <ButtonCon>
          <Button type='primary' onClick={this.onBack} ghost style={{ width: '110px' }}>
            返回
          </Button>
          <Button type='primary' onClick={this.onSubmitAnswer} style={{ marginLeft: '20px', width: '110px' }}>
            发布回答
          </Button>
        </ButtonCon>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin-top: 16px;
  padding: 16px;
`
const ButtonCon = styled.div`
  margin-left: 650px;
  margin-top: 30px;
  padding-bottom: 60px;
`
