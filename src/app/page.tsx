'use client';
import { WordCard } from '@/components/WordCard';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function Home() {
  const [readAloud, setReadAloud] = useState(true);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showSpeechHighlight, setShowSpeechHighlight] = useState(true);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-semibold my-8">Learning Helpers</h1>

      <div className="my-6 space-y-2 flex flex-col gap-2 border rounded-lg p-4">
        <h2 className="text-xl font-semibold">Settings</h2>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-pinyin"
              checked={showPinyin}
              onCheckedChange={setShowPinyin}
            />
            <label htmlFor="show-pinyin">Show pinyin for Chinese</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-translation"
              checked={showTranslation}
              onCheckedChange={setShowTranslation}
            />
            <label htmlFor="show-translation">Show translation</label>
          </div>
          <div className="flex items-center space-x-2 ">
            <Switch
              id="read-aloud"
              checked={readAloud}
              onCheckedChange={setReadAloud}
            />
            <label htmlFor="read-aloud">Able to read aloud</label>
          </div>
          {readAloud && (
            <div className="flex items-center space-x-2">
              <Switch
                id="show-highlight"
                checked={showSpeechHighlight}
                onCheckedChange={setShowSpeechHighlight}
              />
              <label htmlFor="show-highlight">
                Show speech highlight when it is being read aloud
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="my-6 space-y-4">
        <WordCard
          phrase="我有一个梦想, 你呢？"
          translation="I have a dream, what's yours?"
          lang="zh"
          readAloud={readAloud}
          showPinyin={showPinyin}
          showTranslation={showTranslation}
          showSpeechHighlight={showSpeechHighlight}
        />
        <WordCard
          phrase="The quick brown fox jumps over the lazy dog"
          translation="一只狐狸跳过了一只懒狗"
          lang="en"
          readAloud={readAloud}
          showPinyin={showPinyin}
          showTranslation={showTranslation}
          showSpeechHighlight={showSpeechHighlight}
        />{' '}
        <WordCard
          phrase="一只狐狸跳过了一只懒狗 "
          translation="The quick brown fox jumps over the lazy dog"
          lang="zh"
          readAloud={readAloud}
          showPinyin={showPinyin}
          showTranslation={showTranslation}
          showSpeechHighlight={showSpeechHighlight}
        />
      </div>
    </div>
  );
}
