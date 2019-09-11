import * as React from 'react'

export interface Prop {
  className?: string
}

export default class Base<P, S> extends React.Component<Prop & P, S> {}
