import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="home-content-failure">
    <img
      src="https://res.cloudinary.com/dmt9pfr0n/image/upload/v1646062113/covid19Dashboard/Group_7484_uhvnxq.png"
      alt="not-found-pic"
      className="failure-image"
    />
    <h1 className="failure-title">PAGE NOT FOUND</h1>
    <p className="failure-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link className="failure-home-btn" to="/">
      <button type="button" className="not-found-home-btn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
