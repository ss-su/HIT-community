import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

import pic from '@/assets/images/1.png'

export interface Props {}

export interface State {}

export default class RecommendCon extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Banner>
          <p>推荐</p>
          <a>查看更多&nbsp;></a>
        </Banner>
        <Container>
          <PreviewCon>
            <TitleView>
              <Title>谈谈对最新的医疗政策的看法？</Title>
              <View>
                <a>
                  <Icon type='eye' style={{ marginRight: 4, color: 'rgba(159, 163, 176, 1)' }} />
                </a>
                13K
              </View>
            </TitleView>
            <TextContainer>
              <PictureCon>
                <img src={pic} />
              </PictureCon>
              <TextCon>
                从政策层面来看，2014年以来，政策层面总体朝着利好方向发展。政策层面总体朝着利好方向发政策层面总体朝着利好方向发政策层面总体朝着利好方向发
                具体来看，主要对医生多点执业、医保改革、药改、远程多点执业、医保改革、药改、远程医疗等四个方面进行了政策利好落地规划...
              </TextCon>
            </TextContainer>
          </PreviewCon>
          <TitleCon>
            <TitleView>
              <Title>谈谈对最新的医疗政策的看法？</Title>
              <View>
                <a>
                  <Icon type='eye' style={{ marginRight: 4, color: 'rgba(159, 163, 176, 1)' }} />
                </a>
                13K
              </View>
            </TitleView>
            <TitleView>
              <Title>如何培养医疗信息化青年工程师</Title>
              <View>
                <a>
                  <Icon type='eye' style={{ marginRight: 4, color: 'rgba(159, 163, 176, 1)' }} />
                </a>
                15k
              </View>
            </TitleView>
            <TitleView>
              <Title>选择医院信息化建设技术方案的三原则</Title>
              <View>
                <a>
                  <Icon type='eye' style={{ marginRight: 4, color: 'rgba(159, 163, 176, 1)' }} />
                </a>
                200
              </View>
            </TitleView>
          </TitleCon>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  width: 729px;
  min-height: 350px;
`

const Banner = styled.div`
  width: 729px;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #e8e8e8;

  padding-left: 25px;
  p {
    display: inline;
    font-size: 16px;
    font-weight: 500;
  }
  a {
    float: right;
    margin-right: 25px;
    font-size: 14px;
    color: rgba(159, 163, 176, 1);
  }
`

const Container = styled.div`
  padding: 16px;
`

const PreviewCon = styled.div`
  height: 160px;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 10px 16px;
`

const TitleCon = styled.div`
  margin-top: 10px;
  padding: 0px 16px;
`

const TitleView = styled.div`
  width: 729px;
  height: 30px;
  margin:6px 0px;
`

const Title = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: rgba(56, 57, 62, 1);
`
const View = styled.div`
  float: right;
  margin-right: 100px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(159, 163, 176, 1);
`

const TextContainer = styled.div`
  width: 100%;
  height: 90px;
  margin: 10px 0px;
  display: flex;
`

const PictureCon = styled.div`
  width: 160px;
  height: 90px;
  margin-right: 15px;
  img {
    width: 160px;
    height: 90px;
  }
`

const TextCon = styled.div`
  height: 90px;
  padding: 4px 15px 4px 0px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(56, 57, 62, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
`
