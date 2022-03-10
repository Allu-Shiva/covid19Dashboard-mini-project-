import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import NotFound from '../NotFound'
import FaqItem from '../FaqItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {faqs: [], apiPageStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.renderAboutApi()
  }

  renderAboutApi = async () => {
    this.setState({apiPageStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const {faq} = data
      //   console.log(faq)
      this.setState({
        apiPageStatus: apiStatusConstants.success,
        faqs: faq,
      })
    } else {
      this.setState({apiPageStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="home-content-loader">
      <div className="loader-container" testid="aboutRouteLoader">
        <Loader type="TailSpin" color="#4f46e5" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => <NotFound />

  renderSuccessView = () => {
    const {faqs} = this.state
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const today = new Date()
    function nth(d) {
      if (d > 3 && d < 21) return 'th'
      switch (d % 10) {
        case 1:
          return 'st'
        case 2:
          return 'nd'
        case 3:
          return 'rd'
        default:
          return 'th'
      }
    }

    return (
      <div className="about-heading-container">
        <h1 className="about-heading">About</h1>
        <p className="last-update-text">{`Last update on ${
          month[today.getMonth()]
        } ${today.getDate()}${nth(
          today.getDate(),
        )} ${today.getFullYear()}.`}</p>
        <p className="about-subheading">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="faqs-list-container" testid="faqsUnorderedList">
          {faqs.map(eachItem => (
            <FaqItem key={eachItem.qno} eachItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderPageView = () => {
    const {apiPageStatus} = this.state
    switch (apiPageStatus) {
      case apiStatusConstants.loading:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-container">
        <Header />
        <div className="about-content">
          {this.renderPageView()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default About
