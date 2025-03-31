import React from 'react'
import { getUser } from '../utils/Helper'

const Home = () => {
  return (
    <h1>Home page, Hi {getUser().username}</h1>
  )
}

export default Home   