import BaseApiService from './BaseApiService'

export default class QuestionApiService extends BaseApiService {

  // 获取全部标签
  public getLabels () {
    return this.get(`/topic/ListAllSonTopic`)
  }
  
// 获取专栏列表
  public listSpecialColumn () {
    return this.get(`/article/ListArticleClassification`)
  }

// 获取专栏对于的文章列表
  public listArticle (classId:string) {
    return this.get(`/article/ListArticleByClassification`,{ params: { classId } })
  }  

//发布文章
  public createArticle (articleTagList:number[],articleTitle:string,articleContent:any) {
     return this.post('/article/createArticle', { articleTagList, articleTitle, articleContent})
  }  

//修改文章
  public updateArticle (articleId:string,articleTagList:number[],articleTitle:string,articleContent:any) {
     return this.post('/article/updateArticle', { articleId,articleTagList, articleTitle, articleContent})
  }

//删除文章
  public deleteArticle (articleId:string) {
     return this.post('/article/DeleteArticle', { articleId})
  }

// 查看文章
  public viewArticle (articleId:string) {
    return this.get(`/article/viewArticle`,{ params: { articleId } })
  }

// 查看专栏信息
  public viewArticleClass (classId:string) {
    return this.get(`/article/viewArticleClass`,{ params: { classId } })
  }  

// 查看文章评论列表
  public listArticleComment (requestPage:number,requestSize:number,articleId:string) {
    return this.get(`/article/ListArticleComment`,{ params: { requestPage,requestSize,articleId } })
  }

//评论文章
  public commentArticle (articleId:string,commentContent:string) {
    return this.post('/article/commentArticle', { articleId,commentContent})
}

//收藏文章
  public collectArticle (articleId:string) {
    return this.post('/article/collectArticle', { articleId})
}

// 支持文章
  public likeArticle (articleId:string) {
    return this.get(`/article/likeArticle`,{ params: { articleId } })
  }

// 反对文章
  public unlikeArticle (articleId:string) {
    return this.get(`/article/unLikeArticle`,{ params: { articleId } })
  }  

//首页文章推荐
public ListArticleRecommend (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListArticleRecommend`,{ params: { requestPage,requestSize } })
  }






}
