import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Calendar, 
  DollarSign, 
  ExternalLink,
  FileText,
  Filter,
  Search,
  Eye
} from 'lucide-react';
import { mockMyScholarships } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const MyScholarships = () => {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Applications' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const filteredApplications = mockMyScholarships.filter(app => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = app.scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleViewDetails = (application) => {
    setSelectedScholarship(application);
  };

  const handleWithdraw = (applicationId) => {
    toast({
      title: "Application withdrawn",
      description: "Your scholarship application has been withdrawn successfully.",
      variant: "default"
    });
  };

  const stats = {
    total: mockMyScholarships.length,
    approved: mockMyScholarships.filter(app => app.status === 'approved').length,
    pending: mockMyScholarships.filter(app => app.status === 'pending').length,
    rejected: mockMyScholarships.filter(app => app.status === 'rejected').length
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">My Scholarship Applications</h1>
              <p className="text-gray-600">
                Track and manage your scholarship applications
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search applications..."
                  className="glass-input w-full pl-10 pr-4 py-3 rounded-lg"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="md:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="glass-input w-full py-3 px-4 rounded-lg appearance-none"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-white text-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="glass rounded-2xl overflow-hidden animate-slide-up">
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No applications found</h3>
              <p className="text-gray-600">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You haven\'t applied to any scholarships yet.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left p-6 text-gray-700 font-medium">Scholarship</th>
                    <th className="text-left p-6 text-gray-700 font-medium">Amount</th>
                    <th className="text-left p-6 text-gray-700 font-medium">Status</th>
                    <th className="text-left p-6 text-gray-700 font-medium">Applied Date</th>
                    <th className="text-left p-6 text-gray-700 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr 
                      key={application.id}
                      className="border-b border-white/10 hover:bg-white/20 transition-colors"
                    >
                      <td className="p-6">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {application.scholarship.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {application.scholarship.provider}
                          </p>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            {application.scholarship.amount}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(application.status)}
                          <span className={`font-medium ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center space-x-2 text-gray-700">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(application)}
                            className="p-2 rounded-lg text-blue-600 hover:text-blue-500 hover:bg-blue-100/20 transition-all duration-200"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          {application.status === 'pending' && (
                            <button
                              onClick={() => handleWithdraw(application.id)}
                              className="p-2 rounded-lg text-red-600 hover:text-red-500 hover:bg-red-100/20 transition-all duration-200"
                              title="Withdraw application"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/20 transition-all duration-200"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Scholarship Info */}
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {selectedScholarship.scholarship.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Provider:</span>
                    <span className="text-gray-800 ml-2">{selectedScholarship.scholarship.provider}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-green-600 font-semibold ml-2">{selectedScholarship.scholarship.amount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Deadline:</span>
                    <span className="text-gray-800 ml-2">
                      {new Date(selectedScholarship.scholarship.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-800 ml-2">{selectedScholarship.scholarship.category}</span>
                  </div>
                </div>
              </div>

              {/* Application Status */}
              <div className="glass-dark rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Application Status</h4>
                <div className="flex items-center space-x-3 mb-4">
                  {getStatusIcon(selectedScholarship.status)}
                  <span className={`font-medium text-lg ${getStatusColor(selectedScholarship.status)}`}>
                    {selectedScholarship.status.charAt(0).toUpperCase() + selectedScholarship.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm space-y-2">
                  <div>
                    <span className="text-gray-600">Applied:</span>
                    <span className="text-gray-800 ml-2">
                      {new Date(selectedScholarship.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-gray-800 ml-2">
                      {new Date(selectedScholarship.statusDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {selectedScholarship.notes && (
                  <div className="mt-4 p-4 rounded-lg bg-white/20 border border-white/20">
                    <p className="text-gray-700 text-sm italic">{selectedScholarship.notes}</p>
                  </div>
                )}
              </div>

              {/* Requirements */}
              <div className="glass-dark rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Requirements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedScholarship.scholarship.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="glass-purple px-3 py-1 rounded-full text-sm text-amber-800"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                {selectedScholarship.scholarship.applicationUrl && (
                  <button className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Original</span>
                  </button>
                )}
                
                {selectedScholarship.status === 'pending' && (
                  <button
                    onClick={() => {
                      handleWithdraw(selectedScholarship.id);
                      setSelectedScholarship(null);
                    }}
                    className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2 bg-red-100/20 border-red-300/30 text-red-600"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Withdraw</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyScholarships;