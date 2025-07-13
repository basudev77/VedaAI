import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Chat() {
  const [username, setUsername] = useState("");
  const [stream, setStream] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const outputRef = useRef(null);

  const formatToMarkdown = (raw) => {
    if (!raw) return "";
    let formatted = raw
      .replace(/\r\n|\r/g, "\n")
      .replace(/(\w)\.(\w)/g, "$1§DOT§$2")
      .replace(/([a-z0-9])\.(\s*)([A-Z])/g, "$1.\n\n$3")
      .replace(/§DOT§/g, ".")
      .replace(/^([A-Z][^\n]{3,})\n/gm, "\n### $1\n")
      .replace(/:\s*\n(?=\w)/g, ":\n- ")
      .replace(/^\s*[\*\-]\s+/gm, "- ")
      .replace(/^(#+ .+)/gm, "\n$1\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+$/gm, "")
      .trim();
    return formatted;
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [stream]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/getme", {
          withCredentials: true,
        });
        setUsername(res.data?.username || "Guest");
      } catch (err) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const handleSubmitPrompt = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStream("");
    setIsStreaming(true);
    setError("");

    const eventSource = new EventSource(
      `/api/chat/generate?q=${encodeURIComponent(query)}`
    );

    eventSource.onmessage = (event) => {
      const rawText = event.data;
      const markdownText = formatToMarkdown(rawText);
      setStream((prev) => prev + "\n" + markdownText);
    };

    eventSource.addEventListener("done", () => {
      eventSource.close();
      setIsStreaming(false);
    });

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      setError("Something went wrong. Please try again.");
      eventSource.close();
      setIsStreaming(false);
    };

    setQuery("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Chat Main Content */}
      <main className="flex flex-1 flex-col items-center px-6 py-10">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Welcome, {username}!
        </h2>

        <form
          onSubmit={handleSubmitPrompt}
          className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-4 mb-6"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask VedaAI about Ayurveda, wellness, health..."
            className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:border-green-700 focus:ring-green-700 focus:ring-2 placeholder-gray-400 transition"
            disabled={isStreaming}
          />
          <button
            type="submit"
            disabled={isStreaming}
            className={`px-6 py-3 rounded-md font-semibold transition ${
              isStreaming
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-green-700 hover:bg-green-800 text-white"
            }`}
          >
            {isStreaming ? "Thinking..." : "Send"}
          </button>
        </form>

        {error && (
          <div className="w-full max-w-3xl mb-4 p-3 bg-red-500 text-white rounded-md text-sm">
            {error}
          </div>
        )}

        <div
          ref={outputRef}
          className="w-full max-w-3xl h-[65vh] overflow-y-auto border border-green-700 rounded-md p-6 bg-gray-50 prose"
        >
          {stream ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{stream}</ReactMarkdown>
          ) : (
            <p className="text-gray-500">
              Start your Ayurveda journey — ask anything!
            </p>
          )}
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-200">
        &copy; {new Date().getFullYear()} VedaAI · All rights reserved.
      </footer>
    </div>
  );
}

export default Chat;
