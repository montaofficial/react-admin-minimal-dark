import React from 'react'
import TitleCard from '../components/TitleCard'

function Dashboard(props) {
  return (
    <div className="dashboard-container">
      <div className="column">
        <TitleCard
          title="Dashboard ready!"
          subtitle="use it to display data."
        />
      </div>
      <div className="column"></div>
      <div className="column"></div>
    </div>
  )
}

export default Dashboard
