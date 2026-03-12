'use client';

import { useState, useEffect } from 'react';
import { Pause, Mic, StopCircle, ChevronRight, SkipForward } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: 'easy' | 'moderate' | 'hard';
}

const SAMPLE_QUESTIONS: Question[] = Array(5).fill(null).map((_, i) => ({
  id: i + 1,
  text: '',
  category: '',
  difficulty: 'easy',
}));

export default function InterviewPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [responses, setResponses] = useState<string[]>(Array(SAMPLE_QUESTIONS.length).fill(''));
  const [status, setStatus] = useState<'active' | 'reviewing' | 'completed'>('active');

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };
//record
  const handleStopRecording = () => {
    setIsRecording(false);
    setResponses((prev) => {
      const newResponses = [...prev];
      newResponses[currentQuestionIndex] = `[Recording: ${formatTime(recordingTime)}] Sample response to: "${currentQuestion.text}"`;
      return newResponses;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setRecordingTime(0);
    } else {
      setStatus('reviewing');
    }
  };

  const handleSkipQuestion = () => {
    handleNextQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {status === 'active' && (
          <div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-gray-900">
                  Question {currentQuestionIndex + 1} of {SAMPLE_QUESTIONS.length}
                </h2>
                <span className="text-sm text-gray-900 bg-white px-3 py-1 rounded-full">
                  {Math.round(((currentQuestionIndex + 1) / SAMPLE_QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / SAMPLE_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900">{currentQuestion.text}</h2>
              </div>

              {/* Interview Tips */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                <p className="text-sm text-blue-900">
                  💡 <strong>Tip:</strong> Take a moment to think before answering. Speak clearly and provide specific examples.
                </p>
              </div>

              {/* Recording Section */}
              <div className="border-2 border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">Your Response</h3>
                    <p className="text-sm text-gray-900">Record your answer (max 2 minutes)</p>
                  </div>
                  <div className="text-2xl font-mono font-bold text-gray-900">
                    {formatTime(recordingTime)}
                  </div>
                </div>

                {responses[currentQuestionIndex] && (
                  <div className="bg-white border border-green-200 rounded p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600">✓ Recorded</span>
                    </div>
                    <p className="text-sm text-gray-700">{responses[currentQuestionIndex]}</p>
                  </div>
                )}

                {/* Recording Controls */}
                <div className="flex gap-3">
                  {!isRecording ? (
                    <>
                      <button
                        onClick={handleStartRecording}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                      >
                        <Mic className="w-5 h-5" />
                        Start Recording
                      </button>
                      <button
                        onClick={handleSkipQuestion}
                        className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                      >
                        <SkipForward className="w-5 h-5" />
                        Skip
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleStopRecording}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition"
                      >
                        <StopCircle className="w-5 h-5" />
                        Stop Recording
                      </button>
                      <button
                        onClick={handleStopRecording}
                        className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                      >
                        <Pause className="w-5 h-5" />
                        Pause
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!responses[currentQuestionIndex]}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition"
                >
                  {currentQuestionIndex === SAMPLE_QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {status === 'reviewing' && (
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Session Complete!</h1>
            <p className="text-xl text-gray-900 mb-8">Your responses are being analyzed. Redirecting to results...</p>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="animate-pulse flex items-center gap-3 justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
              <p className="text-center text-gray-900 mt-4">Analyzing your responses...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
