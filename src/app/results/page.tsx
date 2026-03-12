'use client';

import Link from 'next/link';
import { BarChart3, AlertCircle, CheckCircle, TrendingUp, Download } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface ResponseFeedback {
  questionIndex: number;
  question: string;
  score: number;
  sentiment: 'positive' | 'neutral' | 'needs_improvement';
  keywords: string[];
  suggestions: string[];
  fillerWords: number;
  grammarScore: number;
}

const SAMPLE_FEEDBACK: ResponseFeedback[] = [
  {
    questionIndex: 0,
    question: 'Tell me about yourself and your professional background.',
    score: 82,
    sentiment: 'positive',
    keywords: ['experienced', 'projects', 'technologies', 'team'],
    suggestions: [
      'Great introduction! Try to be more specific about your impact and measurable results.',
      'Consider mentioning 2-3 key achievements upfront.',
    ],
    fillerWords: 2,
    grammarScore: 95,
  },
  {
    questionIndex: 1,
    question: 'What are your strengths and how do they apply to this role?',
    score: 75,
    sentiment: 'neutral',
    keywords: ['problem-solving', 'communication', 'leadership'],
    suggestions: [
      'Connect your strengths more directly to the job requirements.',
      'Provide concrete examples from past projects.',
    ],
    fillerWords: 5,
    grammarScore: 88,
  },
  {
    questionIndex: 2,
    question: 'Describe a challenging project you worked on and how you overcame obstacles.',
    score: 88,
    sentiment: 'positive',
    keywords: ['overcame', 'solution', 'collaborative', 'delivered'],
    suggestions: ['Excellent use of the STAR method!', 'Consider adding the business impact.'],
    fillerWords: 1,
    grammarScore: 97,
  },
];

export default function ResultsPage() {
  const overallScore = Math.round(
    SAMPLE_FEEDBACK.reduce((sum, item) => sum + item.score, 0) / SAMPLE_FEEDBACK.length
  );

  const averageFillerWords = Math.round(
    SAMPLE_FEEDBACK.reduce((sum, item) => sum + item.fillerWords, 0) / SAMPLE_FEEDBACK.length
  );

  const averageGrammar = Math.round(
    SAMPLE_FEEDBACK.reduce((sum, item) => sum + item.grammarScore, 0) / SAMPLE_FEEDBACK.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Session Results</h1>
          <p className="text-lg text-gray-900">Your detailed feedback and analysis</p>
        </div>

        {/* Overall Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{overallScore}</div>
            <p className="text-gray-700 font-semibold">Overall Score</p>
            <div className="mt-4 flex justify-center">
              {overallScore >= 80 ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              )}
            </div>
          </div>

          {/* Grammar Score */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">{averageGrammar}</div>
            <p className="text-gray-700 font-semibold">Grammar Score</p>
            <p className="text-sm text-gray-900 mt-2">Clear communication</p>
          </div>

          {/* Filler Words */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-purple-600 mb-2">{averageFillerWords}</div>
            <p className="text-gray-700 font-semibold">Avg Filler Words</p>
            <p className="text-sm text-gray-900 mt-2">Per response</p>
          </div>

          {/* Confidence */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 text-center">
            <div className="text-5xl font-bold text-orange-600 mb-2">72%</div>
            <p className="text-gray-700 font-semibold">Confidence </p>
            <p className="text-sm text-gray-900 mt-2">Score rating</p>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Question Breakdown</h2>
          <div className="space-y-6">
            {SAMPLE_FEEDBACK.map((feedback) => (
              <div
                key={feedback.questionIndex}
                className={`bg-white rounded-xl shadow-lg p-8 border-l-4 ${
                  feedback.sentiment === 'positive'
                    ? 'border-green-500'
                    : feedback.sentiment === 'neutral'
                      ? 'border-yellow-500'
                      : 'border-red-500'
                }`}
              >
                {/* Question */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">Question {feedback.questionIndex + 1}</h3>
                    <span className={`text-2xl font-bold ${
                      feedback.sentiment === 'positive'
                        ? 'text-green-600'
                        : feedback.sentiment === 'neutral'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}>
                      {feedback.score}%
                    </span>
                  </div>
                  <p className="text-gray-700">{feedback.question}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-900 mb-1">Grammar</div>
                    <div className="text-2xl font-bold text-gray-900">{feedback.grammarScore}%</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-900 mb-1">Filler Words</div>
                    <div className="text-2xl font-bold text-gray-900">{feedback.fillerWords}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg col-span-2">
                    <div className="text-sm text-gray-900 mb-2">Keywords Detected</div>
                    <div className="flex gap-2 flex-wrap">
                      {feedback.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-3">💡 Suggestions for Improvement</h4>
                  <ul className="space-y-2">
                    {feedback.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-blue-800 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Suggestions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Overall Recommendations</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Excellent structure - keep using the STAR method for behavioral questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Work on reducing filler words (um, uh, like) - practice breathing techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Your grammar and language proficiency is strong - maintain that momentum</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Practice more technical questions in your domain to boost confidence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Report
          </button>
          <Link
            href="/prepare"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Practice Again
          </Link>
          <Link
            href="/dashboard"
            className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
