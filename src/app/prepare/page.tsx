'use client';

import { useState } from 'react';
import { Upload, Briefcase, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useSession, signIn } from 'next-auth/react';

const JOB_DOMAINS = [
  { id: 'frontend', name: 'Frontend Development' },
  { id: 'backend', name: 'Backend Development' },
  { id: 'fullstack', name: 'Full Stack Development' },
  { id: 'data_science', name: 'Data Science' },
  { id: 'devops', name: 'DevOps/Cloud' },
  { id: 'product', name: 'Product Management' },
  { id: 'design', name: 'UI/UX Design' },
  { id: 'qa', name: 'QA/Testing' },
];

export default function PreparePage() {
  const { data: session } = useSession();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [step, setStep] = useState<'selection' | 'difficulty'>('selection');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'hard' | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleStartInterview = () => {
    if ((selectedDomain || resumeFile) && difficulty) {
      sessionStorage.setItem('prepareData', JSON.stringify({
        domain: selectedDomain,
        hasResume: !!resumeFile,
        difficulty,
      }));

      if (!session) {
        // Dispatch custom event to open the auth modal in Navigation
        window.dispatchEvent(new Event('openAuthModal'));
      } else {
        window.location.href = '/interview';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Selection */}
        {step === 'selection' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Prepare Your Interview</h1>
            <p className="text-xl text-black mb-12">Choose how you want to get started</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Resume Upload */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-dashed border-blue-300 hover:border-blue-500 transition cursor-pointer">
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-16 h-16 text-blue-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-black">Upload Your Resume</h3>
                    <p className="text-black text-center mb-4">
                      We&apos;ll analyze your skills and create personalized questions based on your experience
                    </p>
                    {resumeFile && (
                      <div className="bg-green-50 border border-green-200 rounded p-3 w-full text-center">
                        <p className="text-green-700 font-semibold text">✓ {resumeFile.name}</p>
                      </div>
                    )}
                    {!resumeFile && (
                      <p className="text-sm text-black">PDF, DOC, or DOCX (Max 5MB)</p>
                    )}
                  </div>
                </label>
              </div>

              {/* Job Domain Selection */}
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black">
                  <Briefcase className="w-6 h-6" />
                  Or Select a Job Domain
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {JOB_DOMAINS.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`p-4 rounded-lg border-2 transition font-semibold text-black ${selectedDomain === domain.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                        }`}
                    >
                      {/* <span className="text-2xl block mb-2">{domain.icon}</span> */}
                      <span className="text-sm">{domain.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-12 flex justify-end">
              <button
                onClick={() => setStep('difficulty')}
                disabled={!selectedDomain && !resumeFile}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Difficulty Selection */}
        {step === 'difficulty' && (
          <div>
            <button
              onClick={() => setStep('selection')}
              className="text-blue-600 hover:text-blue-700 mb-8 flex items-center gap-2"
            >
              ← Back
            </button>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Select Difficulty Level</h1>
            <p className="text-xl text-gray-900 mb-12">Questions will be adapted to your chosen level</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Easy */}
              <div
                onClick={() => setDifficulty('easy')}
                className={`p-8 rounded-xl border-2 cursor-pointer transition ${difficulty === 'easy'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
              >
                <div className="text-4xl mb-4"></div>
                <h3 className="text-2xl font-bold mb-4 text-green-600">Easy</h3>
                <ul className="space-y-2 text-gray-900">
                  <li>✓ Foundational concepts</li>
                  <li>✓ Common interview questions</li>
                  <li>✓ Lower pace</li>
                </ul>
              </div>

              {/* Moderate */}
              <div
                onClick={() => setDifficulty('moderate')}
                className={`p-8 rounded-xl border-2 cursor-pointer transition ${difficulty === 'moderate'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 bg-white hover:border-yellow-300'
                  }`}
              >
                <div className="text-4xl mb-4"></div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-600">Moderate</h3>
                <ul className="space-y-2 text-gray-900">
                  <li>✓ Practical applications</li>
                  <li>✓ Problem-solving focused</li>
                  <li>✓ Balanced difficulty</li>
                </ul>
              </div>

              {/* Hard */}
              <div
                onClick={() => setDifficulty('hard')}
                className={`p-8 rounded-xl border-2 cursor-pointer transition ${difficulty === 'hard'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-white hover:border-red-300'
                  }`}
              >
                <div className="text-4xl mb-4"></div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">Hard</h3>
                <ul className="space-y-2 text-gray-900">
                  <li>✓ Advanced topics</li>
                  <li>✓ System design questions</li>
                  <li>✓ High challenge</li>
                </ul>
              </div>
            </div>

            {/* Session Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <h3 className="font-bold text-blue-900 mb-4">Your Interview Session</h3>
              <ul className="space-y-2 text-blue-800">
                <li> Questions: 5 questions at {difficulty || 'selected'} difficulty</li>
                <li> Duration: ~15-20 minutes</li>
                <li> Format: Text-based responses with speech recognition</li>
                <li> Feedback: Real-time scoring and suggestions</li>
              </ul>
            </div>

            {/* Start Button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setStep('selection')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleStartInterview}
                disabled={!difficulty}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Start Interview Simulation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
