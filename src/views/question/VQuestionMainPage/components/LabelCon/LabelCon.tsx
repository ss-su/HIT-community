import * as React from 'react'
import styled from 'styled-components'
import { Tag } from 'antd'

export interface Props {}

export interface State {}

export default class LabelCon extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Title>热门标签</Title>
        <Container>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
          <MyTag>医疗系统</MyTag>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin-top: 16px;
  padding:16px;
  padding-bottom:30px;
`
const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`
const Container = styled.div`
  width: 100%;
  .ant-tag {
    margin-top: 14px;
    margin-left: 12px;
  }
`

const MyTag = styled(Tag as any)`
  width: 100px;
  text-align: center;
`
