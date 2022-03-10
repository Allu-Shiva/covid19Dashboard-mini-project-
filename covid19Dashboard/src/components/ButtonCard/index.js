import './index.css'

const colorObject = {
  Confirmed: 'confirmed',
  Active: 'active',
  Recovered: 'recovered',
  Deceased: 'deceased',
}

const ButtonCard = props => {
  const {eachItem, activeCard, changeActiveCard} = props
  const {text, count, imageUrl, testId, altText} = eachItem
  const onChangeCard = () => changeActiveCard(text)
  return (
    <button
      type="button"
      className={`card-btn ${activeCard === text ? activeCard : ''}`}
      onClick={onChangeCard}
    >
      <div testid={testId} className="home-card-container">
        <p className={`card-text ${colorObject[text]}`}>{text}</p>
        <img src={imageUrl} alt={altText} />
        <p className={`card-count ${colorObject[text]}`}>{count}</p>
      </div>
    </button>
  )
}

export default ButtonCard
