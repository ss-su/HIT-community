import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {}

export default class HotPoint extends React.Component<Props, State> {

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Title>热门话题</Title>
        <Topic><span style={{color:'#5579f3',fontWeight:'bold'}}>1</span>#医保监管#</Topic>
        <Topic><span style={{color:'#5579f3',fontWeight:'bold'}}>2</span>#医保支付改革#</Topic>
        <Topic><span style={{color:'#5579f3',fontWeight:'bold'}}>3</span>#仿制药#</Topic>
        <Topic>4#异地就医政策#</Topic>
        <Topic>5#医院绩效考核#</Topic>
        <Topic>6#医院经济学评估模型#</Topic>
        <Topic>7#社区医生#</Topic>
        <Topic>8#医保专技人才的发展扶助#</Topic>
        <Topic>9#罕见病医药补贴#</Topic>
        <Topic>10#医疗服务健康大数据#</Topic>
      </Wrapper>
    )
  }

}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin-top: 16px;
  padding:16px;
`
const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`
const Topic = styled.a`
  color:rgba(0, 0, 0, 0.65);
  display:block;
  padding:3px;
`
