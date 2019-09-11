import BaseApiService from './BaseApiService'

export default class AuthApiService extends BaseApiService {
  public login (email: string, password: string) {
    return this.post('/login', { email, password })
  }

  // 注册
  public signUp (email: string, password: string, confirmPassword: string) {
    return this.post('/register', { email, password, confirmPassword })
  }

  // 邮箱验证
  public emailExamine (token: string) {
    return this.post('/authRegister', { token })
  }

  // 获取用户信息
  public getUserInfo (userId:string) {
    return this.get(`/user/viewUserInfo`,{ params: { userId } })
  }

  // 上传图片接口
   public upload (form: any) {
    return this.post('/file/uploadPicture',  form)
  }

  //用户通知列表
  public listNotice (requestPage:number,requestSize:number) {
    return this.get(`/user/ListSelfNotice`,{ params: { requestPage,requestSize } })
  }

  // 用户查看某个通知
  public viewNotice (noticeId:number) {
    return this.get(`/user/ListSelfNotice`,{ params: { noticeId} })
  }
}
