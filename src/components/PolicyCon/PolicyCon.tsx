import * as React from 'react'
import styled from 'styled-components'
import { List, Avatar } from 'antd'

import policy1 from '@/assets/images/policy1.png'
import policy2 from '@/assets/images/policy2.png'
import policy3 from '@/assets/images/policy3.png'

export interface Props {}

export interface State {}

export default class PolicyCon extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    const data = [
      {
        logo: policy1,
        title: '医院信息系统',
        desc: '已收录999条回答'
      },
      {
        logo: policy2,
        title: '医院等保测评',
        desc: '已收录999条回答'
      },
      {
        logo: policy3,
        title: '电子病历',
        desc: '已收录999条回答'
      }
    ]

    return (
      <Wrapper>
        <Title>热门政策</Title>
        <Container>
          <List
            itemLayout='horizontal'
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar shape='square' size={42} src={item.logo} />}
                  title={<a href='https://ant.design'>{item.title}</a>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  margin-top: 16px;
  padding:16px;
`
const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
`
const Container = styled.div`
  width: 100%;
  padding-bottom:20px;
  .ant-list-split .ant-list-item {
    border-bottom: none;
  }
  .ant-list-item {
    padding: 4px 0;
    margin-left: 24px;
  }
  .ant-list-item-meta-title > a {
    font-size: 12px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(56, 57, 62, 1);
  }
  .ant-list-item-meta-description {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(159, 163, 176, 1);
  }
`
