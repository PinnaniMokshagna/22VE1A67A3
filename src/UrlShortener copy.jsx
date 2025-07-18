import React, { useState } from 'react';

function generateShortId() {
  return Math.random().toString(36).substring(2, 8);
}

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [urlList, setUrlList] = useState([]);

  const handleShorten = () => {
    if (!longUrl.startsWith('http')) {
      alert('Please enter a valid URL starting with http or https');
      return;
    }

    const shortId = generateShortId();
    const shortUrl = `https://short.ly/${shortId}`;
    setUrlList([...urlList, { longUrl, shortUrl }]);
    setLongUrl('');
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('Short URL copied to clipboard!');
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-4">
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter long URL..."
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />
      <button
        onClick={handleShorten}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Shorten URL
      </button>

      <div className="mt-6">
        {urlList.map((urlObj, index) => (
          <div key={index} className="mb-4 p-2 border rounded bg-gray-50">
            <p className="text-sm text-gray-700">Original: <a href={urlObj.longUrl} className="text-blue-700" target="_blank" rel="noreferrer">{urlObj.longUrl}</a></p>
            <p className="text-sm">Short: <span className="text-green-700">{urlObj.shortUrl}</span></p>
            <button
              onClick={() => handleCopy(urlObj.shortUrl)}
              className="mt-1 text-sm text-blue-600 hover:underline"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrlShortener;
