import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  Star,
  ExternalLink,
  Bookmark,
  X
} from 'lucide-react';
import { mockScholarships } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const Scholarships = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedScholarships, setBookmarkedScholarships] = useState(new Set());

  const categories = ['all', 'Technology', 'Engineering', 'Business', 'Environmental', 'Arts'];
  const types = ['all', 'Merit-based', 'Need-based', 'Research-based'];

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter(scholarship => {
      const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || scholarship.category === selectedCategory;
      const matchesType = selectedType === 'all' || scholarship.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  const handleBookmark = (scholarshipId) => {
    const newBookmarks = new Set(bookmarkedScholarships);
    if (newBookmarks.has(scholarshipId)) {
      newBookmarks.delete(scholarshipId);
      toast({
        title: "Bookmark removed",
        description: "Scholarship removed from your saved list.",
        variant: "default"
      });
    } else {
      newBookmarks.add(scholarshipId);
      toast({
        title: "Scholarship bookmarked",
        description: "Scholarship saved to your list for later.",
        variant: "default"
      });
    }
    setBookmarkedScholarships(newBookmarks);
  };

  const handleApply = (scholarship) => {
    toast({
      title: "Redirecting to application",
      description: `Opening ${scholarship.title} application form...`,
      variant: "default"
    });
    // In a real app, this would redirect to the scholarship application page
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Scholarships</h1>
              <p className="text-gray-600">
                Find the perfect scholarship opportunities tailored to your profile
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-600">
              <span>{filteredScholarships.length} scholarships found</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="text-amber-700 hover:text-amber-600 text-sm transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search scholarships..."
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-lg"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-amber-600 focus:ring-amber-500 bg-transparent border-gray-400"
                      />
                      <span className="text-gray-700 text-sm capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <div className="space-y-2">
                  {types.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="text-amber-600 focus:ring-amber-500 bg-transparent border-gray-400"
                      />
                      <span className="text-gray-700 text-sm capitalize">
                        {type === 'all' ? 'All Types' : type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="lg:col-span-3">
            {filteredScholarships.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No scholarships found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="glass-button px-6 py-2 rounded-lg"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredScholarships.map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className="glass glass-card rounded-2xl p-6 relative animate-slide-up"
                  >
                    {/* Featured Badge */}
                    {scholarship.featured && (
                      <div className="absolute top-4 right-4">
                        <div className="glass-purple px-3 py-1 rounded-full flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-600 fill-current" />
                          <span className="text-xs font-medium text-yellow-700">Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmark(scholarship.id)}
                      className={`absolute top-4 left-4 p-2 rounded-lg transition-all duration-200 ${
                        bookmarkedScholarships.has(scholarship.id)
                          ? 'text-amber-700 bg-amber-100/50'
                          : 'text-gray-600 hover:text-amber-700 hover:bg-amber-100/30'
                      }`}
                    >
                      <Bookmark 
                        className={`h-4 w-4 ${
                          bookmarkedScholarships.has(scholarship.id) ? 'fill-current' : ''
                        }`} 
                      />
                    </button>

                    <div className="mt-8 mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 pr-16">
                        {scholarship.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{scholarship.provider}</p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        {scholarship.description}
                      </p>
                    </div>

                    {/* Scholarship Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-semibold">{scholarship.amount}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-yellow-600" />
                        <span className="text-gray-700 text-sm">
                          Due: {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 text-sm">{scholarship.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                        <span className="text-gray-700 text-sm">{scholarship.type}</span>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.requirements.map((req, index) => (
                          <span
                            key={index}
                            className="glass-dark px-3 py-1 rounded-full text-xs text-gray-700"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleApply(scholarship)}
                        className="glass-button flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Apply Now</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;