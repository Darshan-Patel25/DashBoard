import React from 'react'

export default function HowItWorks() {
    return (
      <div className="min-h-screen bg-white">
        {/* Custom styles */}
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .fade-in-section {
            opacity: 0;
            animation: fadeIn 0.5s ease-in forwards;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .delay-1 { animation-delay: 0.2s; }
          .delay-2 { animation-delay: 0.4s; }
          .delay-3 { animation-delay: 0.6s; }
          .delay-4 { animation-delay: 0.8s; }
        `}</style>
  
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 font-[Inter]">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#C4462D] tracking-tight">
            The top social media trends for 2025
          </h1>
  
          <div className="space-y-12">
            {/* Content Experimentation Trends */}
            <section className="fade-in-section delay-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Content Experimentation Trends:</h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div>
                    <span className="font-semibold text-gray-900">The Creative Disruption Trend: </span>
                    <span className="text-gray-700">
                      Social teams ditch brand consistency to push creative boundaries
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">The Outbound Engagement Trend: </span>
                    <span className="text-gray-700">Brands drop in on creators' comments to pick up new audiences</span>
                  </div>
                </div>
              </div>
            </section>
  
            {/* Social Listening Trends */}
            <section className="fade-in-section delay-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Social Listening Trends:</h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div>
                    <span className="font-semibold text-gray-900">The Social Performance Trend: </span>
                    <span className="text-gray-700">
                      Listening launches social pros into their performance marketing era
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">The Micro-Virality Trend: </span>
                    <span className="text-gray-700">Social listening refines the art of trendjacking</span>
                  </div>
                </div>
              </div>
            </section>
  
            {/* AI Trends */}
            <section className="fade-in-section delay-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. AI Trends:</h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div>
                    <span className="font-semibold text-gray-900">The AI Content Trend: </span>
                    <span className="text-gray-700">Generative AI is off probation and officially on the team</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">The AI Strategy Trend: </span>
                    <span className="text-gray-700">Social media strategists get a new thought partner</span>
                  </div>
                </div>
              </div>
            </section>
  
            {/* Video Section */}
            <section className="fade-in-section delay-4 mt-8">
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="Hootsuite Trends 25"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
  