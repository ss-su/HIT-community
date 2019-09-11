import * as React from 'react'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import styled from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { LocaleProvider } from 'antd'

import RouterView from '@/components/RouterView'
import routes from '@/configs/routes'

import GlobalStyle from './styles/global'
import CommonStyle from './styles/common'

export interface Props {}

export interface State {}

export class App extends React.Component<Props, State> {
  public render () {
    return (
      <LocaleProvider locale={zhCN}>
        <Wrapper>
          <Router>
            <RouterView routes={routes} />
          </Router>
          <GlobalStyle />
          <CommonStyle />
        </Wrapper>
      </LocaleProvider>
    )
  }
}

export default hot(module)(App)

const Wrapper = styled.div`
`
