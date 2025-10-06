import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Book, 
  Calendar, 
  MapPin, 
  Edit3,
  Save,
  X,
  Camera
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    major: user?.major || '',
    gpa: user?.gpa || '',
    graduationYear: user?.graduationYear || '',
    bio: user?.bio || '',
    location: user?.location || '',
    interests: user?.interests || [],
    achievements: user?.achievements || []
  });

  const [newInterest, setNewInterest] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() && !editedProfile.interests.includes(newInterest.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addAchievement = (e) => {
    e.preventDefault();
    if (newAchievement.trim()) {
      setEditedProfile(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };

  const removeAchievement = (achievement) => {
    setEditedProfile(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a !== achievement)
    }));
  };

  const handleSave = () => {
    updateProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
      variant: "default"
    });
  };

  const handleCancel = () => {
    setEditedProfile({
      name: user?.name || '',
      email: user?.email || '',
      university: user?.university || '',
      major: user?.major || '',
      gpa: user?.gpa || '',
      graduationYear: user?.graduationYear || '',
      bio: user?.bio || '',
      location: user?.location || '',
      interests: user?.interests || [],
      achievements: user?.achievements || []
    });
    setIsEditing(false);
  };

  const mockInterests = ['Computer Science', 'Artificial Intelligence', 'Software Engineering', 'Research'];
  const mockAchievements = ['Dean\'s List Fall 2023', 'Hackathon Winner 2024', 'Research Assistant'];

  // Use mock data if user data is empty
  const displayData = {
    ...editedProfile,
    interests: editedProfile.interests.length > 0 ? editedProfile.interests : mockInterests,
    achievements: editedProfile.achievements.length > 0 ? editedProfile.achievements : mockAchievements,
    bio: editedProfile.bio || 'Computer Science student passionate about artificial intelligence and machine learning. Currently working on research projects in natural language processing.',
    location: editedProfile.location || 'Cambridge, MA'
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2 bg-green-500/20 border-green-500/30 text-green-400"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="glass-button px-6 py-3 rounded-xl flex items-center space-x-2 bg-red-500/20 border-red-500/30 text-red-400"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 animate-slide-up">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full border-4 border-white/20 mx-auto"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 glass-blue p-2 rounded-full text-blue-300 hover:text-blue-200 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="glass-input w-full text-center text-xl font-bold mb-2 rounded-lg"
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-white mb-2">{displayData.name}</h2>
                )}
                
                <p className="text-gray-400 mb-4">{displayData.major} Student</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">{displayData.university}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Class of {displayData.graduationYear}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-purple-400" />
                    <span className="text-gray-300">{displayData.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="glass rounded-2xl p-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="glass-input w-full p-3 rounded-lg"
                      placeholder="Email address"
                    />
                  ) : (
                    <div className="glass-dark p-3 rounded-lg flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{displayData.email}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">University</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="university"
                      value={editedProfile.university}
                      onChange={handleInputChange}
                      className="glass-input w-full p-3 rounded-lg"
                      placeholder="University name"
                    />
                  ) : (
                    <div className="glass-dark p-3 rounded-lg flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{displayData.university}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Major</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="major"
                      value={editedProfile.major}
                      onChange={handleInputChange}
                      className="glass-input w-full p-3 rounded-lg"
                      placeholder="Field of study"
                    />
                  ) : (
                    <div className="glass-dark p-3 rounded-lg flex items-center space-x-2">
                      <Book className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{displayData.major}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GPA</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="gpa"
                      value={editedProfile.gpa}
                      onChange={handleInputChange}
                      className="glass-input w-full p-3 rounded-lg"
                      placeholder="3.8"
                    />
                  ) : (
                    <div className="glass-dark p-3 rounded-lg">
                      <span className="text-gray-300">{displayData.gpa}/4.0</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="glass-input w-full p-3 rounded-lg"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="glass-dark p-3 rounded-lg">
                    <p className="text-gray-300 leading-relaxed">{displayData.bio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="glass rounded-2xl p-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-white mb-6">Interests</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {displayData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="glass-blue px-3 py-2 rounded-full text-sm text-blue-300 flex items-center space-x-2"
                  >
                    <span>{interest}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeInterest(interest)}
                        className="text-blue-300 hover:text-red-400 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <form onSubmit={addInterest} className="flex space-x-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest..."
                    className="glass-input flex-1 p-2 rounded-lg text-sm"
                  />
                  <button
                    type="submit"
                    className="glass-button px-4 py-2 rounded-lg text-sm"
                  >
                    Add
                  </button>
                </form>
              )}
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-6 animate-slide-up">
              <h3 className="text-lg font-semibold text-white mb-6">Achievements</h3>
              
              <div className="space-y-3 mb-4">
                {displayData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="glass-dark p-3 rounded-lg flex items-center justify-between"
                  >
                    <span className="text-gray-300">{achievement}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeAchievement(achievement)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {isEditing && (
                <form onSubmit={addAchievement} className="flex space-x-2">
                  <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add an achievement..."
                    className="glass-input flex-1 p-2 rounded-lg text-sm"
                  />
                  <button
                    type="submit"
                    className="glass-button px-4 py-2 rounded-lg text-sm"
                  >
                    Add
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;