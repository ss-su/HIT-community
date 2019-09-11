import * as React from 'react'
import styled from 'styled-components'
import { Icon, message } from 'antd'

import { to } from '@/libs/fans'
import { newsApiService } from '@/services'
import HotPoint from '@/components/HotPoint'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {
  data: any
}

export default class VNewsMainPage extends React.Component<Props, State> {
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
    const [err, data] = await to(newsApiService.ListNewsRecommend(1, 99))
    if (err) return message.error(err.message)
    this.setState({
      data: data.records
    })
  }

  private viewNewsDetail = (id: string) => {
    this.props.history.push(`detail/${id}`)
  }

  public render () {
    const {} = this.props
    const { data } = this.state

    return (
      <Wrapper>
        <LeftContainer>
          <MainContainer>
            <Banner>
              <p>新闻资讯</p>
            </Banner>
            {data.map((i: any) => (
              <NewsContainer>
                <TitleCon onClick={this.viewNewsDetail.bind(this, i.id)}>{i.title}</TitleCon>
                <TextContainer>
                  {i.newsFirstPictureUrl && (
                    <PictureCon>
                      <img src={i.newsFirstPictureUrl} />
                    </PictureCon>
                  )}
                  <TextCon>{i.newsShortDesc}</TextCon>
                </TextContainer>
                <OparationContainer>
                  <Oparation>
                    <p>
                      <Icon type='like' style={{ marginRight: 8 }} />
                    </p>
                    {i.likeNum}支持
                  </Oparation>
                  <Oparation>
                    <p>
                      <Icon type='dislike' style={{ marginRight: 8 }} />
                    </p>
                     {i.unlikeNum}反对
                  </Oparation>
                  <Oparation>
                    <Icon type='heart' style={{ marginRight: 8 }} />
                   {i.collectNum}收藏
                  </Oparation>
                  <Oparation>
                    <p>
                      <Icon type='message' style={{ marginRight: 8 }} />
                    </p>
                    {i.commentNum}评论
                  </Oparation>
                  <Oparation>
                    <p>
                      <Icon type='eye' style={{ marginRight: 8 }} />
                    </p>
                    {i.readNum}浏览
                  </Oparation>
                </OparationContainer>
              </NewsContainer>
            ))}
          </MainContainer>
        </LeftContainer>
        <RightContainer>
          <HotPoint />
        </RightContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #f7f7f7;
  width: 100%;
  display: flex;
`

const LeftContainer = styled.div`
  width: 729px;
`
const RightContainer = styled.div`
  margin-left: 16px;
  width: 280px;
`

const MainContainer = styled.div`
  margin-top: 16px;
  background: white;
  padding: 16px;
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
`

const NewsContainer = styled.div`
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 16px;
`

const TitleCon = styled.a`
  font-size: 16px;
  font-weight: bold;
  color: rgba(56, 57, 62, 1);
`

const TextContainer = styled.div`
  width: 100%;
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
