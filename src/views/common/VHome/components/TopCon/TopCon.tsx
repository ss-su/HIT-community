import * as React from 'react'
import styled from 'styled-components'
import { Icon, message } from 'antd'

import { to } from '@/libs/fans'
import { newsApiService } from '@/services'

export interface Props {
  onViewNewsList: () => void
  onViewNews: (id: string) => void
}

export interface State {
  data1: any
  data2: any
}

export default class TopCon extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data1: [],
      data2: []
    }
  }

  public componentDidMount () {
    this.load()
  }

  private load = async () => {
    const [err, data] = await to(newsApiService.ListNewsRecommend(1, 5))
    if (err) return message.error(err.message)
    this.setState({
      data1: data.records[0],
      data2: data.records.slice(1)
    })
  }

  public render () {
    const {} = this.props
    const { data1, data2 } = this.state

    return (
      <Wrapper>
        <Banner>
          <p>新闻资讯</p>
          <a href='javascript:void(0);' onClick={this.props.onViewNewsList}>
            查看更多&nbsp;>
          </a>
        </Banner>
        <Container>
          <PreviewCon>
            <TitleView>
              <Title href='javascript:void(0);' onClick={this.props.onViewNews.bind(this, data1.id)}>
                {data1.title}
              </Title>
              <View>
                <a>
                  <Icon type='eye' style={{ marginRight: 4, color: 'rgba(159, 163, 176, 1)' }} />
                </a>
                {data1.readNum}
              </View>
            </TitleView>
            <TextContainer>
              {data1.newsFirstPictureUrl && (
                <PictureCon>
                  <img src={data1.newsFirstPictureUrl} />
                </PictureCon>
              )}
              <TextCon>{data1.newsShortDesc}</TextCon>
            </TextContainer>
          </PreviewCon>
          <TitleCon>
            {data2.map((i: any) => (
              <TitleView>
                <Title href='javascript:void(0);' onClick={this.props.onViewNews.bind(this, i.id)}>
                  {i.title}
                </Title>
                <View>
                  <a>
                    <Icon type='eye' style={{ marginRight: 4, color: 'rgba(159, 163, 176, 1)' }} />
                  </a>
                  {i.readNum}
                </View>
              </TitleView>
            ))}
          </TitleCon>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 16px;
  background: white;
  width: 100%;
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
  margin: 6px 0px;
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
