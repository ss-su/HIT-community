import * as React from 'react'
import styled from 'styled-components'
import { Alert , message } from 'antd'

import { RouteComponentProps } from '@/components/RouterView'
import { parse } from '@/libs/query'
import { authApiService } from '@/services'
import { to } from '@/libs/fans'

export interface Props extends RouteComponentProps {}

export interface Props {}

export interface State {}

export default class VEmailExamine extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public componentDidMount () {
    this.load()
  }

  private load = async () => {
    const { token } = parse(this.props.location.search)

    const [err,data] = await to(authApiService.emailExamine(token))
    if (err) return message.error(err.message)

    console.log(data)
    message.success('验证成功')
    this.props.history.push('/login')
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>
        <Alert message='邮箱验证中...' type='info' />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin: 50px;
`
