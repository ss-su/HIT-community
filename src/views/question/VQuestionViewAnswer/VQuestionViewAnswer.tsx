import * as React from 'react'
import styled from 'styled-components'
import { Tag, message, Skeleton, Avatar, Icon, Input, Button, List } from 'antd'
import { observer } from 'mobx-react'

import { appStore } from '@/stores'
import { to } from '@/libs/fans'
import { questionApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'
import avatar from '@/assets/images/avatar.png'

export interface Props extends RouteComponentProps<{ questionId: string; answerId: string }> {}

export interface State {
  questionData: any
  answerData: any
  comment: string
  commentList: any
  like: boolean
  unlike: boolean
  collect: boolean
}

@observer
export default class VQuestionViewAnswer extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)
    this.state = {
      questionData: {},
      answerData: {},
      comment: '',
      commentList: [],
      like: false,
      unlike: false,
      collect: false
    }
  }

  public componentDidMount () {
    this.loadQuestion()
    this.loadAnswer()
    this.loadComment()
  }

  private loadQuestion = async () => {
    const questionId = this.props.match.params.questionId
    const [err, data] = await to(questionApiService.viewQuestion(questionId))
    if (err) return message.error(err.message)
    this.setState({
      questionData: data
    })
  }

  private loadAnswer = async () => {
    const answerId = this.props.match.params.answerId
    const [err, data] = await to(questionApiService.viewAnswer(answerId))
    if (err) return message.error(err.message)
    this.setState({
      answerData: data,
      like: data.isSelfLike === 1,
      unlike: data.isSelfUnLike === 1,
      collect: data.isSelfCollect === 1
    })
  }

  private onCommentChange = (e: any) => {
    this.setState({
      comment: e.target.value
    })
  }

  private onEditAnswer = () => {
    const questionId = this.props.match.params.questionId
    const answerId = this.props.match.params.answerId
    this.props.history.push(`/question/answer/${questionId}/${answerId}`)
  }

  private onDeleteAnswer = async () => {
    const answerId = this.props.match.params.answerId
    const [err] = await to(questionApiService.deleteAnswer(answerId))
    if (err) return message.error(err.message)
    message.success('删除成功')
    this.props.history.goBack()
  }

  private loadComment = async () => {
    const answerId = this.props.match.params.answerId
    const [err, data] = await to(questionApiService.listAnswerComment(1, 999, answerId))
    if (err) return message.error(err.message)
    this.setState({
      commentList: data.records
    })
  }

  private onSubmitComment = async () => {
    const answerId = this.props.match.params.answerId
    const [err] = await to(questionApiService.commentAnswer(answerId, this.state.comment))
    if (err) return message.error(err.message)
    message.success('提交成功')
    this.loadComment()
  }

  private onViewQuestion = () => {
    const questionId = this.props.match.params.questionId
    this.props.history.push(`/question/detail/${questionId}`)
  }

  // 用户行为
  private onLikeArticle = async () => {
    const answerId = this.props.match.params.answerId
    const [err] = await to(questionApiService.likeAnswer(answerId))
    if (err) return message.error(err.message)
    message.success('操作成功')
    this.setState({
      like: !this.state.like
    })
    if (this.state.unlike === true) {
      this.setState({
        unlike: !this.state.unlike
      })
    }
  }

  private onUnlikeArticle = async () => {
    const answerId = this.props.match.params.answerId
    const [err] = await to(questionApiService.unlikeAnswer(answerId))
    if (err) return message.error(err.message)
    message.success('操作成功')
    this.setState({
      unlike: !this.state.unlike
    })
    if (this.state.like === true) {
      this.setState({
        like: !this.state.like
      })
    }
  }

  private onCollectArticle = async () => {
    const answerId = this.props.match.params.answerId
    const [err] = await to(questionApiService.collectAnswer(answerId))
    if (err) return message.error(err.message)
    message.success('操作成功')
    this.setState({
      collect: !this.state.collect
    })
  }

  public render () {
    const { questionData, answerData, comment, commentList, collect, like, unlike } = this.state
    const TextArea = Input.TextArea

    return (
      <Wrapper>
        <TopContainer>
          <LabelCon>
            {questionData.questionTopicIdList &&
              questionData.questionTopicIdList !== [] &&
              questionData.questionTopicIdList.map((i: any) => (
                <Tag color='#E8EDFF' key={i.id} style={{ fontSize: '14px', color: '#5579F3' }}>
                  {i.topicContent}
                </Tag>
              ))}
          </LabelCon>
          <TitleCon href='javascript:void(0);' onClick={this.onViewQuestion}>
            {questionData.name}
          </TitleCon>
          <DescCon>
            <div
              dangerouslySetInnerHTML={{
                __html: questionData.questionDesc
              }}
            />
          </DescCon>
        </TopContainer>
        {!answerData.answerContent && <Skeleton avatar paragraph={{ rows: 12 }} />}
        {answerData.answerContent && (
          <MainContainer>
            <TopCon>
              <AvatarCon>
                <Avatar size={50} src={answerData.userHeadSculpture ? answerData.userHeadSculpture : avatar} />
              </AvatarCon>
              <NameCon>
                <h3>{answerData.userName}</h3>
                <p>{answerData.userPersonalIntro}</p>
              </NameCon>
              <TimeCon>
                <p>{answerData.updatedAt}</p>
              </TimeCon>
            </TopCon>
            <MiddleCon>
              <div
                dangerouslySetInnerHTML={{
                  __html: answerData.answerContent
                }}
              />
            </MiddleCon>
            <BottomCon>
              <Oparation>
                <a href='javascript:void(0);' onClick={this.onLikeArticle}>
                  <Icon type='like' style={{ marginRight: 8 }} />{' '}
                  {like ? <span style={{ color: '#5579f3' }}>已支持</span> : <span>支持</span>}
                </a>
              </Oparation>
              <Oparation>
                <a href='javascript:void(0);' onClick={this.onUnlikeArticle}>
                  <Icon type='dislike' style={{ marginRight: 8 }} />
                  {unlike ? <span style={{ color: '#5579f3' }}>已反对</span> : <span>反对</span>}
                </a>
              </Oparation>
              <Oparation>
                <a href='javascript:void(0);' onClick={this.onCollectArticle}>
                  <Icon type='heart' style={{ marginRight: 8 }} />
                  {collect ? <span style={{ color: '#5579f3' }}>已收藏</span> : <span>收藏</span>}
                </a>
              </Oparation>
              <Oparation>
                <Icon type='eye' style={{ marginRight: 8 }} />
                {answerData.readNum}浏览
              </Oparation>
              <Oparation>
                <Icon type='message' style={{ marginRight: 8 }} />
                {answerData.commentNum}条评论
              </Oparation>
              {answerData.isSelfAnswer === 1 && (
                <span>
                  <Oparation style={{ marginLeft: '200px' }}>
                    <a href='javascript:void(0);' onClick={this.onEditAnswer}>
                      <Icon type='form' style={{ marginRight: 8 }} />
                      <span>修改回答</span>
                    </a>
                  </Oparation>

                  <Oparation>
                    <a href='javascript:void(0);' onClick={this.onDeleteAnswer}>
                      <Icon type='delete' style={{ marginRight: 8 }} />
                      <span>删除回答</span>
                    </a>
                  </Oparation>
                </span>
              )}
            </BottomCon>

            <CommentContainer>
              <CommentList>
                <List
                  itemLayout='horizontal'
                  dataSource={commentList}
                  renderItem={(item: any) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.userHeadSculpture ? item.userHeadSculpture : avatar} />}
                        title={<a href='https://ant.design'>{item.userName}</a>}
                        description={item.commentContent}
                      />
                      <p>{item.createdAt}</p>
                    </List.Item>
                  )}
                />
              </CommentList>
              {appStore.userInfo && (
                <CommentInput>
                  <div style={{ display: 'flex' }}>
                    <Avatar style={{ margin: '10px' }} size={32} src={appStore.userInfo.headSculpture} />
                    <TextArea rows={4} onChange={this.onCommentChange} placeholder='发表你的评论...' value={comment} />
                  </div>
                  <Button type='primary' onClick={this.onSubmitComment} style={{ margin: '20px 0 0 850px' }}>
                    提交评论
                  </Button>
                </CommentInput>
              )}
            </CommentContainer>
          </MainContainer>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #f7f7f7;
  width: 100%;
`

const TopContainer = styled.div`
  border-top: 1px solid #a5b2ba;
  padding: 20px;
  background: white;
  min-height: 132px;
  width: 100%;
`

const LabelCon = styled.div`
  min-height: 34px;
  margin-top: 10px;
`
const TitleCon = styled.a`
  min-height: 20px;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
`

const DescCon = styled.div`
  width: 100%;
`
const MainContainer = styled.div`
  background: white;
  padding: 16px;
  width: 100%;
`
const TopCon = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
`
const AvatarCon = styled.div`
  width: 60px;
  text-align: center;
`

const NameCon = styled.div`
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 750px;
  border-bottom: 2px solid #f7f7f7;
  h3 {
    margin-top: 3px;
  }
`

const TimeCon = styled.div`
  text-align: center;
  line-height: 70px;
  font-size: 14px;
`

const MiddleCon = styled.div`
  width: 100%;
  padding: 10px 20px;
  border-bottom: 2px solid #f7f7f7;
  padding-bottom: 40px;
`

const BottomCon = styled.div`
  font-size: 16px;
  padding: 20px;
  width: 100%;
  margin-top: 20px;
`
const Oparation = styled.div`
  display: inline-block;
  height: 20px;
  margin-left: 30px;
  p {
    display: inline;
  }
  span {
    color: rgba(0, 0, 0, 0.65);
  }
`

const CommentContainer = styled.div`
  width: 100%;
  margin-bottom: 200px;
  margin-top: 20px;
  border-top: 2px solid #f7f7f7;
`

const CommentInput = styled.div``

const CommentList = styled.div`
  width: 100%;
  margin-top: 16px;
  padding: 16px;
`
