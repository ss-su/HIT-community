import * as React from 'react'
import styled from 'styled-components'

import { RouteComponentProps } from '@/components/RouterView'

export interface Props extends RouteComponentProps {}

export interface State {}

export default class VPersonalFollow extends React.Component<Props, State> {

  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return (
      <Wrapper>0关注</Wrapper>
    )
  }

}

const Wrapper = styled.div``
