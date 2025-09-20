import { Link } from 'react-router-dom'
import courses from '../shared/courses'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Transform Your Future with <span className="text-brand-600">Quality Education</span>
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Learn from industry experts. Master new skills, advance your career, and achieve your goals.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#courses" className="btn btn-primary">Start Learning</a>
              <a href="#about" className="btn btn-outline">Learn More</a>
            </div>
            <div className="mt-8 flex gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-600">50K+</div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-600">200+</div>
                <div className="text-sm text-gray-500">Courses</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-600">95%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 text-white flex items-center justify-center text-6xl shadow-xl">
              <i className="fa-solid fa-laptop-code" />
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Popular Courses</h2>
            <p className="text-gray-600">Discover our most popular courses designed to boost your career</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0,6).map(c => (
              <div key={c.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-brand-500 to-purple-500 text-white flex items-center justify-center text-5xl">
                  <i className={c.icon}></i>
                </div>
                <div className="p-4">
                  <div className="text-brand-600 text-sm font-medium">{c.categoryLabel}</div>
                  <h3 className="text-lg font-semibold mt-1">{c.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{c.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-gray-700 text-sm">⭐ {c.rating} • {c.students}</div>
                    <div className="text-brand-600 font-semibold">{c.price}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to={`/course/${c.id}`} className="btn btn-outline text-sm">Details</Link>
                    <Link to="/dashboard" className="btn btn-primary text-sm">Enroll</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">About EduLearn</h2>
            <p className="mt-3 text-gray-600">
              We're on a mission to make quality education accessible to everyone, everywhere.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {['Interactive Learning','Real Projects','Career Support','Community'].map((f) => (
                <div key={f} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                  <i className="fa-solid fa-check-circle text-brand-500" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 text-white flex items-center justify-center text-6xl shadow-xl">
              <i className="fa-solid fa-chalkboard-user" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white">
        <div className="container grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="text-gray-600 mt-2">Have questions? We'd love to hear from you.</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3"><i className="fa-solid fa-envelope text-white bg-brand-500 w-10 h-10 rounded-full inline-flex items-center justify-center"></i> hello@edulearn.com</div>
              <div className="flex items-center gap-3"><i className="fa-solid fa-phone text-white bg-brand-500 w-10 h-10 rounded-full inline-flex items-center justify-center"></i> +1 (555) 123-4567</div>
              <div className="flex items-center gap-3"><i className="fa-solid fa-location-dot text-white bg-brand-500 w-10 h-10 rounded-full inline-flex items-center justify-center"></i> 123 Education St</div>
            </div>
          </div>
          <form className="bg-gray-50 p-6 rounded-xl shadow" onSubmit={(e)=>{e.preventDefault(); alert('Wire this form to Supabase like in the static version.')}}>
            <div className="grid gap-4">
              <input className="border border-gray-300 rounded-lg p-3" placeholder="Your Name" required />
              <input type="email" className="border border-gray-300 rounded-lg p-3" placeholder="Your Email" required />
              <textarea className="border border-gray-300 rounded-lg p-3" rows={5} placeholder="Your Message" required />
              <button className="btn btn-primary">Send Message</button>
              <p className="text-sm text-gray-500">Tip: Use the Supabase Edge Function from the static site as a reference.</p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
