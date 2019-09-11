import * as React from 'react'
import styled from 'styled-components'
import { message } from 'antd'

import { to } from '@/libs/fans'
import { blogApiService } from '@/services'
import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {
  data: any
}

export default class VMainPage extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data: []
    }
  }

  public componentDidMount () {
    this.load()
  }

  private load = async () => {
    const [err, data] = await to(blogApiService.listSpecialColumn())
    if (err) return message.error(err.message)
    this.setState({
      data: data
    })
  }

  private onViewBlogList = (id:number) => {
    this.props.history.push(`/blog/list/${id}`)
  }

  public render () {
    const {} = this.props
    const { data } = this.state

    return (
      <Wrapper>
        {data.map((i: any) => (
          <Container key={i.id}>
            <TopCon>
              <img src={i.pictureUrl} />
            </TopCon>
            <MiddleCon>
              <h3>{i.content}</h3>
              <p>{i.childrenDesc}</p>
            </MiddleCon>
            <BottomCon>
              <a href='javascript:void(0);' onClick={this.onViewBlogList.bind(this,i.id)}>进入专栏&nbsp;&nbsp;></a>
            </BottomCon>
          </Container>
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100%;
`
const Container = styled.div`
  display: inline-block;
  background: white;
  width: 210px;
  font-size: 14px;
  margin: 20px 20px 0 0;
`
const TopCon = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 146px;
  }
`

const MiddleCon = styled.div`
  width: 100%;
  height:100px;
  padding: 10px;
  h3 {
    color: #38393e;
    font-weight: bold;
    font-size: 18px;
  }
`

const BottomCon = styled.div`
  height: 60px;
  line-height: 60px;
  border-top: 2px solid #f7f7f7;
  width: 100%;
  a {
    margin-left: 10px;
    color: #626da3;
  }
`
