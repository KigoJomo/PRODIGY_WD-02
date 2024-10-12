'use client'
import React, { useEffect, useState, useRef } from 'react'
import { FaPlay, FaPause, FaRedo, FaTrash } from 'react-icons/fa'

const FormattedTime = ({ time, small }) => {
  const totalSeconds = Math.floor(time / 1000)
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0')

  return (
    <p className={`${small ? 'font-bold text-2xl' : 'font-light text-[4.5rem] md:text-9xl'}`}>
      {minutes}:{seconds}
      <span className={`font-light ${small ? 'text-base' : 'text-xl'}`}>{milliseconds}</span>
    </p>
  )
}

const LapTime = ({time, onDelete}) =>{
  return (
    <div className='w-full flex items-center justify-between bg-background-transparent backdrop-brightness-200 px-4 py-2 rounded-3xl appear transition-all duration-300'>
      <FormattedTime time={time} small />
      <button onClick={onDelete}>
        <FaTrash color='#ff5555' />
      </button>
    </div>
  )
}

const Stopwatch = () => {
  // to track whether the stopwatch is running
  const [isActive, setIsActive] = useState(false)
  // track the elapsed time in milliseconds
  const [time, setTime] = useState(0)
  const intervalRef = useRef(null)
  const [laps, setLaps] = useState([])
  const lapsRef =useRef(null)

  const deleteLap = (index) => {
    setLaps((prevLaps) => prevLaps.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 100)
      }, 100)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive])

  const toggle = () => setIsActive((prev) => !prev)
  const reset = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
    setIsActive(false)
    setTime(0)
  }

  return (
    <section className="w-full h-full p-4 flex flex-col md:flex-row items-center gap-6 bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat scaling-bg">
      <div className="stop-watch w-full md:w-3/5 h-3/5 md:h-full p-4 border-2 border-purple-600 bg-black bg-opacity-50 backdrop-blur-sm rounded-3xl shadow-2xl       flex flex-col items-center justify-center gap-6">
        <p className="">Stopwatch</p>

        <FormattedTime time={time} />

        <div className="buttons w-full flex items-center justify-evenly">
          <button
            onClick={toggle}
            className="bg-background-transparent aspect-square p-4 rounded-full border border-blue-500 clicked md:hover:bg-opacity-100 transition-all duration-300"
          >
            {isActive ? (
              <div className="">
                <FaPause size={24} />
              </div>
            ) : (
              <div className="">
                <FaPlay size={24} />
              </div>
            )}
          </button>

          <button
            onClick={reset}
            className="bg-background-transparent aspect-square p-4 rounded-full border border-red-500 clicked md:hover:bg-opacity-100 transition-all duration-300"
          >
            <FaRedo size={24} />
          </button>
        </div>
      </div>

      <div className="lap-records w-full md:w-2/5 h-2/5 md:h-full border-2 border-purple-600 bg-black bg-opacity-50 backdrop-blur-sm rounded-3xl shadow-2xl     p-4 pb-0 flex flex-col gap-2">
        <h3 className=''>lap times</h3>
        <hr />
        <div className="w-full h-full overflow-y-scroll flex flex-col gap-2 scrollbar-hidden" ref={lapsRef}>
          {laps.slice().reverse().map((lapTime, index) =>(
            <LapTime key={index} time={lapTime} onDelete={() => deleteLap(laps.length - 1 - index)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stopwatch
