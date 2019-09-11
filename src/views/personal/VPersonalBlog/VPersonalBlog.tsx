import * as React from 'react'
import styled from 'styled-components'
import { message,Icon } from 'antd'
import { observer } from 'mobx-react'

import { appStore } from '@/stores'
import { to } from '@/libs/fans'
import { personalApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {
  data: any
}

@observer
export default class VPersonalBlog extends React.Component<Props, State> {
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
    const [err, data] = await to(personalApiService.ListUserArticle(appStore.userInfo.userId, 1, 999))
    if (err) return message.error(err.message)
    this.setState({
      data: data.records
    })
  }

  private onViewArticle = (articleId:string) => {
    this.props.history.push(`/blog/detail/${articleId}`)
  }

  public render () {
    const {} = this.props
    const {data} =this.state

    return (
      <Wrapper>
        <MainContainer>
          {data.length>0 &&
            data.map((i: any) => (
              <BlogContainer>
                <TitleCon onClick={this.onViewArticle.bind(this, i.id)}>{i.title}</TitleCon>
                <TextContainer>
                  {i.articleFirstPictureUrl && (
                    <PictureCon>
                      <img src={i.articleFirstPictureUrl} />
                    </PictureCon>
                  )}
                  <TextCon>{i.articleShortDesc}</TextCon>
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
              </BlogContainer>
            ))}
        </MainContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``

const MainContainer = styled.div`
  padding: 16px;
  width: 100%;
  background: white;
`

const BlogContainer = styled.div`
  border-bottom: 1px solid rgba(240, 240, 240, 1);
  padding: 20px 0px;
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
