import parse from 'html-react-parser'
import './index.css'

const FaqItem = props => {
  const {eachItem} = props
  const {question, answer} = eachItem
  //   console.log(eachItem)

  return (
    <li className="faq-list-item">
      <p className="question-text">{question}</p>
      <p className="answer-text">{parse(answer)}</p>
    </li>
  )
}

export default FaqItem
