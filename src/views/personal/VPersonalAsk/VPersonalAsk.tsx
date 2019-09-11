import * as React from 'react'
import styled from 'styled-components'
import { message } from 'antd'
import { observer } from 'mobx-react'

import { appStore } from '@/stores'
import { to } from '@/libs/fans'
import { personalApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {
  data: any
}

@observer
export default class VPersonalAsk extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data: []
    }
  }

  public componentDidMount () {
    this.load()
  }

  private load = async () => {
    const [err, data] = await to(personalApiService.ListUserQuestion(appStore.userInfo.userId, 1, 999))
    if (err) return message.error(err.message)
    this.setState({
      data: data.records
    })
  }

   private onViewAsk = (questionId:string) => {
    this.props.history.push(`/question/detail/${questionId}`)
  }

  public render () {
    const {} = this.props
    const { data } = this.state

    return (
      <Wrapper>
        <Container>
          {data.map((i: any) => (
            <QuestionCon>
              <a  href='javascript:void(0);' onClick={this.onViewAsk.bind(this,i.id)}>{i.name}?</a>
              <p>{i.answerNum | 0}个回答 | {i.followNum}人关注</p>
            </QuestionCon>
          ))}
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  padding: 16px;
  width: 100%;
`
const Container = styled.div`
  margin-top: 16px;
`

const QuestionCon = styled.div`
  border-bottom: 2px solid #f7f7f7;
  a {
    font-size: 16px;
    font-weight: bold;
    color: rgba(56, 57, 62, 1);
  }
`
