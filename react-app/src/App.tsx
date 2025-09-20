import { Outlet, Link, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
