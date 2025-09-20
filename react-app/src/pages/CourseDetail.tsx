import { useParams, Link } from 'react-router-dom'
import courses from '../shared/courses'

export default function CourseDetail() {
  const { id } = useParams()
  const course = courses.find(c => String(c.id) === id)

  if (!course) {
    return (
      <div className="container pt-24 pb-16">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/" className="text-brand-600 underline">Go back</Link>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="py-10 bg-gradient-to-br from-brand-500 to-purple-500 text-white">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="text-sm opacity-90 mb-2"><Link to="/" className="underline">Home</Link> / Course</div>
            <h1 className="text-3xl font-extrabold">{course.title}</h1>
            <p className="mt-2 opacity-90">{course.description}</p>
            <div className="flex gap-6 mt-4 text-sm opacity-90">
              <div>⭐ {course.rating}</div>
              <div>👥 {course.students}</div>
              <div>🌐 English</div>
            </div>
          </div>

          <aside className="bg-white text-gray-800 rounded-xl p-5 shadow-lg">
            <div className="h-40 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 text-white flex items-center justify-center text-5xl">
              <i className={course.icon}></i>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="text-2xl font-bold text-brand-600">{course.price}</div>
              <div className="text-sm line-through text-gray-400">$199</div>
              <div className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">50% off</div>
            </div>
            <div className="mt-4 grid gap-2">
              <button className="btn btn-primary">Enroll Now</button>
              <Link to="/dashboard" className="btn btn-outline text-center">Go to Dashboard</Link>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>🎬 40 hours on-demand video</li>
              <li>📄 15 articles</li>
              <li>⬇️ 25 downloadable resources</li>
              <li>📱 Access on mobile and TV</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700 max-w-3xl">This is a demo course detail page implemented in React + Tailwind. You can wire this to dynamic data later or fetch from an API.</p>
        </div>
      </section>
    </div>
  )
}
