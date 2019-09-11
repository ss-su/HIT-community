import * as React from 'react'
import styled from 'styled-components'

export interface Props {}

export interface State {}

export default class Banner extends React.Component<Props, State> {
  public constructor (props: Props) {
    super(props)

    this.state = {}
  }

  public render () {
    const {} = this.props

    return <Wrapper>Banner</Wrapper>
  }
}

const Wrapper = styled.div``
