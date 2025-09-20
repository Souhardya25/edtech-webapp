import { Link, useSearchParams } from 'react-router-dom'

export default function Success() {
  const [params] = useSearchParams()
  const courseId = params.get('courseId')
  return (
    <div className="container pt-24 pb-16">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-2 text-gray-700">Thank you for your purchase{courseId ? ` of course #${courseId}` : ''}. Your access will be provisioned shortly.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </div>
  )
}
