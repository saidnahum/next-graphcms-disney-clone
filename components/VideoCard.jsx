const Card = ({ thumbnail }) => {
   return <img className="videoCard" src={thumbnail.url} alt={thumbnail.title}/>
}

export default Card