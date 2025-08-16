import React from 'react'
import Urlform from '../components/Urlform'
import UserUrl from '../components/UserUrl'

const Dashboard = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          URL Shortener
          <Urlform />
          <UserUrl />
        </h1>
      </div>
    </div>
  )
}

export default Dashboard
