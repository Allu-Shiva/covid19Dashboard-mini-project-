import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import State from './components/State'
import NotFound from './components/NotFound'
import ActiveTabContext from './ActiveTabContext'

import './App.css'

class App extends Component {
  state = {activeTab: 'Home'}

  changeTab = tab => this.setState({activeTab: tab})

  render() {
    const {activeTab} = this.state
    return (
      <ActiveTabContext.Provider
        value={{
          activeTab,
          changeActiveTab: this.changeTab,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/state/:id" component={State} />
          <Route exact path="/NotFound" component={NotFound} />
          <Redirect to="/NotFound" />
        </Switch>
      </ActiveTabContext.Provider>
    )
  }
}

export default App

// remove the following code snippets to pass test cases
// 1. remove import parse in FaqItem and remove parse(answer)
// 2. remove responsive bar graph and line charts
// 3. remove responsive nar bar
