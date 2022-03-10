import './index.css'

const colorObject = {
  Confirmed: 'confirmed',
  Active: 'active',
  Recovered: 'recovered',
  Deceased: 'deceased',
}

const Card = props => {
  const {eachItem} = props
  const {text, count, imageUrl, testId, altText} = eachItem
  return (
    <div testid={testId} className="home-card-container">
      <p className={`card-text ${colorObject[text]}`}>{text}</p>
      <img src={imageUrl} alt={altText} />
      <p className={`card-count ${colorObject[text]}`}>{count}</p>
    </div>
  )
}

export default Card
