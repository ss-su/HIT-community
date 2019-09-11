import * as React from 'react'
import styled from 'styled-components'

import RouterView, { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps<{userId:string}>{}

export interface State {}

export default class VPersonalMain extends React.Component<Props, State> {

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public componentWillMount () {
    const userId =this.props.match.params.userId
    this.props.history.push(`/personal/mainPage/${userId}`)
  }

  public render () {
    const { routes } = this.props

    return (
      <Wrapper><RouterView routes={routes} /></Wrapper>
    )
  }

}

const Wrapper = styled.div``
