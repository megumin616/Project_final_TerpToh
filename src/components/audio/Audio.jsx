// AudioContext.js
import React, { createContext, useState, useRef, useContext, useEffect } from 'react';
import sound1 from '../../sound/nutsume.mp3'; // เพลงที่ 1
import sound2 from '../../sound/uchiage.mp3'; // เพลงที่ 2

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  // อ้างอิงสำหรับเพลงที่ 1 และ 2
  const audioRef1 = useRef(null);
  const audioRef2 = useRef(null);

  // สถานะการเล่นของเพลงที่ 1 และ 2
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  // ฟังก์ชันควบคุมการเล่นเพลงที่ 1
  const togglePlay1 = () => {
    if (audioRef1.current) {
      if (isPlaying1) {
        audioRef1.current.pause();
      } else {
        audioRef1.current.play();
        if (isPlaying2) {
          togglePlay2(); // หยุดเพลงที่ 2 ถ้ามีการเล่นอยู่
        }
      }
      setIsPlaying1(!isPlaying1);
    }
  };

  // ฟังก์ชันควบคุมการเล่นเพลงที่ 2
  const togglePlay2 = () => {
    if (audioRef2.current) {
      if (isPlaying2) {
        audioRef2.current.pause();
      } else {
        audioRef2.current.play();
        if (isPlaying1) {
          togglePlay1(); // หยุดเพลงที่ 1 ถ้ามีการเล่นอยู่
        }
      }
      setIsPlaying2(!isPlaying2);
    }
  };

  // ฟังก์ชันเมื่อเพลงที่ 1 จบ
  const handleEnded1 = () => {
    if (audioRef1.current) {
      audioRef1.current.currentTime = 0;
      audioRef1.current.play();
    }
  };

  // ฟังก์ชันเมื่อเพลงที่ 2 จบ
  const handleEnded2 = () => {
    if (audioRef2.current) {
      audioRef2.current.currentTime = 0;
      audioRef2.current.play();
    }
  };

  useEffect(() => {
    if (audioRef1.current) {
      audioRef1.current.volume = 0.5; // ตั้งค่าระดับเสียงเริ่มต้นสำหรับเพลงที่ 1
    }
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5; // ตั้งค่าระดับเสียงเริ่มต้นสำหรับเพลงที่ 2
    }
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying1, togglePlay1, isPlaying2, togglePlay2 }}>
      <audio
        ref={audioRef1}
        src={sound1}
        onEnded={handleEnded1}
        loop
        autoPlay={false}
        controls={false}
      />
      <audio
        ref={audioRef2}
        src={sound2}
        onEnded={handleEnded2}
        loop
        autoPlay={false}
        controls={false}
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
