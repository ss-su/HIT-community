import BaseApiService from './BaseApiService'

export default class QuestionApiService extends BaseApiService {
  // 查看答案评论列表
  public ListNewsComment (requestPage:number,requestSize:number,newsId:string) {
    return this.get(`/news/ListNewsComment`,{ params: { requestPage,requestSize,newsId } })
  }

 //评论答案
  public commentNews (newsId:string,commentContent:string) {
    return this.post('/news/commentNews', { newsId,commentContent})
  }

//收藏新闻
  public collectNews (newsId:string) {
    return this.post('/news/collectNews', { newsId})
}

// 支持新闻
  public likeNews (newsId:string) {
    return this.get(`/news/likeNews`,{ params: { newsId } })
  }

// 反对新闻
  public unlikeNews (newsId:string) {
    return this.get(`/news/unlikeNews`,{ params: { newsId } })
  }

 // 查看新闻
  public viewNews (newsId:string) {
    return this.get(`/news/viewNews`,{ params: { newsId } })
  }

  // 新闻推荐列表
  public ListNewsRecommend (requestPage:number,requestSize:number) {
    return this.get(`/recommend/ListNewsRecommend`,{ params: { requestPage,requestSize } })
  }   




}
