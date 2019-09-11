import { action, observable } from 'mobx'

import { LoginedUser } from '@/models'
import { authApiService } from '@/services'

export default class AppStore {
  @observable public loginedUser: LoginedUser | null

  @observable public userInfo: any

  public constructor () {
    const loginedUser = localStorage.getItem('loginedUser')
    this.loginedUser = loginedUser ? (JSON.parse(loginedUser) as LoginedUser) : null
  // this.loginedUser =  null
  }

  @action   // LoginedUser只用来存token 用户名 头像 ID
  public async login (xemail: string, password: string) {
    const res = await authApiService.login(xemail, password)
    const userId = res.userId
    const token = res.token
    const userName = res.userName
    const headSculpture = res.headSculpture
    this.loginedUser = {userId,token,userName,headSculpture }

    localStorage.setItem('loginedUser',JSON.stringify(this.loginedUser))
    localStorage.setItem('token', token)
  }

  @action    //用于存放用户信息
  public async getUserInfo (id:string) {
    const res = await authApiService.getUserInfo(id)
    const userName = res.userName
    const personalIntro = res.personalIntro
    const headSculpture = res.headSculpture
    const sex = res.sex
    const userId = res.id
    const email = res.email
    const answerNum = res.answerNum
    const articleNum = res.articleNum
    const concernNum = res.concernNum
    const fansNum = res.fansNum
    const questionNum = res.questionNum
        
    this.userInfo = { userName,personalIntro,headSculpture,sex,userId,email,answerNum,articleNum,concernNum,fansNum,questionNum }
  }

  @action
  public logout () {
    localStorage.setItem('token', '')
    localStorage.setItem('loginedUser','')
    this.loginedUser = null
    this.userInfo = null
  }



}
