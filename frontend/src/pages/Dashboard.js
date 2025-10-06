import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  MessageSquare, 
  Search, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { mockScholarships, mockAnalyticsData, mockMyScholarships } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Scholarships',
      value: mockAnalyticsData.totalScholarships.toLocaleString(),
      icon: Search,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Applications Submitted',
      value: mockAnalyticsData.applicationsSubmitted,
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Success Rate',
      value: mockAnalyticsData.successRate,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Total Awarded',
      value: mockAnalyticsData.totalAwarded,
      icon: Award,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'bg-gray-500/80';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="glass rounded-2xl p-8 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                Ready to discover new scholarship opportunities?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/chat"
                className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2 group"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Start Chat</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="glass glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Scholarships */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Featured Scholarships</h2>
              <Link
                to="/scholarships"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {mockScholarships.filter(s => s.featured).slice(0, 3).map((scholarship) => (
                <div key={scholarship.id} className="glass-dark rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        {scholarship.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{scholarship.provider}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-400 font-medium">{scholarship.amount}</span>
                        <span className="text-gray-400 flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due {new Date(scholarship.deadline).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="glass-blue px-3 py-1 rounded-full">
                      <span className="text-blue-300 text-xs font-medium">{scholarship.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Applications</h2>
              <Link
                to="/my-scholarships"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {mockMyScholarships.slice(0, 3).map((application) => (
                <div key={application.id} className="glass-dark rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">
                      {application.scholarship.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(application.status)}
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{application.scholarship.provider}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-medium text-sm">
                      {application.scholarship.amount}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusClass(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-2xl p-6 animate-slide-up">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/chat"
              className="glass-button p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300"
            >
              <MessageSquare className="h-8 w-8 text-blue-400 mx-auto mb-3 group-hover:text-blue-300" />
              <h3 className="font-semibold text-white mb-1">Chat with Assistant</h3>
              <p className="text-gray-400 text-sm">Get personalized scholarship recommendations</p>
            </Link>
            
            <Link
              to="/scholarships"
              className="glass-button p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300"
            >
              <Search className="h-8 w-8 text-green-400 mx-auto mb-3 group-hover:text-green-300" />
              <h3 className="font-semibold text-white mb-1">Browse Scholarships</h3>
              <p className="text-gray-400 text-sm">Explore thousands of opportunities</p>
            </Link>
            
            <Link
              to="/analytics"
              className="glass-button p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300"
            >
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3 group-hover:text-purple-300" />
              <h3 className="font-semibold text-white mb-1">View Analytics</h3>
              <p className="text-gray-400 text-sm">Track your application progress</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;