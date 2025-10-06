import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Clock,
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { mockAnalyticsData } from '../data/mockData';

const Analytics = () => {
  const { 
    totalScholarships, 
    applicationsSubmitted, 
    approvedApplications, 
    pendingApplications, 
    totalAwarded, 
    successRate,
    monthlyStats,
    topCategories 
  } = mockAnalyticsData;

  const stats = [
    {
      title: 'Applications Submitted',
      value: applicationsSubmitted,
      change: '+12% from last month',
      icon: Target,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100/50',
      trend: 'up'
    },
    {
      title: 'Success Rate',
      value: successRate,
      change: '+5% from last month',
      icon: TrendingUp,
      color: 'text-green-700',
      bgColor: 'bg-green-100/50',
      trend: 'up'
    },
    {
      title: 'Total Awarded',
      value: totalAwarded,
      change: '+$15,000 this month',
      icon: DollarSign,
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100/50',
      trend: 'up'
    },
    {
      title: 'Pending Applications',
      value: pendingApplications,
      change: '3 awaiting results',
      icon: Clock,
      color: 'text-orange-700',
      bgColor: 'bg-orange-100/50',
      trend: 'neutral'
    }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <div className="h-4 w-4"></div>;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">
                Track your scholarship application performance and success metrics
              </p>
            </div>
            <div className="glass-purple p-3 rounded-xl">
              <BarChart3 className="h-8 w-8 text-amber-700" />
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className="glass glass-card rounded-xl p-6 animate-slide-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  {getTrendIcon(stat.trend)}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Applications Chart */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Monthly Application Trends</h2>
            <div className="space-y-4">
              {monthlyStats.map((month, index) => {
                const maxApplications = Math.max(...monthlyStats.map(m => m.applications));
                const applicationWidth = (month.applications / maxApplications) * 100;
                const approvalRate = month.applications > 0 ? (month.approved / month.applications) * 100 : 0;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 font-medium">{month.month}</span>
                      <div className="text-gray-600">
                        <span>{month.applications} applications</span>
                        {month.approved > 0 && (
                          <span className="text-green-600 ml-2">• {month.approved} approved</span>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200/50 rounded-full h-3">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full relative"
                          style={{ width: `${applicationWidth}%` }}
                        >
                          {month.approved > 0 && (
                            <div 
                              className="absolute top-0 left-0 h-full bg-green-500/50 rounded-full"
                              style={{ width: `${approvalRate}%` }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Categories */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Application Categories</h2>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass-dark rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-amber-400 to-amber-600' :
                      index === 1 ? 'from-green-400 to-green-600' :
                      index === 2 ? 'from-purple-400 to-purple-600' :
                      index === 3 ? 'from-yellow-400 to-yellow-600' :
                      'from-red-400 to-red-600'
                    }`}></div>
                    <span className="text-gray-800 font-medium">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-800 font-semibold">{category.count}</div>
                    <div className="text-gray-600 text-xs">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Success Metrics */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Success Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 glass-dark rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Approved</span>
                </div>
                <span className="text-green-600 font-semibold">{approvedApplications}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 glass-dark rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="text-gray-700">Pending</span>
                </div>
                <span className="text-yellow-600 font-semibold">{pendingApplications}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 glass-dark rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-amber-600" />
                  <span className="text-gray-700">Success Rate</span>
                </div>
                <span className="text-amber-700 font-semibold">{successRate}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 glass-dark rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">Scholarship Approved</p>
                  <p className="text-gray-600 text-xs">Google CS Scholarship - 2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 glass-dark rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">Application Submitted</p>
                  <p className="text-gray-600 text-xs">MIT Innovation Fund - 5 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 glass-dark rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">Deadline Reminder</p>
                  <p className="text-gray-600 text-xs">Women in Tech Grant - 1 week ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Goals & Achievements */}
          <div className="glass rounded-2xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Goals & Achievements</h3>
            <div className="space-y-4">
              <div className="p-4 glass-dark rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="text-gray-800 font-medium">Monthly Goal</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">Apply to 5 scholarships</p>
                <div className="w-full bg-gray-200/30 rounded-full h-2">
                  <div className="w-4/5 h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">4 of 5 completed</p>
              </div>
              
              <div className="p-4 glass-dark rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-800 font-medium">This Month</span>
                </div>
                <p className="text-purple-600 text-sm font-semibold">3 applications submitted</p>
                <p className="text-gray-600 text-xs">Best month yet!</p>
              </div>
              
              <div className="p-4 glass-dark rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-gray-800 font-medium">Success Trend</span>
                </div>
                <p className="text-green-600 text-sm font-semibold">+15% improvement</p>
                <p className="text-gray-600 text-xs">Keep up the great work!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;