import { RouteItem } from '../components/RouterView'

import VLogin from '../views/common/VLogin'
import VSignUp from '../views/common/VSignUp'
import VEmailExamine from '../views/common/VEmailExamine'
import VMain from '../views/common/VMain'
import VHome from '../views/common/VHome'

import VQuestionMain from '../views/question/VQuestionMain'
import VQuestionMainPage from '../views/question/VQuestionMainPage'
import VQuestionFollow from '../views/question/VQuestionFollow'
import VQuestionHotspot from '../views/question/VQuestionHotspot'
import VQuestionRecommend from '../views/question/VQuestionRecommend'
import VQuestionDetail from '../views/question/VQuestionDetail'
import VQuestionAnswer from '../views/question/VQuestionAnswer'
import VQuestionViewAnswer from '../views/question/VQuestionViewAnswer'
import VQuestionWriteAnswer from '../views/question/VQuestionWriteAnswer'
import VQuestionWriteAnswerRecomment from '../views/question/VQuestionWriteAnswer/VQuestionWriteAnswerRecomment'
import VQuestionWriteAnswerHot from '../views/question/VQuestionWriteAnswer/VQuestionWriteAnswerHot'
import VQuestionWriteAnswerInvite from '../views/question/VQuestionWriteAnswer/VQuestionWriteAnswerInvite'
import VQuestionWriteAnswerFollow from '../views/question/VQuestionWriteAnswer/VQuestionWriteAnswerFollow'

import VBlogMain from '../views/blog/VBlogMain' 
import VBlogMainPage from '../views/blog/VBlogMainPage'
import VBlogList from '../views/blog/VBlogList'
import VBlogDetail from '../views/blog/VBlogDetail'
import VBlogWrite from '../views/blog/VBlogWrite'

import VPersonalMain from '../views/personal/VPersonalMain'
import VPersonalMainPage from '../views/personal/VPersonalMainPage'
import VPersonalAction from '../views/personal/VPersonalAction'
import VPersonalAnswer from '../views/personal/VPersonalAnswer'
import VPersonalAsk from '../views/personal/VPersonalAsk'
import VPersonalBlog from '../views/personal/VPersonalBlog'
import VPersonalFollows from '../views/personal/VPersonalFollows'
import VPersonalFollowQuestion from '../views/personal/VPersonalFollowQuestion'
import VPersonalFans from '../views/personal/VPersonalFans'
import VPersonalCollect from '../views/personal/VPersonalCollect'

import VNewsMain from '../views/news/VNewsMain'
import VNewsMainPage from '../views/news/VNewsMainPage'
import VNewsDetail from '../views/news/VNewsDetail'

const routes: RouteItem[] = [
  {
    path: '/login',
    component: VLogin
  },
  {
    path: '/emailExamine',
    component: VEmailExamine
  },
  {
    path: '/signup',
    component: VSignUp
  },
  {
    path: '/',
    component: VMain,
    routes: [
      {
        path: '/blog',
        component: VBlogMain,
        redirect: '/blog/mainPage',
        routes: [
          {
            path: '/blog/mainPage',
            component: VBlogMainPage
          },
          {
            path: '/blog/list/:classId',
            component: VBlogList
          },
          {
            path: '/blog/detail/:articleId',
            component: VBlogDetail
          },
           {
            path: '/blog/write/:articleId',
            component: VBlogWrite
          }
        ]
      },
      {

        path: '/question',
        component: VQuestionMain,
        redirect: '/question/mainPage',
        routes: [
          {
            path: '/question/mainPage',
            component: VQuestionMainPage,
            redirect: '/question/mainPage/recommend',
            routes: [
              {
                path: '/question/mainPage/follow',
                component: VQuestionFollow
              },
              {
                path: '/question/mainPage/hotspot',
                component: VQuestionHotspot
              },
              {
                path: '/question/mainPage/recommend',
                component: VQuestionRecommend
              }
            ]
          },
          {
            path: '/question/detail/:id',
            component: VQuestionDetail
          },
          {
            path: '/question/answer/:questionId/:answerId',
            component: VQuestionAnswer
          },
          {
            path: '/question/viewAnswer/:questionId/:answerId',
            component: VQuestionViewAnswer
          },
          {
            path: '/question/writeAnswer',
            component: VQuestionWriteAnswer,
            redirect: '/question/writeAnswer/recomment',
            routes: [
            {
              path: '/question/writeAnswer/recomment',
              component: VQuestionWriteAnswerRecomment
            },
            {
              path: '/question/writeAnswer/hot',
              component: VQuestionWriteAnswerHot
            },
            {
              path: '/question/writeAnswer/invite',
              component: VQuestionWriteAnswerInvite
            },
            {
              path: '/question/writeAnswer/follow',
              component: VQuestionWriteAnswerFollow
            }
          ]
          }
        ]
        
      },
      {
        path: '/personal',
        component: VPersonalMain,
        routes: [
          {
            path: '/personal/mainPage',
            component: VPersonalMainPage,
            routes: [
              {
                path: '/personal/mainPage/action',
                component: VPersonalAction
              },
              {
                path: '/personal/mainPage/answer',
                component: VPersonalAnswer
              },
              {
                path: '/personal/mainPage/ask',
                component: VPersonalAsk
              },
              {
                path: '/personal/mainPage/blog',
                component: VPersonalBlog
              },
              {
                path: '/personal/mainPage/follows',
                component: VPersonalFollows
              },
              {
                path: '/personal/mainPage/fans',
                component: VPersonalFans
              },
              {
                path: '/personal/mainPage/collect', 
                component: VPersonalCollect
              },
              {
                path: '/personal/mainPage/followQuestion',   
                component: VPersonalFollowQuestion
              }
            ]
          }
        ]
      },
      {
        path: '/news',
        component: VNewsMain,
        redirect: '/news/mainPage',
        routes: [
          {
            path: '/news/mainPage',
            component: VNewsMainPage,
          },
           {
            path: '/news/detail/:newsId',
            component: VNewsDetail,
          }
        ]
      },
      {
        path: '/',
        component: VHome
      }
    ]
  }
]

export default routes
