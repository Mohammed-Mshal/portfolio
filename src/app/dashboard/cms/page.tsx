import React from 'react'
import ListBoxes from '../../components/ListBoxes'

export default function Dashboard() {

  return (
    <div className='dashboard'>
      <div className="container mx-auto">
        <div className="row">
          <div className="col-12">
            <h1 className="text-white font-bold text-4xl">Dashboard</h1>
          </div>
        </div>
        <ListBoxes />
      </div>
    </div>
  )
}
