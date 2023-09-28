import React from 'react'
import MainComponent from './components/MainComponent'
import SearchBox from './components/SearchBox'

type Props = {}

function page({}: Props) {
  return (
    <div className="bg-[url('/sky.jpg')] bg-no-repeat bg-cover md:flex justify-around items-center h-screen ">
      <SearchBox/>
    </div> 
  )
}

export default page