import * as React from 'react'
import styled from 'styled-components'
import { Icon, Button, message, Avatar } from 'antd'

import { blogApiService } from '@/services'
import { to } from '@/libs/fans'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps<{ classId: string }> {}

export interface State {
  specialInfo: any
  specialList: any
}

export default class VBlogList extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      specialInfo: {},
      specialList: []
    }
  }

  public componentDidMount () {
    this.loadSpecialInfo()
    this.loadSpecialList()
  }

  private loadSpecialInfo = async () => {
    const classId = this.props.match.params.classId
    const [err, data] = await to(blogApiService.viewArticleClass(classId))
    if (err) return message.error(err.message)
    this.setState({
      specialInfo: data
    })
  }

  private loadSpecialList = async () => {
    const classId = this.props.match.params.classId
    const [err, data] = await to(blogApiService.listArticle(classId))
    if (err) return message.error(err.message)
    this.setState({
      specialList: data
    })
  }

  private onViewArticle = (id:string) =>{
    this.props.history.push(`/blog/detail/${id}`)
  }

  public render () {
    const {} = this.props
    const { specialInfo, specialList } = this.state

    return (
      <Wrapper>
        <LeftContainer>
          <MainContainer>
            {specialList &&
              specialList.map((i: any) => (
                <BlogContainer>
                  <TitleCon onClick={this.onViewArticle.bind(this,i.id)}>{i.title}</TitleCon>
                  <TextContainer>
                   { i.articleFirstPictureUrl && (
                    <PictureCon>
                      <img src={i.articleFirstPictureUrl} />
                    </PictureCon>
                    )}
                    <TextCon>
                      {i.articleShortDesc}
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
              ))}
          </MainContainer>
        </LeftContainer>
        <RightContainer>
          <SpecialInfoContainer>
            <img src={specialInfo.pictureUrl} />
            <SpecialTxtCon>
              <p>专栏介绍:{specialInfo.desc}</p>
              <p>
                {specialInfo.followWith}人关注 | {specialInfo.articleNum}篇文章
              </p>
              <Button type='primary' style={{ width: '150px' }}>
                关注专栏
              </Button>
            </SpecialTxtCon>
          </SpecialInfoContainer>

          <WritersContainer>
            <Title>作者贡献榜</Title>
            <WriterCon>
              <AvatarCon>
                <Avatar
                  size={40}
                  src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                />
              </AvatarCon>
              <NameCon>
                <a>王尼玛</a>
                <p>100关注 | 收录文章40篇</p>
              </NameCon>
            </WriterCon>
            <WriterCon>
              <AvatarCon>
                <Avatar
                  size={40}
                  src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                />
              </AvatarCon>
              <NameCon>
                <a>王尼玛</a>
                <p>100关注 | 收录文章40篇</p>
              </NameCon>
            </WriterCon>
            <WriterCon>
              <AvatarCon>
                <Avatar
                  size={40}
                  src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
                />
              </AvatarCon>
              <NameCon>
                <a>王尼玛</a>
                <p>100关注 | 收录文章40篇</p>
              </NameCon>
            </WriterCon>
          </WritersContainer>
        </RightContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-top: 16px;
  background: #f7f7f7;
  width: 100%;
  display: flex;
`

const LeftContainer = styled.div`
  width: 729px;
`

const MainContainer = styled.div`
  padding: 32px;
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

const RightContainer = styled.div`
  margin-left: 25px;
  width: 280px;
`

const SpecialInfoContainer = styled.div`
  background: white;
  width: 100%;
  padding-bottom: 16px;
  min-height: 300px;
  img {
    width: 100%;
    height: 146px;
  }
`
const SpecialTxtCon = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  p {
    font-size: 14px;
  }
`

const WritersContainer = styled.div`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  background: white;
`

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`

const WriterCon = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  height: 70px;
  padding-left:16px;
`
const AvatarCon = styled.div`
  width: 80px;
  text-align: center;
`

const NameCon = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
  width: 500px;
  a {
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.65);
  }
`
