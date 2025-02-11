import React from 'react';

const About3 = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 font-serif">
      {/* Header Section */}
      <header className="mb-6 mt-20">
        <h1 className="text-5xl font-bold">
          <span className="block text-black">PROJECT</span>
          <span className="block text-[#3C5BBF]">CASE STUDY</span>
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col gap-8">
        {/* Intro Section */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-medium italic text-gray-800 mb-6">
            Turning Data into Decisions: Why We Chose This Challenge!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Social media has evolved beyond just connecting people—it’s now a driving force behind influence, brand growth, and business success. But with millions of interactions happening every second, making sense of the data isn’t easy. Businesses, creators, and marketers often struggle to extract meaningful insights from the endless stream of engagement metrics, trends, and audience sentiments.
          </p>
        </div>

        {/* Sections Container */}
        <div className="flex gap-8 flex-wrap">
          {/* Project Overview */}
          <div className="flex-1 bg-[#3D3A3D] text-white p-8 rounded-2xl relative pt-12">
            <h3 className="text-white mb-8 text-xl">Project Overview</h3>
            <p>
              Social media is a powerful tool, but understanding its data can be overwhelming. Our dashboard simplifies this by providing real-time engagement tracking, sentiment analysis, trend identification, and competitor insights—all in one place.
            </p>
            <p className="mt-4">
              With automated post scheduling, deep analytics, and a Telegram bot for instant updates, we turn raw data into actionable insights. Our goal is to help businesses, creators, and marketers make smarter, data-driven decisions effortlessly.
            </p>
          </div>

          {/* Right Sections */}
          <div className="flex-2 flex flex-col gap-8">
            {/* Challenge Section */}
            <div className="relative p-8 pt-12 bg-gray-100 rounded-xl">
              <h3 className="text-xl text-gray-800 mb-4">Challenge</h3>
              <p className="text-gray-600 leading-relaxed">
                Social media analytics is a maze—vast amounts of data, scattered metrics, and unclear insights make it difficult for users to make informed decisions. Navigating this complexity often leaves businesses and creators struggling to stay relevant and competitive in a rapidly changing digital world.
              </p>
            </div>

            {/* Solution Section */}
            <div className="relative p-8 pt-12 bg-gray-100 rounded-xl">
              <h3 className="text-xl text-gray-800 mb-4">Project Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered social media analytics dashboard provides a simple yet powerful solution for tracking real-time engagement, understanding audience sentiment, identifying trends, and analyzing competitors—all in one place. With automated post scheduling, in-depth analytics, and a Telegram bot for instant updates, we turn complex data into clear, actionable insights, helping users make smarter decisions and stay ahead in today’s fast-paced digital world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About3;