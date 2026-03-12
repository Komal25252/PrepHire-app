import Link from "next/link";
import { Sparkles, Zap, BarChart3, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI-Powered Practice</span>
            </h1>
            <p className="text-xl text-gray-900 mb-8">
              Get real-time feedback, personalized coaching, and build confidence for your next big interview.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/prepare"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
              >
                Start Practicing
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-20 h-20 text-purple-600 mx-auto mb-4" />
              <p className="text-gray-900 text-lg">Interactive Interview Simulation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Why Choose PrepHire?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">AI-Powered Analysis</h3>
              <p className="text-gray-700">Get instant feedback on your responses with keyword matching and grammar checking</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Progress Tracking</h3>
              <p className="text-gray-700">Monitor your improvement with detailed analytics and performance metrics</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="bg-green-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Personalized Questions</h3>
              <p className="text-gray-700">Practice with questions tailored to your resume and target job domain</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="bg-orange-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Real-Time Feedback</h3>
              <p className="text-gray-700">Receive actionable suggestions for improvement after each session</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Ace Your Interview?</h2>
          <p className="text-xl mb-8 opacity-90">Start practicing today and get personalized feedback</p>
          <Link
            href="/prepare"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition"
          >
            Begin Practice Session
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 PrepHire. Master your interviews with AI-powered practice.</p>
        </div>
      </footer>
    </div>
  );
}
