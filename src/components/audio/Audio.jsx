import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import soundtext1 from "../../sound/nutsume.mp3"; // เพลงที่ 1 // ผิดลิขสิทธิ์
import soundtext2 from "../../sound/uchiage.mp3"; // เพลงที่ 2 // ผิดลิขสิทธิ์
import soundtext3 from "../../sound/Gymnopedie.mp3"; // เพลงที่ 3 // ไม่ติดลิขสิทธิ์
import soundtext4 from "../../sound/Rain.mp3"; // เพลงที่ 4 // ไม่ติดลิขสิทธิ์

// สร้าง Context สำหรับจัดการการเล่นเสียง
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  
  // กำหนดเสียงที่ใช้ในโปรเจกต์
  const sound1 = soundtext3;
  const sound2 = soundtext4;
  const sound3 = soundtext4;

  // อ้างอิงสำหรับองค์ประกอบ <audio> สำหรับเพลงที่ 1, 2 และ 3
  const audioRef1 = useRef(null); // อ้างอิงเพลงที่ 1
  const audioRef2 = useRef(null); // อ้างอิงเพลงที่ 2
  const audioRef3 = useRef(null); // อ้างอิงเพลงที่ 3

  // สถานะการเล่นเพลงที่ 1, 2 และ 3
  const [isPlaying1, setIsPlaying1] = useState(false); // สถานะเพลงที่ 1
  const [isPlaying2, setIsPlaying2] = useState(false); // สถานะเพลงที่ 2
  const [isPlaying3, setIsPlaying3] = useState(false); // สถานะเพลงที่ 3

  // ฟังก์ชันควบคุมการเล่นเพลงที่ 1
  const togglePlay1 = () => {
    if (audioRef1.current) { // ตรวจสอบว่าองค์ประกอบ <audio> มีค่าแล้วหรือไม่
      if (isPlaying1) {
        audioRef1.current.pause(); // หยุดเล่นเพลงที่ 1 ถ้ากำลังเล่นอยู่
      } else {
        audioRef1.current.play(); // เริ่มเล่นเพลงที่ 1 ถ้ายังไม่ได้เล่น
        if (isPlaying2) togglePlay2(); // หยุดเพลงที่ 2 ถ้ากำลังเล่นอยู่
        if (isPlaying3) togglePlay3(); // หยุดเพลงที่ 3 ถ้ากำลังเล่นอยู่
      }
      setIsPlaying1(!isPlaying1); // สลับสถานะการเล่นของเพลงที่ 1
    }
  };

  // ฟังก์ชันควบคุมการเล่นเพลงที่ 2
  const togglePlay2 = () => {
    if (audioRef2.current) {
      if (isPlaying2) {
        audioRef2.current.pause(); // หยุดเล่นเพลงที่ 2 ถ้ากำลังเล่นอยู่
      } else {
        audioRef2.current.play(); // เริ่มเล่นเพลงที่ 2 ถ้ายังไม่ได้เล่น
        if (isPlaying1) togglePlay1(); // หยุดเพลงที่ 1 ถ้ากำลังเล่นอยู่
        if (isPlaying3) togglePlay3(); // หยุดเพลงที่ 3 ถ้ากำลังเล่นอยู่
      }
      setIsPlaying2(!isPlaying2); // สลับสถานะการเล่นของเพลงที่ 2
    }
  };

  // ฟังก์ชันควบคุมการเล่นเพลงที่ 3
  const togglePlay3 = () => {
    if (audioRef3.current) {
      if (isPlaying3) {
        audioRef3.current.pause(); // หยุดเล่นเพลงที่ 3 ถ้ากำลังเล่นอยู่
      } else {
        audioRef3.current.play(); // เริ่มเล่นเพลงที่ 3 ถ้ายังไม่ได้เล่น
        if (isPlaying1) togglePlay1(); // หยุดเพลงที่ 1 ถ้ากำลังเล่นอยู่
        if (isPlaying2) togglePlay2(); // หยุดเพลงที่ 2 ถ้ากำลังเล่นอยู่
      }
      setIsPlaying3(!isPlaying3); // สลับสถานะการเล่นของเพลงที่ 3
    }
  };

  // ฟังก์ชันเมื่อเพลงที่ 1 จบ
  const handleEnded1 = () => {
    if (audioRef1.current) {
      audioRef1.current.currentTime = 0; // รีเซ็ตเวลาเริ่มต้นของเพลงที่ 1
      setIsPlaying1(false); // เปลี่ยนสถานะการเล่นเพลงที่ 1 เป็นหยุด
      togglePlay3(); // เมื่อเพลงที่ 1 จบ ให้เริ่มเล่นเพลงที่ 3
    }
  };

  // ฟังก์ชันเมื่อเพลงที่ 2 จบ
  const handleEnded2 = () => {
    if (audioRef2.current) {
      audioRef2.current.currentTime = 0;
      audioRef2.current.play();
    }
  };

  // ฟังก์ชันเมื่อเพลงที่ 3 จบ
  const handleEnded3 = () => {
    if (audioRef3.current) {
      audioRef3.current.currentTime = 0; // รีเซ็ตเวลาเริ่มต้นของเพลงที่ 3
      audioRef1.current.play(); // เล่นเพลงที่ 1 ซ้ำเมื่อจบ
    }
  };

  // ตั้งค่าเริ่มต้นเมื่อ component ถูก mount
  useEffect(() => {
    if (audioRef1.current) {
      audioRef1.current.volume = 0.5; // ตั้งระดับเสียงเริ่มต้นสำหรับเพลงที่ 1
    }
    if (audioRef2.current) {
      audioRef2.current.volume = 0.5; // ตั้งระดับเสียงเริ่มต้นสำหรับเพลงที่ 2
    }
    if (audioRef3.current) {
      audioRef3.current.volume = 0.5; // ตั้งระดับเสียงเริ่มต้นสำหรับเพลงที่ 3
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying1, togglePlay1,
        isPlaying2, togglePlay2,
        isPlaying3, togglePlay3
      }}
    >
      {/* องค์ประกอบ <audio> สำหรับเพลงที่ 1 */}
      <audio
        ref={audioRef1}
        src={sound1}
        onEnded={handleEnded1} // จัดการเมื่อเพลงที่ 1 จบ
        loop={false} // ไม่ให้วนเล่นเพลงที่ 1
        autoPlay={false} // ไม่ให้เล่นอัตโนมัติ
        controls={false} // ซ่อนเครื่องมือควบคุม
      />
      {/* องค์ประกอบ <audio> สำหรับเพลงที่ 2 */}
      <audio
        ref={audioRef2}
        src={sound2}
        onEnded={handleEnded2} // จัดการเมื่อเพลงที่ 2 จบ
        loop // ให้เพลงที่ 2 เล่นวน
        autoPlay={false}
        controls={false}
      />
      {/* องค์ประกอบ <audio> สำหรับเพลงที่ 3 */}
      <audio
        ref={audioRef3}
        src={sound3}
        onEnded={handleEnded3} // จัดการเมื่อเพลงที่ 3 จบ
        loop={false} // ไม่ให้วนเล่นเพลงที่ 3 แต่ให้เล่นซ้ำเมื่อจบแทน
        autoPlay={false}
        controls={false}
      />
      {children} {/* Render องค์ประกอบลูก */}
    </AudioContext.Provider>
  );
};

// Hook สำหรับใช้งาน Context ของเสียง
export const useAudio = () => useContext(AudioContext);
