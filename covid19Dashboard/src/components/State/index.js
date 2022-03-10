import {Component} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import ButtonCard from '../ButtonCard'
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

class State extends Component {
  state = {
    stateData: [],
    apiPageStatus: apiStatusConstants.initial,
    activeCard: 'Confirmed',
    activeData: [],
    timelinesData: [],
    timelinesApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderStateApi()
    this.renderTimelinesApi()
  }

  setInitialActiveData = data => {
    const districtObj = data.districts
    const result = []

    const keyNames = Object.keys(districtObj)
    keyNames.forEach(eachItem => {
      const temp = {}
      temp.name = eachItem
      temp.count =
        districtObj[eachItem].total.confirmed !== undefined
          ? districtObj[eachItem].total.confirmed
          : 0
      result.push(temp)
    })
    result.sort((a, b) => (a.count < b.count ? 1 : -1))
    // console.log(result)
    this.setState({activeData: result})
  }

  renderStateApi = async () => {
    this.setState({apiPageStatus: apiStatusConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const {match} = this.props
      const {params} = match
      const {id} = params
      this.setInitialActiveData(data[id])
      this.setState({
        stateData: data[id],
        apiPageStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiPageStatus: apiStatusConstants.failure})
    }
  }

  renderTimelinesApi = async () => {
    this.setState({timelinesApiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://apis.ccbp.in/covid19-timelines-data/${id}`,
    )
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const result = []
      const keyNames = Object.keys(data[id].dates)
      keyNames.forEach(date => {
        const obj = {
          date,
          confirmed:
            data[id].dates[date].total.confirmed !== undefined
              ? data[id].dates[date].total.confirmed
              : 0,
          deceased:
            data[id].dates[date].total.deceased !== undefined
              ? data[id].dates[date].total.deceased
              : 0,
          recovered:
            data[id].dates[date].total.recovered !== undefined
              ? data[id].dates[date].total.recovered
              : 0,
          tested:
            data[id].dates[date].total.tested !== undefined
              ? data[id].dates[date].total.tested
              : 0,
        }
        obj.active = obj.confirmed - (obj.recovered + obj.deceased)
        result.push(obj)
      })
      console.log(result)
      this.setState({
        timelinesApiStatus: apiStatusConstants.success,
        timelinesData: result,
      })
    } else {
      this.setState({timelinesApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="home-content-loader loader-css">
      <div className="loader-container" testid="stateDetailsLoader">
        <Loader type="TailSpin" color="#4f46e5" height="50" width="50" />
      </div>
    </div>
  )

  renderTimelinesLoader = () => (
    <div className="home-content-loader loader-css">
      <div className="loader-container" testid="timelinesDataLoader">
        <Loader type="TailSpin" color="#4f46e5" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => <NotFound />

  changeActiveData = text => {
    const lowercaseText = text.toLowerCase()
    const {stateData} = this.state
    const districtObj = stateData.districts
    const result = []

    const keyNames = Object.keys(districtObj)
    keyNames.forEach(eachItem => {
      const temp = {}
      temp.name = eachItem
      temp.count =
        districtObj[eachItem].total[lowercaseText] !== undefined
          ? districtObj[eachItem].total[lowercaseText]
          : 0
      result.push(temp)
    })
    result.sort((a, b) => (a.count < b.count ? 1 : -1))
    this.setState({activeData: result})
  }

  changeActiveDataToActive = () => {
    const {stateData} = this.state
    const districtObj = stateData.districts
    const result = []

    const keyNames = Object.keys(districtObj)
    keyNames.forEach(eachItem => {
      const temp = {}
      const confirmed =
        districtObj[eachItem].total.confirmed !== undefined
          ? districtObj[eachItem].total.confirmed
          : 0
      const recovered =
        districtObj[eachItem].total.recovered !== undefined
          ? districtObj[eachItem].total.recovered
          : 0
      const deceased =
        districtObj[eachItem].total.deceased !== undefined
          ? districtObj[eachItem].total.deceased
          : 0
      temp.name = eachItem
      temp.count = confirmed - (recovered + deceased)
      result.push(temp)
    })
    result.sort((a, b) => (a.count < b.count ? 1 : -1))
    // console.log(result)
    this.setState({activeData: result})
  }

  changeActiveCard = text => {
    if (text !== 'Active') {
      this.changeActiveData(text)
    } else {
      this.changeActiveDataToActive()
    }
    this.setState({activeCard: text})
  }

  renderCards = () => {
    const {stateData, activeCard} = this.state
    const {total} = stateData

    const statsObject = [
      {
        text: 'Confirmed',
        count: total.confirmed,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/check-mark_1_ls6j7s.png',
        testId: 'stateSpecificConfirmedCasesContainer',
        altText: 'state specific confirmed cases pic',
      },
      {
        text: 'Active',
        count: total.confirmed - (total.deceased + total.recovered),
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/protection_1_rntaq2.png',
        testId: 'stateSpecificActiveCasesContainer',
        altText: 'state specific active cases pic',
      },
      {
        text: 'Recovered',
        count: total.recovered,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/recovered_1_kvwzyq.png',
        testId: 'stateSpecificRecoveredCasesContainer',
        altText: 'state specific recovered cases pic',
      },
      {
        text: 'Deceased',
        count: total.deceased,
        imageUrl:
          'https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646112518/covid19Dashboard/breathing_1_wblwyp.png',
        testId: 'stateSpecificDeceasedCasesContainer',
        altText: 'state specific deceased cases pic',
      },
    ]
    return (
      <div className="card-container">
        {statsObject.map(eachItem => (
          <ButtonCard
            eachItem={eachItem}
            key={eachItem.text}
            activeCard={activeCard}
            changeActiveCard={this.changeActiveCard}
          />
        ))}
      </div>
    )
  }

  renderTopDistricts = () => {
    const {activeData, activeCard} = this.state
    return (
      <>
        <h1 className={`top-districts-heading text-${activeCard}`}>
          Top Districts
        </h1>
        <ul testid="topDistrictsUnorderedList" className="top-districts-ul">
          {activeData.map(eachItem => (
            <li className="district-list-item" key={eachItem.name}>
              <div className="district-count-container">
                <p className="district-count-text">{eachItem.count}</p>
                <p className="district-name">{eachItem.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSuccessView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {stateData} = this.state

    const stateObj = statesList.find(eachItem => eachItem.state_code === id)
    // console.log(stateData, activeData)
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
    const day = stateData.meta.last_updated
    const dateObj = new Date(day)
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
      <>
        <div className="top-container">
          <div className="state-name-container">
            <h1 className="title-text">{stateObj.state_name}</h1>
            <p className="last-update">{`Last update on ${
              month[dateObj.getMonth()]
            } ${dateObj.getDate()}${nth(
              dateObj.getDate(),
            )} ${dateObj.getFullYear()}.`}</p>
          </div>
          <div className="tested-container">
            <p className="tested-text">Tested</p>
            <p className="tested-count">{stateData.total.tested}</p>
          </div>
        </div>
        <div className="card-container">{this.renderCards()}</div>
        <div className="top-districts-container">
          {this.renderTopDistricts()}
        </div>
      </>
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

  renderTimelinesSuccessView = () => {
    const {timelinesData, activeCard} = this.state
    const activeData = activeCard.toLowerCase()
    const barData = timelinesData.slice(-10)
    console.log(barData)
    const DataFormatter = dateString => {
      const dateObj = new Date(dateString)
      let date = dateObj.getDate()
      if (date < 10) {
        date = 0 + date.toString()
      }
      const shortMonth = dateObj
        .toLocaleString('en-us', {month: 'short'})
        .toUpperCase()
        .toString()
      date = date.toString()
      return `${date} ${shortMonth}`
    }
    const labelFormatter = number => {
      const num = number[activeData]
      return num
    }

    let barColor
    switch (activeData) {
      case 'confirmed':
        barColor = '#9a0e31'
        break
      case 'active':
        barColor = '#0a4fa0'
        break
      case 'recovered':
        barColor = '#216837'
        break
      default:
        barColor = '#474c57'
    }

    const linechartFormatter = number => {
      const size = number.toString().length
      if (size >= 6) {
        return `${number / 100000}L`
      }
      if (size >= 4) {
        return `${number / 1000}K`
      }
      return number
    }

    return (
      <>
        <div className="bar-chart-container desktop-view">
          <BarChart width={800} height={300} data={barData} barCategoryGap={10}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{fill: barColor, fontSize: 10}}
              tickFormatter={DataFormatter}
              tickMargin={10}
            />
            <YAxis hide />
            <Tooltip />
            <Bar
              dataKey={labelFormatter}
              fill={barColor}
              className="bar"
              label={{
                position: 'top',
                fontSize: 10,
                fill: barColor,
              }}
              radius={[5, 5, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </div>
        <div className="bar-chart-container mobile-view">
          <BarChart width={350} height={150} data={barData}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{fill: barColor, fontSize: 5}}
              tickFormatter={DataFormatter}
              tickMargin={10}
              interval={0}
            />
            <YAxis hide />
            <Tooltip />
            <Bar
              dataKey={labelFormatter}
              fill={barColor}
              className="bar"
              label={{
                position: 'top',
                fontSize: 5,
                fill: barColor,
              }}
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </div>
        <div
          className="linecharts-container desktop-view"
          testid="lineChartsContainer"
        >
          <h1 className="daily-charts-heading">Daily Spread Trends</h1>
          <div className="line-chart-container confirmed-background">
            <LineChart
              width={1000}
              height={250}
              data={timelinesData}
              //   margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={10}
                stroke="#FF073A"
                strokeWidth={2}
                tick={{fontSize: 10}}
                tickMargin={10}
              />
              <YAxis
                stroke="#FF073A"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 10}}
              />
              <Tooltip cursor={{stroke: '#FF073A', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#FF073A"
                fill="#FF073A"
              />
            </LineChart>
          </div>
          <div className="line-chart-container active-background">
            <LineChart
              width={1000}
              height={250}
              data={timelinesData}
              margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={10}
                stroke="#007BFF"
                strokeWidth={2}
                tick={{fontSize: 10}}
                tickMargin={10}
              />
              <YAxis
                stroke="#007BFF"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 10}}
              />
              <Tooltip cursor={{stroke: '#007BFF', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                fill="#007BFF"
              />
            </LineChart>
          </div>
          <div className="line-chart-container recovered-background">
            <LineChart
              width={1000}
              height={250}
              data={timelinesData}
              margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={10}
                stroke="#27A243"
                strokeWidth={2}
                tick={{fontSize: 10}}
                tickMargin={10}
              />
              <YAxis
                stroke="#27A243"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 10}}
              />
              <Tooltip cursor={{stroke: '#27A243', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#27A243"
                fill="#27A243"
              />
            </LineChart>
          </div>
          <div className="line-chart-container deceased-background">
            <LineChart
              width={1000}
              height={250}
              data={timelinesData}
              margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={10}
                stroke="#6C757D"
                strokeWidth={2}
                tick={{fontSize: 10}}
                tickMargin={10}
              />
              <YAxis
                stroke="#6C757D"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 10}}
              />
              <Tooltip cursor={{stroke: '#6C757D', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="deceased"
                stroke="#6C757D"
                fill="#6C757D"
              />
            </LineChart>
          </div>
          <div className="line-chart-container tested-background">
            <LineChart
              width={1000}
              height={250}
              data={timelinesData}
              margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={10}
                stroke="#9673B9"
                strokeWidth={2}
                tick={{fontSize: 10}}
                tickMargin={10}
              />
              <YAxis
                stroke="#9673B9"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 10}}
              />
              <Tooltip cursor={{stroke: '#9673B9', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="tested"
                stroke="#9673B9"
                fill="#9673B9"
              />
            </LineChart>
          </div>
        </div>

        <div
          className="linecharts-container mobile-view"
          testid="lineChartsContainer"
        >
          <h1 className="daily-charts-heading">Daily Spread Trends</h1>
          <div className="line-chart-container confirmed-background">
            <LineChart
              width={320}
              height={200}
              data={timelinesData}
              //   margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={20}
                stroke="#FF073A"
                strokeWidth={2}
                tick={{fontSize: 8}}
                tickMargin={10}
              />
              <YAxis
                stroke="#FF073A"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 8}}
              />
              <Tooltip cursor={{stroke: '#FF073A', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" fontSize="5" />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#FF073A"
                fill="#FF073A"
              />
            </LineChart>
          </div>
          <div className="line-chart-container active-background">
            <LineChart
              width={320}
              height={200}
              data={timelinesData}
              //   margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={20}
                stroke="#007BFF"
                strokeWidth={2}
                tick={{fontSize: 8}}
                tickMargin={10}
              />
              <YAxis
                stroke="#007BFF"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 8}}
              />
              <Tooltip cursor={{stroke: '#007BFF', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                fill="#007BFF"
              />
            </LineChart>
          </div>
          <div className="line-chart-container recovered-background">
            <LineChart
              width={320}
              height={200}
              data={timelinesData}
              //   margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={20}
                stroke="#27A243"
                strokeWidth={2}
                tick={{fontSize: 8}}
                tickMargin={10}
              />
              <YAxis
                stroke="#27A243"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 8}}
              />
              <Tooltip cursor={{stroke: '#27A243', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#27A243"
                fill="#27A243"
              />
            </LineChart>
          </div>
          <div className="line-chart-container deceased-background">
            <LineChart
              width={320}
              height={200}
              data={timelinesData}
              //   margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={20}
                stroke="#6C757D"
                strokeWidth={2}
                tick={{fontSize: 8}}
                tickMargin={10}
              />
              <YAxis
                stroke="#6C757D"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 8}}
              />
              <Tooltip cursor={{stroke: '#6C757D', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="deceased"
                stroke="#6C757D"
                fill="#6C757D"
              />
            </LineChart>
          </div>
          <div className="line-chart-container tested-background">
            <LineChart
              width={320}
              height={200}
              data={timelinesData}
              //   margin={{top: 10, right: 10, left: 10, bottom: 10}}
            >
              <XAxis
                dataKey="date"
                interval={20}
                stroke="#9673B9"
                strokeWidth={2}
                tick={{fontSize: 8}}
                tickMargin={10}
              />
              <YAxis
                stroke="#9673B9"
                strokeWidth={2}
                tickFormatter={linechartFormatter}
                tick={{fontSize: 8}}
              />
              <Tooltip cursor={{stroke: '#9673B9', strokeWidth: 1}} />
              <Legend verticalAlign="top" align="right" />
              <Line
                type="monotone"
                dataKey="tested"
                stroke="#9673B9"
                fill="#9673B9"
              />
            </LineChart>
          </div>
        </div>
      </>
    )
  }

  renderTimelinesView = () => {
    const {timelinesApiStatus} = this.state
    switch (timelinesApiStatus) {
      case apiStatusConstants.loading:
        return this.renderTimelinesLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderTimelinesSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-container">
        <Header />
        <div className="state-content">
          {this.renderPageView()}
          {this.renderTimelinesView()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default State
