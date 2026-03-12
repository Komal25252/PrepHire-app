'use client';

import { useState } from 'react';
import { User, Mail, Phone, Briefcase, MapPin, Download, Save } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'Software Engineer',
    targetRole: 'Senior Frontend Engineer',
    bio: 'Passionate about building user-friendly applications and continuous learning.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-lg text-gray-900">Manage your account and interview preferences</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isEditing
                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
              <p className="text-gray-900">{formData.jobTitle}</p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Change Avatar
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Current Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Current Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Target Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Target Role
                  </label>
                  <input
                    type="text"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 resize-none disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {(['JavaScript', 'React', 'TypeScript', 'Node.js', 'SQL', 'CSS', 'HTML'].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm"
              >
                {skill}
              </span>
            )))}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Interview Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <label className="text-gray-700 font-semibold">Email Notifications</label>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <label className="text-gray-700 font-semibold">Weekly Progress Report</label>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <label className="text-gray-700 font-semibold">Allow Resource Sharing</label>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Account Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Download className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Download My Data</p>
                <p className="text-sm text-gray-900">Export your interview history and progress</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 p-4 border border-red-200 rounded-lg hover:bg-red-50 transition">
              <div className="w-5 h-5 text-red-600 flex items-center justify-center">✕</div>
              <div className="text-left">
                <p className="font-semibold text-red-600">Delete Account</p>
                <p className="text-sm text-gray-900">Permanently remove your account and data</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
