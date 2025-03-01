import { useState, useEffect } from 'react'

const useTimer = (initialTime: number = 0) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return time
}

export default useTimer
