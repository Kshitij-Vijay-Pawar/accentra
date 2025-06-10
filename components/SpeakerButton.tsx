"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

interface SpeakerButtonProps {
  text: string;
  lang?: string; // default "en-US"
}

const SpeakerButton = ({ text, lang = "en-US" }: SpeakerButtonProps) => {
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const toggleSpeaker = () => {
    // Turning OFF
    if (isSpeakerOn) {
      speechSynthesis.cancel();
    }
    setIsSpeakerOn(!isSpeakerOn);
  };

  const speak = () => {
    if (!isSpeakerOn) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === lang);
    if (voice) utterance.voice = voice;

    speechSynthesis.cancel(); // Cancel any existing
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Toggle Button */}
      <Button
        onClick={toggleSpeaker}
        className="p-2 rounded-full border shadow hover:bg-gray-100 transition"
      >
        {isSpeakerOn ? (
          <Volume2 className="w-6 h-6 text-green-600" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-600" />
        )}
      </Button>

      {/* Speak Button */}
      <Button
        onClick={speak}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          isSpeakerOn
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isSpeakerOn}
      >
        Speak Text
      </Button>
    </div>
  );
};

export default SpeakerButton;
