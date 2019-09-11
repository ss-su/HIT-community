import * as React from 'react'
import styled from 'styled-components'
import { Modal, Input, Icon, Select,message } from 'antd'
import BraftEditor from 'braft-editor'

import {to} from '@/libs/fans'
import {questionApiService,authApiService } from '@/services'
import 'braft-editor/dist/index.css'

export interface Props {
  visible: boolean
  confirmLoading: boolean
  onConfirm: (data: any) => void
  onCancel: () => void
  questionId?:string
}

export interface State {
  editorState: any
  title: string
  labelArr:string[]
  labels:string[]
}

export default class AskModel extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)
    this.state = {
      // 创建一个空的editorState作为初始值
      // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
      editorState: BraftEditor.createEditorState(null),
      title: '',
      labelArr:[],
      labels:[]
    }
  }

  public componentDidUpdate (prevProps: Props) {

    const { visible } = this.props
    if (visible && visible !== prevProps.visible) {
      this.setState({
        editorState: BraftEditor.createEditorState(null),
        title: '',
        labels:[]
      })
      this.loadLabels()
      if(this.props.questionId) this.loadQuestion()
    }
  }

  private loadLabels = async () => {
    const [err,data] = await to(questionApiService.getLabels())
    if (err) return message.error(err.message)
     this.setState({
       labelArr:data.records
     })
  }

  private loadQuestion= async () => {
    const id = this.props.questionId
    const [err,data] = await to(questionApiService.viewQuestion(id))
     if (err) return message.error(err.message)
     this.setState({
        editorState: BraftEditor.createEditorState(data.questionDesc),
        title: data.name,
        labels:data.questionTopicIdList.map((i:any)=>(i.id))
      })
  }


  private handleOk = () => {
    const {labels,title} = this.state
    const htmlContent = this.state.editorState.toHTML()
   this.props.onConfirm({labels,title,htmlContent})
  }

  private handleEditorChange = (editorState: any) => {
    this.setState({ editorState })
  }

  private onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }

  private handleChange = (value:any)=> {
   this.setState({ labels:value })
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

  public render () {
    const { visible, confirmLoading, onCancel } = this.props
    const { editorState, title,labelArr,labels } = this.state
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'media','fullscreen']

    return (
      <Wrapper>
        <Modal title='请描述你的问题' width={700} style={{ top: 20 }} visible={visible} onOk={this.handleOk} confirmLoading={confirmLoading} onCancel={onCancel}>
          <Input 
          prefix={<Icon type='question' 
          style={{ color: 'rgba(0,0,0,.25)' }} />} 
          value={title} 
          style={{marginBottom:'10px'}}
          onChange={this.onTitleChange} 
          placeholder='请输入标题' />
          <EditorContainer>
            <BraftEditor 
            value={editorState} 
            controls={controls}
            style={{ height: '400px',overflow:'hidden' }} 
            onChange={this.handleEditorChange} 
            placeholder='请输入问题描述'
            media={{uploadFn: this.myUploadFn}}/>
          </EditorContainer>
          <Select
            mode="multiple"
            style={{ width: '100%',marginTop: '10px' }}
            placeholder="请选择问题标签"
            onChange={this.handleChange}
            defaultValue={[]}
            value={labels}
          >
           {labelArr.map((i: any) => (
            <Select.Option key={i.id} value={i.id}>{i.topicContent}</Select.Option>
          ))}
          </Select>
        </Modal>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

const EditorContainer = styled.div`
  border: 1px solid #d9d9d9;
`
