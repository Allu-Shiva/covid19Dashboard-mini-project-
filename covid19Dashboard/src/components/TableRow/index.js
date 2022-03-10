import './index.css'

const TableRow = props => {
  const {eachItem} = props
  const {active, confirmed, deceased, name, recovered, population} = eachItem

  return (
    <li className="table-row">
      <div className="name-cell">
        <p>{name}</p>
      </div>
      <div className="table-title-container">
        <p className="cell confirmed">{confirmed}</p>
        <p className="cell active">{active}</p>
        <p className="cell recovered">{recovered}</p>
        <p className="cell deceased">{deceased}</p>
        <p className="cell population">{population}</p>
      </div>
    </li>
  )
}

export default TableRow
