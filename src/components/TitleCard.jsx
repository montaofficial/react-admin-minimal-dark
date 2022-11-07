import React from 'react'
import image from '../img/waving-man.svg'

function TitleCard(props) {
  return (
    <div className="card">
      <h1>{props.title || 'Dashboard'}</h1>
      <h2>{props.subtitle || null}</h2>
      <img className="image-fix-dx" src={image} alt="Man waving at you" />
    </div>
  )
}

export default TitleCard
