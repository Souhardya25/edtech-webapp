import { Link } from 'react-router-dom'
import courses from '../shared/courses'

export default function Dashboard() {
  // Simulate enrolled courses from localStorage (same idea as static site)
  const enrolled = (() => {
    try {
      return JSON.parse(localStorage.getItem('enrolledCourses') || '[]') as Array<{id:number,progress?:number}>
    } catch { return [] }
  })()

  const mapped = enrolled.map(e => ({
    ...courses.find(c => c.id === e.id),
    progress: e.progress || 0,
  })).filter(Boolean) as Array<typeof courses[number] & {progress:number}>

  return (
    <section className="pt-24 pb-16 bg-gray-50 min-h-[60vh]">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-gray-600">Track your learning progress and continue your courses.</p>
          </div>
          <Link className="btn btn-primary" to="/">Discover Courses</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-4 shadow"><div className="text-sm text-gray-500">Enrolled</div><div className="text-2xl font-bold">{mapped.length}</div></div>
          <div className="bg-white rounded-xl p-4 shadow"><div className="text-sm text-gray-500">Average Progress</div><div className="text-2xl font-bold">{avg(mapped.map(m=>m.progress))}%</div></div>
          <div className="bg-white rounded-xl p-4 shadow"><div className="text-sm text-gray-500">Completed</div><div className="text-2xl font-bold">{mapped.filter(m=>m.progress>=100).length}</div></div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mapped.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 text-center text-gray-500">
              No enrolled courses yet. <Link to="/" className="text-brand-600 underline">Browse courses</Link>
            </div>
          )}
          {mapped.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow overflow-hidden">
              <div className="h-36 bg-gradient-to-br from-brand-500 to-purple-500 text-white flex items-center justify-center text-5xl">
                <i className={c.icon}></i>
              </div>
              <div className="p-4">
                <div className="text-brand-600 text-sm font-medium">{c.categoryLabel}</div>
                <h3 className="text-lg font-semibold mt-1">{c.title}</h3>
                <div className="mt-3">
                  <div className="h-2 rounded bg-gray-100">
                    <div className="h-2 rounded bg-brand-500" style={{width: `${c.progress}%`}} />
                  </div>
                  <div className="mt-1 text-right text-sm text-gray-600">{c.progress}%</div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link to={`/course/${c.id}`} className="btn btn-outline text-sm text-center">Continue</Link>
                  <button onClick={() => addProgress(c.id)} className="btn btn-primary text-sm">+10%</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function avg(nums:number[]) { return nums.length ? Math.round(nums.reduce((a,b)=>a+b,0)/nums.length) : 0 }

function addProgress(id:number) {
  try {
    const list = JSON.parse(localStorage.getItem('enrolledCourses') || '[]') as Array<{id:number,progress?:number}>
    const idx = list.findIndex(x => x.id === id)
    if (idx >= 0) {
      list[idx].progress = Math.min(100, (list[idx].progress || 0) + 10)
      localStorage.setItem('enrolledCourses', JSON.stringify(list))
      location.reload()
    }
  } catch {}
}
