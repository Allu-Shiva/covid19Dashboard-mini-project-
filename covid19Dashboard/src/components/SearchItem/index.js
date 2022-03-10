import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchItem = props => {
  const {eachItem} = props
  const {name, stateCode} = eachItem

  return (
    <Link to={`/state/${stateCode}`} className="search-link">
      <li className="search-list-item">
        <p className="search-result-text">{name}</p>
        <div className="code-box">
          <p>{stateCode}</p>
          <BiChevronRightSquare className="right-square-icon" />
        </div>
      </li>
    </Link>
  )
}

export default SearchItem
