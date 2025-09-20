export type Course = {
  id: number
  title: string
  category: 'programming' | 'design' | 'business' | 'marketing'
  description: string
  price: string
  rating: number
  students: string
  icon: string
}

const list: Course[] = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    category: 'programming',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course.',
    price: '$99',
    rating: 4.8,
    students: '12,450',
    icon: 'fa-solid fa-code',
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    category: 'design',
    description: 'Master the art of user interface and user experience design with industry tools.',
    price: '$79',
    rating: 4.9,
    students: '8,320',
    icon: 'fa-solid fa-palette',
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy',
    category: 'marketing',
    description: 'Learn to create effective digital marketing campaigns that drive results.',
    price: '$89',
    rating: 4.7,
    students: '6,890',
    icon: 'fa-solid fa-bullhorn',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    category: 'programming',
    description: 'Master Python programming for data analysis, visualization, and machine learning.',
    price: '$109',
    rating: 4.8,
    students: '9,560',
    icon: 'fa-brands fa-python',
  },
  {
    id: 5,
    title: 'Business Strategy & Leadership',
    category: 'business',
    description: 'Develop essential business skills and leadership qualities for career growth.',
    price: '$95',
    rating: 4.6,
    students: '5,430',
    icon: 'fa-solid fa-chart-line',
  },
  {
    id: 6,
    title: 'Graphic Design Fundamentals',
    category: 'design',
    description: 'Learn the principles of graphic design using Adobe Creative Suite.',
    price: '$69',
    rating: 4.7,
    students: '7,210',
    icon: 'fa-solid fa-paintbrush',
  },
  {
    id: 7,
    title: 'Mobile App Development',
    category: 'programming',
    description: 'Build native mobile apps for iOS and Android using React Native.',
    price: '$119',
    rating: 4.9,
    students: '4,680',
    icon: 'fa-solid fa-mobile-screen',
  },
  {
    id: 8,
    title: 'Social Media Marketing',
    category: 'marketing',
    description: 'Master social media platforms to grow your brand and engage audiences.',
    price: '$59',
    rating: 4.5,
    students: '11,230',
    icon: 'fa-solid fa-share-nodes',
  },
]

export default list.map(c => ({
  ...c,
  get categoryLabel() {
    return c.category.charAt(0).toUpperCase() + c.category.slice(1)
  },
})) as (Course & { categoryLabel: string })[]
