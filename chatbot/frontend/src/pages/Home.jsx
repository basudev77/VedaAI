import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      

      {/* Hero */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 py-20">
        <div className="flex-1 mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold mb-6">
            Discover Ayurveda Wisdom <br /> Powered by AI
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            VedaAI is your trusted assistant for all things Ayurveda. Get instant answers about natural remedies, herbs, and wellness — anytime, anywhere.
          </p>
          <Link
            to="/chat"
            className="inline-block bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-4 rounded-md shadow"
          >
            Start Chatting Now
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="./logo.jpg"
            alt="Ayurveda herbs"
            className="w-full max-w-lg rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How VedaAI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Ask Anything</h3>
              <p className="text-gray-600">
                From herbal treatments to daily wellness tips, ask VedaAI any Ayurveda-related question.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Get Instant Answers</h3>
              <p className="text-gray-600">
                VedaAI understands your queries and provides expert-level insights using modern AI.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Live Naturally</h3>
              <p className="text-gray-600">
                Apply ancient wisdom in your daily life to stay balanced, healthy, and connected with nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} VedaAI · All rights reserved.
      </footer>
    </main>
  );
}
