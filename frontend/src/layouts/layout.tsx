import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <header>
            <h1>Ваши группы</h1>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            Команда 4891
        </footer>
    </>
  )
}

export default Layout