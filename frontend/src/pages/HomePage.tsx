import React, { useEffect } from "react"
import { test_api } from './../api/server';

export const HomePage = () => {
  useEffect(() => {
    test_api()
  }, [])

  return (
    <div>
      home
    </div>
  )
}