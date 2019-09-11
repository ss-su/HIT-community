
import BaseApiService from './BaseApiService'

export default class UserApiService extends BaseApiService {
  

  // 用户查看自己的信息
  public getUserInfo (userId:string) {
    return this.get(`/user/viewUserInfo`,{ params: { userId } })
  }

  //用户编辑个人资料
  public updateUser (userName:string,sex:number,personalIntro:string,headSculpture:string) {
     return this.post('/user/updateSelfInfo', { userName, sex, personalIntro,headSculpture })
  }

  // 查看用户的回答列表
  public ListUserAnswer (userId:string,requestPage:number,requestSize:number) {
    return this.get(`/user/ListUserAnswer`,{ params: { userId,requestPage,requestSize } })
  }

  // 查看用户的收藏列表
  public ListUserCollection (userId:string,requestPage:number,requestSize:number) {
    return this.get(`/user/ListUserCollection`,{ params: { userId,requestPage,requestSize } })
  }

  // 查看用户的收藏列表
  public ListUserQuestion (userId:string,requestPage:number,requestSize:number) {
    return this.get(`/user/ListUserQuestion`,{ params: { userId,requestPage,requestSize } })
  }

  // 查看用户的收藏列表
  public ListUserArticle (userId:string,requestPage:number,requestSize:number) {
    return this.get(`/user/ListUserArticle`,{ params: { userId,requestPage,requestSize } })
  }


}
