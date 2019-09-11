import * as React from 'react'
import styled from 'styled-components'
import { message, Button, Input, Select } from 'antd'
import BraftEditor from 'braft-editor'

import 'braft-editor/dist/index.css'
import { to } from '@/libs/fans'
import { blogApiService, authApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps<{ articleId: string }> {}

export interface State {
  title: string
  editorState: any
  labels: number[]
  labelArr: any[]
}

export default class VBlogWrite extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      title: '',
      editorState: BraftEditor.createEditorState(null),
      labels: [],
      labelArr: []
    }
  }

  public componentDidMount () {
    this.loadLabels()
    const articleId = this.props.match.params.articleId
    if (articleId !== 'new') this.loadArticle()
  }

  private loadArticle = async () => {
    const articleId = this.props.match.params.articleId
    const [err, data] = await to(blogApiService.viewArticle(articleId))
    if (err) return message.error(err.message)
   this.setState({
      editorState: BraftEditor.createEditorState(data.articleContent),
      title:data.title,
      labels:data.articleTagList.map((i:any)=>(i.id))
    })
  }

  private loadLabels = async () => {
    const [err, data] = await to(blogApiService.getLabels())
    if (err) return message.error(err.message)
    this.setState({
      labelArr: data.records
    })
  }

  private myUploadFn = async (param: any) => {
    const form = new FormData()
    form.append('picture', param.file)

    const [err, data] = await to(authApiService.upload(form))
    if (err) {
      param.error({
        msg: '不可上传'
      })
    } else {
      param.success({
        url: data.pictureUrl
      })
    }
  }

  private handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
  }

  private onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }

  private handleChange = (value: any) => {
    this.setState({ labels: value })
  }

  private onSubmitAnswer = async () => {
    const articleId = this.props.match.params.articleId
    const {labels,title} = this.state
    const htmlContent = this.state.editorState.toHTML()
    if (articleId === 'new') {
      const [err] = await to(blogApiService.createArticle(labels,title,htmlContent))
      if (err) return message.error(err.message)
      else {
        message.success('发布成功')
        this.props.history.goBack()
      }
    } else {
      const [err] = await to(blogApiService.updateArticle(articleId,labels,title,htmlContent))
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
    const { title, editorState, labelArr, labels } = this.state

    return (
      <Wrapper>
        <Input
          value={title}
          style={{ marginBottom: '20px' }}
          onChange={this.onTitleChange}
          placeholder='请输入文章标题'
        />
        <Select
          mode='multiple'
          style={{ width: '100%', marginBottom: '20px' }}
          placeholder='请选择文章标签'
          onChange={this.handleChange}
          defaultValue={[]}
          value={labels}
        >
          {labelArr.map((i: any) => (
            <Select.Option key={i.id} value={i.id}>
              {i.topicContent}
            </Select.Option>
          ))}
        </Select>
        <div style={{ borderBottom: '2px solid #f7f7f7' }}>
          <BraftEditor
            style={{ height: '500px', overflow: 'hidden' }}
            value={editorState}
            onChange={this.handleEditorChange}
            media={{ uploadFn: this.myUploadFn }}
          />
        </div>

        <ButtonCon>
          <Button type='primary' onClick={this.onBack} ghost style={{ width: '110px' }}>
            返回
          </Button>
          <Button type='primary' onClick={this.onSubmitAnswer} style={{ marginLeft: '20px', width: '110px' }}>
            发布文章
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
