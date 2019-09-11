import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {
  data:any[]
}

export default class AboutQuestion extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {
      data:[
        {
          id:'1',
          title:'医保管理，如何走好众筹和走好的平衡...?'
        },
        {
          id:'2',
          title:'如何看待互联网医疗?...?'
        },
        {
          id:'3',
          title:'医疗系统主要看重的是什么?...?'
        },
        {
          id:'4',
          title:'如何提高财政资金在医疗信息化的利用...?...?'
        },
        {
          id:'5',
          title:'如何奠定医疗质量的基础?...?'
        },
        {
          id:'6',
          title:'如何奠定医疗质量的基础?...?'
        },
        {
          id:'7',
          title:'如何奠定医疗质量的基础?...?'
        },
        {
          id:'8',
          title:'如何看待互联网医疗?...?'
        },
        {
          id:'9',
          title:'医疗系统主要看重的是什么?...?'
        },
        {
          id:'10',
          title:'如何提高财政资金在医疗信息化的利用...?...?'
        },
      ]
    }
  }

  private onShow =(id:any) =>{
    console.log(id)
  }

  public render () {
    const {} = this.props

    const {data}= this.state

    return (
      <Wrapper>
        <Title>相关问题</Title>
        <Container>
          {data.map((i:any)=>(
            <LinkCon  key={i.id}><a href='javascript:void(0);' key={i.id} onClick={this.onShow.bind(this,i.id)}>{i.title}</a></LinkCon>
          ))  
          }
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  overflow: hidden;
`
const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 24px;
  margin-left: 24px;
`
const Container = styled.div`
  padding:0 16px;
  padding-bottom:20px;
  width: 100%;
  
`

const LinkCon = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom:4px;
  a{
    color:rgba(98,109,163,1);
    font-size:14px;
  }
`
