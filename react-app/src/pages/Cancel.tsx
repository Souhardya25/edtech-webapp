import { Link, useSearchParams } from 'react-router-dom'

export default function Cancel() {
  const [params] = useSearchParams()
  const courseId = params.get('courseId')
  return (
    <div className="container pt-24 pb-16">
      <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
      <p className="mt-2 text-gray-700">Your payment was canceled{courseId ? ` for course #${courseId}` : ''}. You can try again anytime.</p>
      <div className="mt-6 flex gap-3">
        <Link to={courseId ? `/course/${courseId}` : '/'} className="btn btn-primary">Return to Course</Link>
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </div>
  )
}
