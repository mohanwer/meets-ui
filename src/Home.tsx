import React from "react"
import { eventSearch } from './services/eventSearch';

export const Home = async() => {
  const results = await eventSearch({})
  console.log(results)
  return (
    <div>
      <div className="px-8 pt-2 flex flex-col justify-center">
        <div className="text-center pb-2">
          <h2>
            Welcome to meets!
          </h2>
        </div>
        <div className="self-center">
          <img
            className="rounded-lg"
            src="https://www.pngkey.com/png/detail/412-4125006_multicultural-office-meeting-cartoon.png"
            alt="Multicultural Office Meeting Cartoon@pngkey.com"
          />
        </div>
      </div>
    </div>
  )
}