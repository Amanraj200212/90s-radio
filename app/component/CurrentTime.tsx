"use client"
import React, { useEffect, useState } from 'react'

const CurrentTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-In", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  },[])

  return (
    <span>{time}</span>
  )
}

export default CurrentTime