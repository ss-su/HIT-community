import * as React from 'react'
import styled from 'styled-components'

import{ RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class VQuestionWriteAnswerFollow extends React.Component<Props, State> {

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Container>
          <QuestionCon>
            <a>医疗信息化该如何发展?</a>
            <p>7个回答 | 35人关注</p>
          </QuestionCon>
          <QuestionCon>
            <a>谈谈对最新的医疗政策的看法?</a>
            <p>7个回答 | 35人关注</p>
          </QuestionCon>
          <QuestionCon>
            <a>如何评判医疗大数据平台技术供应商?</a>
            <p>7个回答 | 35人关注</p>
          </QuestionCon>
          <QuestionCon>
            <a>如何看待医院CDR和大数据平台的定位?</a>
            <p>7个回答 | 35人关注</p>
          </QuestionCon>
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
