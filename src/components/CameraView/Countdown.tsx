import React, { useEffect, useState } from "react";

type Props = {
  seconds: number;
  onComplete: () => void;
};

const funWords = ["cheese", "paprika", "vibes", "sparkle", "smile", "chill"];

const Countdown: React.FC<Props> = ({ seconds, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [word, setWord] = useState("");

  useEffect(() => {
    setTimeLeft(seconds);
    setWord(funWords[Math.floor(Math.random() * funWords.length)]);
  }, [seconds]);

  useEffect(() => {
    if (timeLeft < 0) return;
    if (timeLeft === 0) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <h2 className="animate-pulse">
      {timeLeft > 0 ? timeLeft : word + "!"}
    </h2>
  );
};

export default Countdown;
