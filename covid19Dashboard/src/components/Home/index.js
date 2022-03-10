import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingDesc, FcGenericSortingAsc} from 'react-icons/fc'

import Header from '../Header'
import Footer from '../Footer'

import Card from '../Card'
import TableRow from '../TableRow'
import SearchItem from '../SearchItem'
import NotFound from '../NotFound'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
  {
    state_code: 'TT',
    state_name: 'Other Territory',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    data: [],
    apiPageStatus: apiStatusConstants.initial,
    searchInput: '',
    searchResultList: [],
  }

  componentDidMount() {
    this.renderApi()
  }

  renderApi = async () => {
    this.setState({apiPageStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const resultList = []

      const keyNames = Object.keys(data)

      keyNames.forEach(keyName => {
        if (data[keyName]) {
          const {total} = data[keyName]

          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[keyName].meta.population
            ? data[keyName].meta.population
            : 0
          resultList.push({
            stateCode: keyName,
            name: statesList.find(state => state.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      console.log(resultList)
      this.setState({
        apiPageStatus: apiStatusConstants.success,
        data: resultList,
      })
    } else {
      this.setState({apiPageStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="home-content-loader">
      <div className="loader-container" testid="homeRouteLoader">
        <Loader type="TailSpin" color="#4f46e5" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => <NotFound />

  ascSort = () => {
    const {data} = this.state
    const sortedData = data.sort((a, b) => (a.name > b.name ? 1 : -1))
    this.setState({data: sortedData})
  }

  descSort = () => {
    const {data} = this.state
    const sortedData = data.sort((a, b) => (a.name < b.name ? 1 : -1))
    this.setState({data: sortedData})
  }

  updateSearchResultList = () => {
    const {searchInput, data} = this.state
    const filteredResults = data.filter(eachItem =>
      eachItem.name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({searchResultList: filteredResults})
  }

  onSearch = event =>
    this.setState(
      {searchInput: event.target.value},
      this.updateSearchResultList,
    )

  renderSuccessView = () => {
    const {data, searchInput, searchResultList} = this.state
    // console.log(searchInput)
    const statsObject = [
      {
        text: 'Confirmed',
        count: 0,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/check-mark_1_ls6j7s.png',
        testId: 'countryWideConfirmedCases',
        altText: 'country wide confirmed cases pic',
      },
      {
        text: 'Active',
        count: 0,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/protection_1_rntaq2.png',
        testId: 'countryWideActiveCases',
        altText: 'country wide active cases pic',
      },
      {
        text: 'Recovered',
        count: 0,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/recovered_1_kvwzyq.png',
        testId: 'countryWideRecoveredCases',
        altText: 'country wide recovered cases pic',
      },
      {
        text: 'Deceased',
        count: 0,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/breathing_1_wblwyp.png',
        testId: 'countryWideDeceasedCases',
        altText: 'country wide deceased cases pic',
      },
    ]
    let confirmed = 0
    let active = 0
    let recovered = 0
    let deceased = 0
    data.forEach(object => {
      confirmed += object.confirmed
      active += object.active
      recovered += object.recovered
      deceased += object.deceased
    })
    statsObject[0].count = confirmed
    statsObject[1].count = active
    statsObject[2].count = recovered
    statsObject[3].count = deceased

    if (searchInput === '') {
      return (
        <div className="home-content">
          <div className="search-container">
            <BsSearch />
            <input
              type="search"
              className="search-input"
              placeholder="Enter the State"
              onChange={this.onSearch}
            />
          </div>
          <div className="card-container">
            {statsObject.map(eachItem => (
              <Card key={eachItem.text} eachItem={eachItem} />
            ))}
          </div>
          <div className="table-container" testid="stateWiseCovidDataTable">
            <div className="filter-container">
              <div className="name-cell">
                <p>States/UT</p>
                <button
                  type="button"
                  testid="ascendingSort"
                  className="filter-btn"
                  onClick={this.ascSort}
                >
                  <FcGenericSortingAsc />
                </button>
                <button
                  type="button"
                  testid="descendingSort"
                  className="filter-btn"
                  onClick={this.descSort}
                >
                  <FcGenericSortingDesc />
                </button>
              </div>
              <div className="table-title-container">
                <p className="cell">Confirmed</p>
                <p className="cell">Active</p>
                <p className="cell">Recovered</p>
                <p className="cell">Deceased</p>
                <p className="cell">Population</p>
              </div>
            </div>
            <ul className="table-list">
              {data.map(eachItem => (
                <TableRow key={eachItem.stateCode} eachItem={eachItem} />
              ))}
            </ul>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="home-content">
        <div className="search-container">
          <BsSearch />
          <input
            type="search"
            className="search-input"
            placeholder="Enter the State"
            onChange={this.onSearch}
          />
        </div>
        <ul
          className="searchResultContainer"
          testid="searchResultsUnorderedList"
        >
          {searchResultList.map(eachItem => (
            <SearchItem key={eachItem.name} eachItem={eachItem} />
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
      <div className="home-container">
        <Header />
        {this.renderPageView()}
      </div>
    )
  }
}

export default Home
