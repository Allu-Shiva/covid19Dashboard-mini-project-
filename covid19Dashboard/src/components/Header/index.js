import {Link} from 'react-router-dom'
import {Component} from 'react'

// import Popup from 'reactjs-popup'
import {MdOutlineMenuOpen} from 'react-icons/md'
import {AiFillCloseCircle} from 'react-icons/ai'
import ActiveTabContext from '../../ActiveTabContext'

import './index.css'

class Header extends Component {
  state = {isHamburgerClicked: false}

  onHamClick = () => this.setState({isHamburgerClicked: true})

  onCloseBtn = () => this.setState({isHamburgerClicked: false})

  render() {
    const {isHamburgerClicked} = this.state
    const toShow = isHamburgerClicked ? 'show' : 'hide'

    return (
      <ActiveTabContext.Consumer>
        {value => {
          const {activeTab, changeActiveTab} = value
          const activeHome = () => changeActiveTab('Home')
          const activeAbout = () => changeActiveTab('About')
          return (
            <div>
              <nav className="header">
                <Link to="/" className="header-link">
                  <button
                    className="header-text"
                    type="button"
                    onClick={activeHome}
                  >
                    COVID19<span className="header-span">INDIA</span>
                  </button>
                </Link>
                <ul className="desktop-nav">
                  <li>
                    <Link to="/" className="header-link">
                      <button
                        type="button"
                        className={`header-nav-link ${
                          activeTab === 'Home' ? '' : 'inactive'
                        }`}
                        onClick={activeHome}
                      >
                        Home
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="header-link">
                      <button
                        type="button"
                        className={`header-nav-link ${
                          activeTab === 'About' ? '' : 'inactive'
                        }`}
                        onClick={activeAbout}
                      >
                        About
                      </button>
                    </Link>
                  </li>
                </ul>
                <div className="popup-container">
                  <button
                    className="trigger-button"
                    type="button"
                    onClick={this.onHamClick}
                  >
                    <MdOutlineMenuOpen />
                  </button>
                </div>
              </nav>
              <div className={`${toShow}`}>
                <div className="container">
                  <ul className="ham-list-container">
                    <li>
                      <Link to="/" className="header-link">
                        <button
                          type="button"
                          className={`header-nav-link ${
                            activeTab === 'Home' ? '' : 'inactive'
                          }`}
                          onClick={activeHome}
                        >
                          Home
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="header-link">
                        <button
                          type="button"
                          className={`header-nav-link ${
                            activeTab === 'About' ? '' : 'inactive'
                          }`}
                          onClick={activeAbout}
                        >
                          About
                        </button>
                      </Link>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="close-button"
                    onClick={this.onCloseBtn}
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
              </div>
            </div>
          )
        }}
      </ActiveTabContext.Consumer>
    )
  }
}

export default Header

//  <Popup
//                   modal
//                   trigger={
//                     <button className="trigger-button" type="button">
//                       <MdOutlineMenuOpen />
//                     </button>
//                   }
//                 >
//                   {close => (
//                     <div className="modal-content">
//                       <div className="container">
//                         <ul className="ham-list-container">
//                           <Link to="/" className="header-link">
//                             <li
//                               className={`header-nav-link ${
//                                 activeTab === 'Home' ? '' : 'inactive'
//                               }`}
//                               onClick={activeHome}
//                             >
//                               Home
//                             </li>
//                           </Link>
//                           <Link to="/About" className="header-link">
//                             <li
//                               className={`header-nav-link ${
//                                 activeTab === 'About' ? '' : 'inactive'
//                               }`}
//                               onClick={activeAbout}
//                             >
//                               About
//                             </li>
//                           </Link>
//                         </ul>
//                         <button
//                           type="button"
//                           className="close-button"
//                           onClick={() => close()}
//                         >
//                           <AiFillCloseCircle />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </Popup>
