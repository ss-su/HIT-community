import * as React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

export interface Props {}

export interface State {}

export default class AskButtonCon extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <MButton type='primary' icon='edit'>
          提问
        </MButton>
        <p>医信社区已解决12,000条问题</p>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #e8edff;
  width: 100%;
  height: 124px;
  text-align: center;
  p{
    color:#5579F3;
    font-size:13px;
    margin-top:15px;
  }
`
const MButton = styled(Button as any)`
  width: 150px;
  height: 40px;
  margin-top: 27px;
  border-radius: 6px;
`
