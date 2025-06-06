"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// --- Constants ---
const BOT_MSGS = [
  "Hi, how are you?",
  "Can you describe your daily routine?",
  "What is your favorite movie and why?",
  "Tell me about a hobby you enjoy.",
  "What did you do last weekend?",
  "How do you prepare your favorite dish?",
  "Hello! Let's practice English. Tell me, what did you do today?",
];

const BOT_IMG = "./robopanda.png";
const BOT_NAME = "English Teacher Bot";

// Helper to format time
const formatDate = (date: Date) => {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
};

interface ChatMessage {
  id: number;
  sender?: "user" | "bot";
  name: string;
  img: string;
  side: "left" | "right";
  text: string;
  time: string;
  correction?: string;
  explanation?: string;
  botReplyText?: string;
}

const ChatSection = () => {
  // Access user data from Clerk for profile image
  const { isLoaded, isSignedIn, user } = useUser();

  // Determine user's image and name, fallback to defaults if not available
  const PERSON_IMG =
    isLoaded && isSignedIn && user && user.imageUrl
      ? user.imageUrl
      : "./person.png";
  const PERSON_NAME =
    isLoaded && isSignedIn && user && user.firstName
      ? user.firstName
      : "You";

  // Initialize messages state. Start with a random bot message.
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 0,
      name: BOT_NAME,
      img: BOT_IMG,
      side: "left",
      text: BOT_MSGS[Math.floor(Math.random() * BOT_MSGS.length)],
      time: formatDate(new Date()),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // --- Send Message Function ---
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text) return;

    // 1. Add user's message to the chat
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      name: PERSON_NAME,
      img: PERSON_IMG,
      side: "right",
      text: text,
      time: formatDate(new Date()),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    if (inputRef.current) inputRef.current.value = "";

    // 2. Call your backend API for bot's response
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botResponseRaw: string = data.reply;

      // 3. Parse the structured bot response
      const correctionMatch = botResponseRaw.match(
        /Correction:\s*(.*?)\nExplanation:\s*(.*?)\nReply:\s*(.*)/
      );

      let correction = "";
      let explanation = "";
      let botReply = "";

      if (correctionMatch) {
        correction = correctionMatch[1].trim();
        explanation = correctionMatch[2].trim();
        botReply = correctionMatch[3].trim();
      } else {
        botReply = botResponseRaw;
      }

      let displayMessageText = "";
      if (correction && explanation) {
        displayMessageText += `**Correction:** ${correction}\n\n`;
        displayMessageText += `**Explanation:** ${explanation}\n\n`;
      } else if (correction) {
        displayMessageText += `**Correction:** ${correction}\n\n`;
      }
      displayMessageText += `**Teacher's Reply:** ${botReply}`;

      // 5. Add bot's message to the chat after a short delay for better UX
      const botMsg: ChatMessage = {
        id: messages.length + 2,
        name: BOT_NAME,
        img: BOT_IMG,
        side: "left",
        text: displayMessageText,
        time: formatDate(new Date()),
        correction,
        explanation,
        botReplyText: botReply,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
      }, 700);
    } catch (err) {
      console.error("Failed to get bot reply:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          name: BOT_NAME,
          img: BOT_IMG,
          side: "left",
          text: "Oops! I couldn't process that. Please try again.",
          time: formatDate(new Date()),
        },
      ]);
    }
  };

  // --- Scroll to Bottom Effect ---
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading user data...
      </div>
    );
  }

  return (
    <section
      className="msger w-full h-full max-w-2xl border border-gray-300 rounded-lg shadow-md bg-white flex flex-col"
      style={{ minHeight: "400px" }}
    >
      <header className="msger-header p-4 bg-blue-600 text-white border-b border-gray-300 flex justify-between items-center rounded-t-lg">
        <div className="msger-header-title text-lg font-semibold">
          <i className="fas fa-comment-alt mr-2" /> Duolingo Practice Chat
        </div>
        <div className="msger-header-options"></div>
      </header>

      <main
        className="msger-chat flex-1 overflow-y-auto p-4 space-y-4"
        ref={chatRef}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg flex items-end gap-2 ${
              msg.side === "right" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.side === "left" && (
              <div
                className="msg-img w-10 h-10 bg-cover bg-center rounded-full flex-shrink-0"
                style={{ backgroundImage: `url(${msg.img})` }}
              ></div>
            )}
            <div
              className={`msg-bubble p-3 rounded-lg max-w-[75%] ${
                msg.side === "right"
                  ? "bg-blue-500 text-white order-last"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div
                className={`msg-info text-xs ${
                  msg.side === "right" ? "text-blue-200" : "text-gray-500"
                } flex justify-between mb-1`}
              >
                <span className="msg-info-name font-semibold">{msg.name}</span>
                <span className="msg-info-time">{msg.time}</span>
              </div>
              <div className="msg-text text-sm whitespace-pre-wrap">
                {msg.text.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.text.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
            {msg.side === "right" && (
              <div
                className="msg-img w-10 h-10 bg-cover bg-center rounded-full flex-shrink-0"
                style={{ backgroundImage: `url(${msg.img})` }}
              ></div>
            )}
          </div>
        ))}
      </main>

      <form
        className="flex items-center p-4 border-t border-gray-300 bg-gray-100 rounded-b-lg"
        onSubmit={handleSend}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your message..."
        />
        <Button
          variant="secondary"
          type="submit"
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Send
        </Button>
      </form>
    </section>
  );
};

export default ChatSection;