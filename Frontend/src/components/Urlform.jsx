import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from '../main'

const Urlform = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState("");
  const {isAuthenticated} = useSelector((state) => state.auth)
  console.log(isAuthenticated);
  
  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url,customSlug);
      setShortUrl(shortUrl);
      queryClient.invalidateQueries({queryKey:['userUrls']})
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onInput={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Shorten URL
      </button>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {isAuthenticated  && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium break-all underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Urlform;
