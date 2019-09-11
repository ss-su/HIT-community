import AuthApiService from './AuthApiService'
import PersonalApiService from './PersonalApiService'
import QuestionApiService from './QuestionApiService'
import BlogApiService from './BlogApiService'
import NewsApiService from './NewsApiService'

export const authApiService = new AuthApiService()
export const personalApiService = new PersonalApiService()
export const questionApiService = new QuestionApiService()
export const blogApiService = new BlogApiService()
export const newsApiService = new NewsApiService()
