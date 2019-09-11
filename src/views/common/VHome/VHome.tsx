import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Button,message } from 'antd'

import { appStore } from '@/stores'
import { RouteComponentProps } from '@/components/RouterView'
import HotPoint from '@/components/HotPoint'
import MainCon from './components/MainCon'
import TopCon from './components/TopCon'
import WriterCon from './components/WriterBox'
import PolicyCon from '@/components/PolicyCon'


export interface Props extends RouteComponentProps {}

export interface State {}

@observer
export default class VHome extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      
    }
  }

  private onWriteArticle = () => {
    if(appStore.loginedUser){
      this.props.history.push(`/blog/write/${'new'}`)
    }else{
      message.error('请登录后操作')
    }
    
  }

  private onWriteAnswer = () => {
    if(appStore.loginedUser){
     this.props.history.push(`/question/writeAnswer`)
    }else{
      message.error('请登录后操作')
    } 
  }

  private onViewNewsList= () =>{
    this.props.history.push(`/news/mainPage`)
  }

  private viewNewsDetail = (id:string) => {
    this.props.history.push(`/news/detail/${id}`)
  }

  private onViewArticle = (id:string) => {
    this.props.history.push(`/blog/detail/${id}`)
  }

  public render () {
    return (
      <Wrapper>
        <LeftContainer>
          <MainContainer>
            <TopCon onViewNewsList = {this.onViewNewsList} onViewNews = {this.viewNewsDetail} />
            <MainCon onViewArticle={this.onViewArticle}/>
          </MainContainer>
        </LeftContainer>
        <RightContainer>
          <ButtonContainer>
            <ButtonCon>
              <Button type='primary' onClick={this.onWriteAnswer}>写回答</Button>
            </ButtonCon>
            <ButtonCon>
              <Button type='primary' onClick={this.onWriteArticle}>
                写文章
              </Button>
            </ButtonCon>
          </ButtonContainer>
          <HotPoint />
          <PolicyCon/>
          <WriterCon/>
        </RightContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #f7f7f7;
  width: 100%;
  display: flex;
`

const LeftContainer = styled.div`
  width: 729px;
`
const RightContainer = styled.div`
  margin-left: 16px;
  width: 280px;
`
const ButtonContainer = styled.div`
  margin-top: 16px;
  background: #e8edff;
  width: 100%;
  padding: 26px;
  display: flex;
`
const ButtonCon = styled.div`
  width: 50%;
  text-align: center;
`

const MainContainer = styled.div`
  width: 100%;
`
