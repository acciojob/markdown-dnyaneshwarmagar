import React, { useState, useEffect } from 'react';


function App() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const parsedMarkdown = parseMarkdown(markdown);
      setHtml(parsedMarkdown);
      setLoading(false);
    }, 1000); // Simulating loading time
    return () => clearTimeout(timer);
  }, [markdown]);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const parseMarkdown = (markdownText) => {
    // Replace Markdown syntax with HTML equivalents
    let htmlText = markdownText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/# (.*?)\n/g, '<h1>$1</h1>') // Header 1
      .replace(/## (.*?)\n/g, '<h2>$1</h2>') // Header 2
      .replace(/### (.*?)\n/g, '<h3>$1</h3>') // Header 3
      .replace(/#### (.*?)\n/g, '<h4>$1</h4>') // Header 4
      .replace(/##### (.*?)\n/g, '<h5>$1</h5>') // Header 5
      .replace(/###### (.*?)\n/g, '<h6>$1</h6>') // Header 6
      .replace(/\n/g, '<br />'); // Line breaks

    return htmlText;
  };

  return (
    <div className="app">
      <div className="textarea">
        <textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Write your markdown here..."
        ></textarea>
      </div>
      <div className="preview">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        )}
      </div>
    </div>
  );
}

export default App;
