import * as React from 'react'
import styled from 'styled-components'
import { Modal, Button, message } from 'antd'

import { to } from '@/libs/fans'
import { authApiService } from '@/services'

export interface Props {
  visible: boolean
  onCancel: () => void
  onViewQuestion: (questionId: string) => void
}

export interface State {
  data: any
}

export default class NoticeModel extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data: []
    }
  }

  public componentDidUpdate (prevProps: Props) {
    const { visible } = this.props
    if (visible && visible !== prevProps.visible) {
      this.load()
    }
  }

  private load = async () => {
    const [err, data] = await to(authApiService.listNotice(1, 999))
    if (err) return message.error(err.message)
    this.setState({
      data: data.records
    })
  }

  /*private onViewNotice= () => {

  }*/

  public render () {
    const { visible } = this.props
    const { data } = this.state

    return (
      <Wrapper>
        <Modal
          visible={visible}
          title='我收到的回答邀请'
          onCancel={this.props.onCancel}
          footer={[
            <Button type='primary' onClick={this.props.onCancel}>
              关闭
            </Button>
          ]}
        >
          <Container>
            {data.map((i: any) => (
              <InviteCom>
                <span>{i.senderUsername}</span> 邀请你回答{' '}
                <a href='javascript:void(0);' onClick={this.props.onViewQuestion.bind(this, i.objectId)}>
                  {i.noticeContent}
                </a>
              </InviteCom>
            ))}
          </Container>
        </Modal>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

const Container = styled.div`
  height: 400px;
  overflow: auto;
`

const InviteCom = styled.div`
  font-size: 14px;
  padding: 10px;
  border-bottom: 2px solid #f7f7f7;
  a {
    color: #5579f3;
  }
  span {
    color: #5579f3;
  }
`
