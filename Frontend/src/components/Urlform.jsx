import React, { useState } from "react";
import axios from "axios";

const Urlform = () => {
  const [url, setUrl] = useState("");
  const [shortUrl,setShortUrl] = useState()
  const handleSubmit = async () => {
    const {data} = await axios.post("http://localhost:3000/api/create", { url });
    setShortUrl(data)
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

      {/* {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
            </div>
        )} */}

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
