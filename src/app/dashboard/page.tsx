'use client';

import Link from 'next/link';
import { Calendar, TrendingUp, Award, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface SessionData {
  id: string;
  date: string;
  domain: string;
  difficulty: string;
  score: number;
  duration: string;
  status: 'completed' | 'in_progress';
}

const SAMPLE_SESSIONS: SessionData[] = [
  {
    id: '1',
    date: '2026-02-18',
    domain: 'Frontend Development',
    difficulty: 'Moderate',
    score: 82,
    duration: '18 mins',
    status: 'completed',
  },
  {
    id: '2',
    date: '2026-02-17',
    domain: 'Data Science',
    difficulty: 'Hard',
    score: 76,
    duration: '22 mins',
    status: 'completed',
  },
  {
    id: '3',
    date: '2026-02-15',
    domain: 'Backend Development',
    difficulty: 'Easy',
    score: 88,
    duration: '15 mins',
    status: 'completed',
  },
  {
    id: '4',
    date: '2026-02-14',
    domain: 'Full Stack Development',
    difficulty: 'Moderate',
    score: 80,
    duration: '20 mins',
    status: 'completed',
  },
];

export default function DashboardPage() {
  const averageScore = Math.round(
    SAMPLE_SESSIONS.reduce((sum, session) => sum + session.score, 0) / SAMPLE_SESSIONS.length
  );

  const totalSessions = SAMPLE_SESSIONS.length;
  const highestScore = Math.max(...SAMPLE_SESSIONS.map((s) => s.score));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress Dashboard</h1>
          <p className="text-lg text-gray-900">Track your interview preparation journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Sessions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Sessions</h3>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900">{totalSessions}</div>
            <p className="text-sm text-gray-900 mt-2">Completed interviews</p>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Average Score</h3>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900">{averageScore}%</div>
            <p className="text-sm text-gray-900 mt-2">Your performance level</p>
          </div>

          {/* Highest Score */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Highest Score</h3>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900">{highestScore}%</div>
            <p className="text-sm text-gray-900 mt-2">Your best interview</p>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Current Streak</h3>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-4xl font-bold text-gray-900">4</div>
            <p className="text-sm text-gray-900 mt-2">Days consecutive</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Score Trend */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Score Trend</h2>
            <div className="h-64 flex items-end gap-2">
              {[82, 76, 88, 80].map((score, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                    style={{ height: `${(score / 100) * 100}%` }}
                  />
                  <div className="text-xs text-gray-900 mt-2">{score}%</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-900 mt-4">
              <span>18 Feb</span>
              <span>17 Feb</span>
              <span>15 Feb</span>
              <span>14 Feb</span>
            </div>
          </div>

          {/* Domain Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice by Domain</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Frontend Development</span>
                  <span className="text-sm font-semibold text-gray-700">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Data Science</span>
                  <span className="text-sm font-semibold text-gray-700">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Backend Development</span>
                  <span className="text-sm font-semibold text-gray-700">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Full Stack Development</span>
                  <span className="text-sm font-semibold text-gray-700">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Sessions</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Domain</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Score</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_SESSIONS.map((session) => (
                    <tr key={session.id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">{session.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{session.domain}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            session.difficulty === 'Easy'
                              ? 'bg-green-100 text-green-800'
                              : session.difficulty === 'Moderate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {session.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="font-bold text-gray-900">{session.score}%</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{session.duration}</td>
                      <td className="px-6 py-4 text-sm">
                        <Link href="/results" className="text-blue-600 hover:text-blue-800 font-semibold">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/prepare"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Start New Practice Session
          </Link>
        </div>
      </div>
    </div>
  );
}
