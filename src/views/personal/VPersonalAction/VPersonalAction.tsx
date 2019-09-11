import * as React from 'react'
import styled from 'styled-components'

import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class VPersonalAction extends React.Component<Props, State> {

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>VPersonalAction</Wrapper>
    )
  }

}

const Wrapper = styled.div``

