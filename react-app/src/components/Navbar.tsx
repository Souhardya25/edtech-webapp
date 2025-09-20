import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-brand-600 font-bold text-xl">
          <i className="fa-solid fa-graduation-cap"></i>
          EduLearn
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="#courses" className="text-gray-700 hover:text-brand-600">Courses</a>
          <a href="#about" className="text-gray-700 hover:text-brand-600">About</a>
          <a href="#contact" className="text-gray-700 hover:text-brand-600">Contact</a>
          <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}
