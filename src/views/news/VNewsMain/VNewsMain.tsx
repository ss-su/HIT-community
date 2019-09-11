import * as React from 'react'
import styled from 'styled-components'

import RouterView, { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps{}

export interface State {}

export default class VNewsMain extends React.Component<Props, State> {

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const { routes } = this.props

    return (
      <Wrapper><RouterView routes={routes} /></Wrapper>
    )
  }

}

const Wrapper = styled.div``
