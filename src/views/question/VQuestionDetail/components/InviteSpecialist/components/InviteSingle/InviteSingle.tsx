import * as React from 'react'
import styled from 'styled-components'
import { Avatar, Button,message } from 'antd'

import {to} from '@/libs/fans'
import {questionApiService } from '@/services'
import ava from '@/assets/images/avatar.png'

export interface Props {
  questionId:string
  data:any
}

export interface State {
  isInvite: boolean
}

export default class InviteSingle extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      isInvite: false
    }
  }

   public componentDidMount () {
    this.setState({
      isInvite: this.props.data.isInviteBefore===1
    })
  }

  private onInvite = async(userId:string)=>{
    const questionId = Number(this.props.questionId)
    const [err] = await to(questionApiService.inviteUser(userId,questionId))
    if (err) return message.error(err.message)
    message.success('邀请成功')
     this.setState({
      isInvite: true
    })
  }

  public render () {
    const {data} = this.props
    const {isInvite} = this.state

    return (
      <Wrapper>
        <AvatarCon>
          <Avatar size={40} src={data.userHeadSculpture?data.userHeadSculpture:ava} />
        </AvatarCon>
        <NameCon>
          <a>{data.username}</a>
          <p>{data.userPersonalIntro}</p>
        </NameCon>
        <ActionCon>
          {isInvite ? (
            <p>已邀请</p>
          ) : (
            <Button type='primary' ghost onClick={this.onInvite.bind(this,data.userId)}>
              邀请回答
            </Button>
          )}
        </ActionCon>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  height: 70px;
  border-bottom: 2px solid #f7f7f7;
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
  width: 500px;
  a {
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.65);
  }
`

const ActionCon = styled.div`
  width:100px;
  text-align: center;
  line-height: 50px;
  font-size: 14px;
`
