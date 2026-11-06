'use client';

import { useState, useEffect } from 'react';

export default function Typewriter({ words, speed = 80, delay = 1800 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, speed / 1.5);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => currentFullWord.slice(0, prev.length + 1));
      }, speed);
    }

    if (!isDeleting && currentText === currentFullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, speed, delay]);

  return (
    <span>
      {currentText}
      <span className="typing-cursor" />
    </span>
  );
}
