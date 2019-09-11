import * as React from 'react'
import styled from 'styled-components'

import { RouteComponentProps } from '@/components/RouterView'
import QuestionPreview from '@/components/QuestionPreview'
import pic from '@/assets/images/1.png'

export interface Props extends RouteComponentProps {}

export interface State {
  data: any
}

export default class VQuestionFollow extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data: [
        {
          id: '1111',
          title: '谈谈对最新的医疗政策的看法？',
          imgSrc: pic,
          text:
            '近几年来，随着我国卫生总费 用的快速增长，尤其是药占 比逐年增加，其在GDP的占比增速，已经是不健康的发展态势。数据表明，中国的总药费不断增长，门诊 、住院和零售药费均逐年增加，人均药品费用占总医疗费用的比例仍旧较高（如下图所示）。在现今存在过度医疗、药品虚高的环境下',
          likeNum: '1,200',
          viewNum: '1,300',
          answerNum: '1,300',
          follow: false
        },
        {
          id: '11112',
          title: '焦雅辉：所有公立医院都要参加电子病历应用评级',
          imgSrc: '',
          text:
            '医疗领域，互联网、人工智能技术的应用越来越深入和广泛。曾经《颠覆医疗》这本书批评医疗领域最保守，互联网进入医疗领域很难，提出用互联网技术颠覆医疗。现在不能再说医疗行业是个保守行业，互联网应用多点开花，呈现出多种多样、多种模式并存的局面。未来产业融合发展具有巨大的空间，为医疗越来越深入和广泛。曾经《颠覆医疗》这本书批评医疗领域最保守，互联网进入医疗领域很难，提出用互联网技术颠覆医疗。现在不能再说医疗行业是个保守行业，互联网应用多点开花，呈现出多种多样、多种模式并存的局面。未来产业融合发展具有巨大的空间，为医疗效率效率提高、质量提升插上了翅膀。智慧医院是未来一段时期的发展方向。',
          likeNum: '1,200',
          viewNum: '1,300',
          answerNum: '1,300',
          follow: true
        },
        {
          id: '111512',
          title: '焦雅辉：所有公立医院都要参加电子病历应用评级青岛大学附属医院如何开展“互联网+医疗健康”便民惠民服务',
          imgSrc: '',
          text:
            '3月31日下午，由江苏省医院协会医院信息管理专业委员会主办、江苏省人民医院和HIT专家网共同承办、腾讯企业微信和腾讯安全及其生态合作伙伴联软科技、红帆科技、维保保等企业共同协办的“互联网+医疗健康”专题研讨会在江苏省人民医院成功举办，并重点聚焦两方面议题：企业微信在医院的应用场景，以及互联网开放环境下的医院网络安全等热点话题。',
          likeNum: '1,200',
          viewNum: '1,300',
          answerNum: '1,300',
          follow: true
        }
      ]
    }
  }

  public render () {
    const {} = this.props
    const { data } = this.state

    return (
      <Wrapper>
        {data.map((i: any) => (
          <QuestionPreview data={i} key={i.id} />
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 16px;
`
