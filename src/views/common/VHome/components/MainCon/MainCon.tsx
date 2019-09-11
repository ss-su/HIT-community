import * as React from 'react'
import styled from 'styled-components'
import { Icon, message, Skeleton } from 'antd'

import { to } from '@/libs/fans'
import { blogApiService } from '@/services'

export interface Props {
  onViewArticle: (id: string) => void
}

export interface State {
  data: any
}

export default class MainCon extends React.Component<Props, State> {
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
    const [err, data] = await to(blogApiService.ListArticleRecommend(1, 999))
    if (err) return message.error(err.message)
    this.setState({
      data: data.records
    })
  }

  public render () {
    const {} = this.props
    const { data } = this.state

    return (
      <Wrapper>
        <Banner>
          <p>专家专栏</p>
        </Banner>
        {data.length > 0 ? (
          data.map((i: any) => (
            <BlogContainer>
              <TitleCon href='javascript:void(0);' onClick={this.props.onViewArticle.bind(this, i.id)}>
                {i.title}
              </TitleCon>
              <TextContainer>
                {i.articleFirstPictureUrl && (
                  <PictureCon>
                    <img src={i.articleFirstPictureUrl} />
                  </PictureCon>
                )}
                <TextCon>
                  从政策层面来看，2014年以来，政策层面总体朝着利好方向发展。政策层面总体014年以来，政策层面总体朝着利好方向发展。政策层面总体014年以来，政策层面总体朝着利好方向发展。政策层面总体014年以来，政策层面总体朝着利好方向发展。政策层面总体
                  朝着利好方向发政策层面总体朝着利好方向发政策层面总体朝着利好方向发
                  具体来看，主要对医生多点执业、医保改革、药改、远程多点执业、医保改革、药改、远程医疗等四个方面进行了政策利好落地规划
                </TextCon>
              </TextContainer>
              <OparationContainer>
                <Oparation>
                  <p>
                    <Icon type='user' style={{ marginRight: 8 }} />
                  </p>
                  {i.userName}
                </Oparation>
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
            </BlogContainer>
          ))
        ) : (
          <Skeleton active paragraph={{ rows:30 }}/>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 16px;
  background: white;
  padding-bottom: 30px;
  margin-bottom: 100px;
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
`

const BlogContainer = styled.div`
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 20px 32px;
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
