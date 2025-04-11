import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function index() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    if (user) {
      navigate("/scp/dashboard")
    }
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}
