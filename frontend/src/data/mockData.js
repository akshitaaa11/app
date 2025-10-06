// Mock data for the chatbot platform

export const mockScholarships = [
  {
    id: '1',
    title: 'Google Computer Science Scholarship',
    provider: 'Google Inc.',
    amount: '$10,000',
    deadline: '2024-12-15',
    description: 'Supporting underrepresented groups in computer science with financial assistance and mentorship opportunities.',
    requirements: ['GPA 3.5+', 'Computer Science Major', 'Underrepresented group'],
    applicationUrl: '#',
    featured: true,
    category: 'Technology',
    location: 'United States',
    type: 'Merit-based'
  },
  {
    id: '2',
    title: 'MIT Innovation Scholarship',
    provider: 'MIT Foundation',
    amount: '$15,000',
    deadline: '2024-11-30',
    description: 'For students pursuing innovative projects in science, technology, engineering, and mathematics.',
    requirements: ['Enrolled at MIT', 'STEM Major', 'Research Project'],
    applicationUrl: '#',
    featured: false,
    category: 'Engineering',
    location: 'Massachusetts',
    type: 'Research-based'
  },
  {
    id: '3',
    title: 'Women in Tech Leadership Grant',
    provider: 'Tech Leaders Foundation',
    amount: '$7,500',
    deadline: '2024-10-31',
    description: 'Empowering women to become leaders in technology through education and professional development.',
    requirements: ['Female student', 'Technology field', 'Leadership experience'],
    applicationUrl: '#',
    featured: true,
    category: 'Technology',
    location: 'Global',
    type: 'Need-based'
  },
  {
    id: '4',
    title: 'Environmental Sciences Excellence Award',
    provider: 'Green Future Organization',
    amount: '$5,000',
    deadline: '2024-09-25',
    description: 'Supporting students dedicated to environmental conservation and sustainable development.',
    requirements: ['Environmental Science Major', 'GPA 3.0+', 'Community service'],
    applicationUrl: '#',
    featured: false,
    category: 'Environmental',
    location: 'North America',
    type: 'Merit-based'
  },
  {
    id: '5',
    title: 'International Business Leaders Scholarship',
    provider: 'Global Business Institute',
    amount: '$12,000',
    deadline: '2024-11-15',
    description: 'For students pursuing international business with a focus on global economic development.',
    requirements: ['Business Major', 'International focus', 'Language proficiency'],
    applicationUrl: '#',
    featured: false,
    category: 'Business',
    location: 'International',
    type: 'Merit-based'
  }
];

export const mockMyScholarships = [
  {
    id: '1',
    scholarship: mockScholarships[0],
    status: 'approved',
    appliedDate: '2024-08-15',
    statusDate: '2024-09-01',
    notes: 'Congratulations! Your application has been approved.'
  },
  {
    id: '2',
    scholarship: mockScholarships[1],
    status: 'pending',
    appliedDate: '2024-08-20',
    statusDate: '2024-08-20',
    notes: 'Application under review.'
  },
  {
    id: '3',
    scholarship: mockScholarships[2],
    status: 'rejected',
    appliedDate: '2024-07-10',
    statusDate: '2024-08-05',
    notes: 'Thank you for your application. Unfortunately, we cannot offer you a scholarship at this time.'
  }
];

export const mockChatMessages = [
  {
    id: '1',
    type: 'bot',
    content: 'Hello! I\'m your scholarship assistant. How can I help you find the perfect scholarship today?',
    timestamp: '2024-09-15T10:00:00Z',
    avatar: '🤖'
  },
  {
    id: '2',
    type: 'user',
    content: 'I\'m looking for computer science scholarships for undergrad students.',
    timestamp: '2024-09-15T10:01:00Z'
  },
  {
    id: '3',
    type: 'bot',
    content: 'Great! I found several computer science scholarships that match your profile. Based on your academic background, I\'d recommend the Google Computer Science Scholarship and the MIT Innovation Scholarship. Would you like me to provide more details about these opportunities?',
    timestamp: '2024-09-15T10:01:30Z',
    avatar: '🤖'
  },
  {
    id: '4',
    type: 'user',
    content: 'Yes, tell me more about the Google scholarship please.',
    timestamp: '2024-09-15T10:02:00Z'
  },
  {
    id: '5',
    type: 'bot',
    content: 'The Google Computer Science Scholarship offers $10,000 to support underrepresented groups in computer science. Requirements include a GPA of 3.5+, being a Computer Science major, and belonging to an underrepresented group. The deadline is December 15th, 2024. Would you like me to help you with the application process?',
    timestamp: '2024-09-15T10:02:30Z',
    avatar: '🤖'
  }
];

export const mockAnalyticsData = {
  totalScholarships: 1247,
  applicationsSubmitted: 23,
  approvedApplications: 3,
  pendingApplications: 5,
  totalAwarded: '$32,500',
  successRate: '13%',
  monthlyStats: [
    { month: 'Jan', applications: 2, approved: 1 },
    { month: 'Feb', applications: 3, approved: 0 },
    { month: 'Mar', applications: 4, approved: 1 },
    { month: 'Apr', applications: 2, approved: 0 },
    { month: 'May', applications: 5, approved: 1 },
    { month: 'Jun', applications: 3, approved: 0 },
    { month: 'Jul', applications: 2, approved: 0 },
    { month: 'Aug', applications: 2, approved: 0 }
  ],
  topCategories: [
    { category: 'Technology', count: 8, percentage: 35 },
    { category: 'Engineering', count: 6, percentage: 26 },
    { category: 'Business', count: 4, percentage: 17 },
    { category: 'Environmental', count: 3, percentage: 13 },
    { category: 'Arts', count: 2, percentage: 9 }
  ]
};

export const mockNotifications = [
  {
    id: '1',
    type: 'success',
    title: 'Scholarship Approved!',
    message: 'Congratulations! Your Google Computer Science Scholarship application has been approved.',
    timestamp: '2024-09-15T09:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'New Scholarship Match',
    message: 'We found 3 new scholarships that match your profile.',
    timestamp: '2024-09-14T14:20:00Z',
    read: false
  },
  {
    id: '3',
    type: 'warning',
    title: 'Deadline Reminder',
    message: 'MIT Innovation Scholarship deadline is in 5 days.',
    timestamp: '2024-09-13T11:15:00Z',
    read: true
  }
];