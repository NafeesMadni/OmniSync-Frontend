'use client';

import { API_BASE_URL } from '@/app/utils/config';
import { useState } from 'react';

export default function YouTubeHashtagGenerator() {
  const [videoTopic, setVideoTopic] = useState('');
  const [videoLang, setVideoLang] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowResult(false);
    setShowError(false);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/youtube/hashtag-generator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang: videoLang,
          topic: videoTopic,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.message);
        setShowError(true);
      } else {
        setHashtags(data.data || "No hashtags generated.");
        setShowResult(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while generating the hashtag. Please try again.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyHashtags = () => {
    navigator.clipboard.writeText(hashtags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Main Container */}
        <div className="space-y-6 p-6 bg-gradient-to-b from-sky-950/50 to-slate-900/50 rounded-xl border border-sky-400/30 backdrop-blur-sm">
          <div className="text-center space-y-3 mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#00f2ea]/10 rounded-2xl">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0, 211, 243, 0.4))" }}
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                >
                  <path
                    fill="#00d3f3"
                    d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
                  />
                  <path
                    fill="white"
                    d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              YouTube Hashtag Generator
            </h1>
            <p className="text-slate-400 text-xs md:text-sm lg:text-base max-w-xl mx-auto">
              Generate effective hashtags for your YouTube videos
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="videoTopic"
                className="flex items-center gap-2 text-gray-200 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                Video Topic
              </label>
              <input
                type="text"
                id="videoTopic"
                value={videoTopic}
                onChange={(e) => setVideoTopic(e.target.value)}
                placeholder="e.g., AI Tools, Travel Vlog, Cooking Tutorial"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 text-white placeholder-gray-500 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="videoLang"
                className="flex items-center gap-2 text-gray-200 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                Video Language
              </label>
              <input
                type="text"
                id="videoLang"
                value={videoLang}
                onChange={(e) => setVideoLang(e.target.value)}
                placeholder="e.g., en, ur, it"
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 text-white placeholder-gray-500 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-400/20 active:scale-[0.98] flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate Hashtags
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {showResult && (
          <div className="mt-8 p-6 bg-gradient-to-b from-sky-950/50 to-slate-900/50 rounded-xl border border-sky-400/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Generated Hashtags
                </h2>
              </div>
              <button
                onClick={copyHashtags}
                className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 flex items-center gap-2 text-sm"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-2">
              {hashtags}
            </div>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/50 rounded-xl">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-semibold">Error</span>
            </div>
            <p className="text-red-300" dangerouslySetInnerHTML={{ __html: error }}></p>
          </div>
        )}
      </div>
      <style jsx global>{`
        li::marker {
          color: rgb(0, 211, 243);
        }
      `}</style>
    </div>
  );
}
