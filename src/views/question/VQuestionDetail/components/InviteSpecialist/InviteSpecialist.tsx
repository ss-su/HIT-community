import * as React from 'react'
import styled from 'styled-components'
import { Input, message } from 'antd'

import { to } from '@/libs/fans'
import { questionApiService } from '@/services'
import InviteSingle from './components/InviteSingle'

export interface Props {
  questionId: string
}

export interface State {
  listInvite: any
}

export default class InviteSpecialist extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      listInvite: []
    }
  }

  public componentDidMount () {
    this.load()
  }

  private load = async () => {
    const [err, data] = await to(questionApiService.ListInviteUser(this.props.questionId, 1, 5))
    if (err) return message.error(err.message)
    this.setState({
      listInvite: data.records
    })
  }

  public render () {
    const { questionId } = this.props
    const { listInvite } = this.state
    const Search = Input.Search

    return (
      <Wrapper>
        <TopContainer>
          <h3>邀请专家 可更快获得满意答案唷！</h3>
          <div style={{ height: '15px', marginLeft: '250px', marginTop: '15px' }}>
            <Search
              placeholder='输入你想邀请的专家'
              onSearch={(value) => console.log(value)}
              style={{ width: '200px' }}
            />
          </div>
        </TopContainer>
        <MainContainer>
          {listInvite.length !== 0
            ? listInvite.map((i: any) => <InviteSingle key={i.userId} questionId={questionId} data={i} />)
            : '暂无可邀请用户'}
        </MainContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
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
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(56, 57, 62, 1);
  }
`

const MainContainer = styled.div`
  width: 100%;
  padding: 16px;
`
