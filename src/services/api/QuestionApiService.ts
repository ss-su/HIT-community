import BaseApiService from './BaseApiService'

export default class QuestionApiService extends BaseApiService {
  

  // 获取全部标签
  public getLabels () {
    return this.get(`/topic/ListAllSonTopic`)
  }

  //发布问题
  public askQuestion (questionTopicIdList:number[],name:string,questionDesc:any) {
     return this.post('/question/askQuestion', { questionTopicIdList, name, questionDesc})
  }

  //查看问题
  public viewQuestion (questionId:any) {
    return this.get(`/question/viewQuestion`,{ params: { questionId } })
  }

  //修改问题
  public updateQuestion (questionId:string,questionTopicIdList:number[],name:string,questionDesc:any) {
     return this.post('/question/updateQuestion', {questionId, questionTopicIdList, name, questionDesc})
  }

  //回答问题
  public answerQuestion (questionId:string,content:any) {
     return this.post('/answer/answerQuestion', {questionId, content})
  }

  //修改回答
  public updateAnswer (answerId:string,content:any) {
     return this.post('/answer/updateAnswer', {answerId, content})
  }

  //删除回答
  public deleteAnswer (answerId:string) {
     return this.post('/answer/deleteAnswer', {answerId})
  }


  //查看回答
  public viewAnswer (answerId:string) {
    return this.get(`/answer/viewAnswer`,{ params: { answerId } })
  }

  //问题的回答列表
  public ListAnswer (questionId:string,requestPage:number,requestSize:number) {
    return this.get(`/answer/ListAnswer`,{ params: { questionId,requestPage,requestSize } })
  }

  // 邀请用户回答的用户列表
  public ListInviteUser (questionId:string,requestPage:number,requestSize:number) {
    return this.get(`/question/inviteUserAnswerList`,{ params: { questionId,requestPage,requestSize } })
  }

  //邀请用户回答问题
  public inviteUser (inviteUserId:any,questionId:any) {
     return this.post('/question/inviteUser', {inviteUserId, questionId})
  }

  // 查看答案评论列表
  public listAnswerComment (requestPage:number,requestSize:number,answerId:string) {
    return this.get(`/answer/ListAnswerComment`,{ params: { requestPage,requestSize,answerId } })
  }

 //评论答案
  public commentAnswer (answerId:string,commentContent:string) {
    return this.post('/answer/commentAnswer', { answerId,commentContent})
  }

 //收藏回答
  public collectAnswer (answerId:string) {
    return this.post('/answer/collectAnswer', { answerId})
}

// 支持回答
  public likeAnswer (answerId:string) {
    return this.get(`/answer/likeAnswer`,{ params: { answerId } })
  }

// 反对回答
  public unlikeAnswer (answerId:string) {
    return this.get(`/answer/unlikeAnswer`,{ params: { answerId } })
  }  


/** 写回答*/

//推荐的问题列表
public ListQuestionRecommend (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListQuestionRecommend`,{ params: { requestPage,requestSize} })
}

//热门的问题
public ListHotQuestionRecommend (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListHotQuestionRecommend`,{ params: { requestPage,requestSize} })
}

//邀请回答的问题
public ListQuestionInviteUser (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListInviteUser`,{ params: { requestPage,requestSize} })
}


//推荐的回答列表
public ListAnswerRecommend (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListAnswerRecommend`,{ params: { requestPage,requestSize} })
}

//热点的回答列表
public ListHotAnswer (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListHotAnswer`,{ params: { requestPage,requestSize} })
}





}
