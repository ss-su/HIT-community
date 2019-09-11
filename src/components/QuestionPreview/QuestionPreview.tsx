import * as React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

export interface Props {
  data: any
}

export interface State {
  follow: boolean
}

export default class QuestionPreview extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      follow: false
    }
  }

  /*private onFollow = () => {
    this.props.data.follow = !this.props.data.follow
    this.setState({ follow: !this.state.follow })
  }*/

  public render () {
    const { data } = this.props

    return (
      <Wrapper>
        <Title>{data.title}</Title>
        <TextContainer>
          {data.imgSrc && (
            <PictureCon>
              <img src={data.imgSrc} />
            </PictureCon>
          )}
          <TextCon>{data.text}</TextCon>
        </TextContainer>
        <OparationContainer>
         {
           /*<Oparation>
            <a onClick={this.onFollow}>
              {data.follow ? (
                <a>
                  <Icon type='check' style={{ marginRight: 8 }} />
                  已关注
                </a>
              ) : (
                <a>
                  <Icon type='plus' style={{ marginRight: 8 }} />
                  关注问题
                </a>
              )}
            </a>
          </Oparation>*/
         } 
          <Oparation>
            <p>
              <Icon type='like' style={{ marginRight: 8 }} />
            </p>
            {data.likeNum}支持
          </Oparation>
          <Oparation>
            <p>
              <Icon type='dislike' style={{ marginRight: 8 }} />
            </p>
            {data.likeNum}反对
          </Oparation>
          <Oparation>
            <p>
              <Icon type='edit' style={{ marginRight: 8 }} />
            </p>
            {data.answerNum}回答
          </Oparation>
          <Oparation>
            <p>
              <Icon type='eye' style={{ marginRight: 8 }} />
            </p>
            {data.viewNum}浏览
          </Oparation>
        </OparationContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 20px 0px;
`
const Title = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: rgba(56, 57, 62, 1);
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

const OparationContainer = styled.div`
  width: 100%;
  height: 20px;
`

const Oparation = styled.div`
  display: inline-block;
  height: 20px;
  margin-left: 20px;
  p {
    display: inline;
  }
`
