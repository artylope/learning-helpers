'use client';

import { Volume2 } from 'lucide-react';
import { pinyin } from 'pinyin-pro';

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
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = () => speak(phrase);

  return (
    <div className="py-4">
      <div className="flex flex-col gap-0">
        {readAloud && (
          <button
            onClick={handleSpeak}
            className="p-2 w-10 h-10 -ml-2 flex items-center justify-center hover:bg-gray-100 rounded-full"
            aria-label={`Speak ${lang === 'zh' ? 'Chinese' : 'English'} word`}>
            <Volume2 className="w-5 h-5" />
          </button>
        )}
        <div>
          <p className="text-lg font-bold">{phrase}</p>
          {showPinyin && lang === 'zh' && (
            <p className="text-sm text-gray-600">{pinyin(phrase)}</p>
          )}
          {showTranslation && <p className="text-sm">{translation}</p>}
          {showSpeechHighlight && (
            <p className="text-sm text-gray-600">{pinyin(phrase)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
