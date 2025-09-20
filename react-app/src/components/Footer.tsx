export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="container py-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} EduLearn. All rights reserved.</p>
      </div>
    </footer>
  )
}
