import React from 'react'

const ActiveTabContext = React.createContext({
  activeTab: 'Home',
  changeActiveTab: () => {},
})

export default ActiveTabContext
