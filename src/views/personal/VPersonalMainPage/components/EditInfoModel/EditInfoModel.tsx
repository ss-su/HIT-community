import * as React from 'react'
import styled from 'styled-components'
import { Modal, Form, Input, Radio, Upload, Icon, message, Spin } from 'antd'
import { observer } from 'mobx-react'

import { appStore } from '@/stores'

export interface Props {
  visible: boolean
  onConfirm: (data: any) => void
  onCancel: () => void
}

export interface State {
  userName: string
  sex: number | null
  email: string
  description: string
  imageUrl: string
  loading: boolean
  ModelLoding: boolean
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

@observer
export default class EditInfoModel extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      userName: '',
      sex: null,
      email: 'xxx@qq.com',
      description: '',
      imageUrl: '',
      loading: false,
      ModelLoding: false
    }
  }

  public componentDidUpdate (prevProps: Props) {
    const { visible } = this.props
    if (visible && visible !== prevProps.visible) {
      this.load()
    }
  }

  private load = async () => {
    const user = appStore.userInfo
    this.setState({
      userName: user.userName,
      sex: user.sex,
      email: user.email,
      description: user.personalIntro,
      imageUrl: user.headSculpture
    })
  }

  private handleOk = () => {
    const { userName, sex, description, imageUrl } = this.state
    if (userName == '') {
      message.info('昵称不能为空')
    } else {
      this.props.onConfirm({ userName, sex, description, imageUrl })
    }
  }

  private onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ userName: e.target.value })
  }

  private onSexChange = (e: any) => {
    this.setState({ sex: e.target.value })
  }

  private onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: e.target.value })
  }

  // 图片上传
  private beforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPG) {
      message.error('只能上传jpeg或者png图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片不能大于2MB')
    }
    return isJPG && isLt2M
  }

  private handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      let res = info.file.response
      this.setState({
        imageUrl: res.data.pictureUrl,
        loading: false
      })
    }
  }

  public render () {
    const { visible, onCancel } = this.props
    const { userName, email, sex, description, ModelLoding } = this.state
    const RadioGroup = Radio.Group

    const heard = {
      token: appStore.loginedUser!.token
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>上传头像</div>
      </div>
    )
    const imageUrl = this.state.imageUrl

    return (
      <Wrapper>
        <Modal title='编辑个人信息' visible={visible} onOk={this.handleOk} onCancel={onCancel}>
          <Spin spinning={ModelLoding}>
            <Form>
              <Form.Item label='邮箱' {...formItemLayout}>
                <Input value={email} disabled />
              </Form.Item>
              <Form.Item label='昵称' {...formItemLayout}>
                <Input value={userName} onChange={this.onUserNameChange} placeholder='请输入昵称' />
              </Form.Item>
              <Form.Item label='一句话简介' {...formItemLayout}>
                <Input
                  value={description}
                  onChange={this.onDescriptionChange}
                  placeholder='请用一句话描述自己（不超过20个字）'
                />
              </Form.Item>
              <Form.Item label='性别' {...formItemLayout}>
                <RadioGroup onChange={this.onSexChange} value={sex}>
                  <Radio value={0}>男</Radio>
                  <Radio value={1}>女</Radio>
                </RadioGroup>
              </Form.Item>
              <Form.Item label='用户头像' {...formItemLayout}>
                <Upload
                  name='picture'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  action={`${process.env.REACT_APP_BASE_URL}/file/uploadPicture`}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                  headers={heard}
                >
                  {imageUrl ? (
                    <img src={imageUrl} style={{ width: '200px', height: '200px' }} alt='avatar' />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``
