'use client';

import { Volume2, Square } from 'lucide-react';
import {
  PlayCircleIcon,
  StopCircleIcon,
  PauseCircleIcon,
} from '@heroicons/react/24/solid';

import { pinyin } from 'pinyin-pro';
import { useState } from 'react';

interface WordCardProps {
  phrase: string;
  translation: string;
  lang: 'zh' | 'en'; // language of the main phrase
  readAloud?: boolean;
  showPinyin?: boolean;
  showTranslation?: boolean;
  showSpeechHighlight?: boolean;
}

export function WordCard({
  phrase,
  translation,
  lang,
  readAloud = false,
  showPinyin = false,
  showTranslation = false,
  showSpeechHighlight = false,
}: WordCardProps) {
  const [currentWord, setCurrentWord] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const cancelSpeech = () => {
    window.speechSynthesis.cancel();
    setCurrentWord(-1);
    setIsPlaying(false);
  };

  const speak = (text: string) => {
    cancelSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US';

    // Adjust speech rate for Chinese to better match character highlighting
    if (lang === 'zh') {
      utterance.rate = 1.0; // Normal speed for more natural speech
    }

    // Split text appropriately based on language, but filter out empty strings and whitespace
    const words =
      lang === 'zh'
        ? text.split('')
        : text.split(/\s+/).filter((word) => word.trim()); // Only keep non-empty words

    let wordIndex = 0;
    let lastCharIndex = 0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentWord(0); // Start with first character for Chinese
    };

    utterance.onboundary = (event) => {
      if (lang === 'zh') {
        // For Chinese, update on character boundaries
        if (event.charIndex > lastCharIndex) {
          setCurrentWord(wordIndex);
          wordIndex = Math.min(wordIndex + 1, words.length - 1);
          lastCharIndex = event.charIndex;
        }
      } else {
        // For English, keep existing word boundary logic
        if (event.name === 'word' || event.name === 'sentence') {
          setCurrentWord(wordIndex);
          wordIndex = Math.min(wordIndex + 1, words.length - 1);
        }
      }
    };

    utterance.onend = () => {
      setCurrentWord(-1);
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setCurrentWord(-1);
      setIsPlaying(false);
    };

    // For Chinese, speak the entire text at once with boundary events
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => speak(phrase);

  // Split the phrase for display, filtering out empty strings and whitespace
  const displayWords =
    lang === 'zh'
      ? phrase.split('')
      : phrase.split(/(\s+|\b)/).filter((word) => word.trim()); // Keep only actual words

  return (
    <div className="py-4">
      <div className="flex flex-col gap-0">
        {readAloud && (
          <button
            onClick={isPlaying ? cancelSpeech : handleSpeak}
            className="w-10 h-10 -ml-2 flex items-center justify-center group rounded-full"
            aria-label={`${isPlaying ? 'Stop' : 'Speak'} ${
              lang === 'zh' ? 'Chinese' : 'English'
            } text`}>
            {isPlaying ? (
              <div className="flex items-center justify-center">
                <PauseCircleIcon className="w-8 h-8 group-hover:text-zinc-800" />
              </div>
            ) : (
              <PlayCircleIcon className="w-8 h-8 group-hover:text-zinc-800" />
            )}
          </button>
        )}
        <div>
          <p className="text-lg font-bold">
            {showSpeechHighlight
              ? phrase.split(/(\s+|\b)/).map((part, index) => {
                  if (part.trim() === '') {
                    // Render spaces and punctuation without highlighting
                    return <span key={index}>{part}</span>;
                  }
                  // Only highlight actual words when they are being read
                  const isHighlighted =
                    lang === 'zh'
                      ? currentWord === index
                      : displayWords.indexOf(part) === currentWord;
                  return (
                    <span
                      key={index}
                      className={
                        isHighlighted
                          ? 'bg-yellow-200 transition-colors duration-200'
                          : ''
                      }>
                      {part}
                    </span>
                  );
                })
              : phrase}
          </p>
          {showPinyin && lang === 'zh' && (
            <p className="text-sm text-zinc-600">{pinyin(phrase)}</p>
          )}
          {showTranslation && <p className="text-sm">{translation}</p>}
        </div>
      </div>
    </div>
  );
}
