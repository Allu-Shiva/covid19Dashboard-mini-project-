import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <p className="header-text footer-title">
        COVID19<span className="header-span">INDIA</span>
      </p>
      <p className="footer-text">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-icon-container">
        <VscGithubAlt className="footer-icon" />
        <FiInstagram className="footer-icon" />
        <FaTwitter className="footer-icon" />
      </div>
    </div>
  )
}
