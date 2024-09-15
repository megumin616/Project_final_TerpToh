import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import User from "./components/home/User";
import Chapter1 from "./components/employeeLoop/chapter1/Chapter1";
import Chapter2 from "./components/employeeLoop/chapter2/Chapter2";
import Chapter3 from "./components/employeeLoop/chapter3/Chapter3";
import Chapter4 from "./components/employeeLoop/chapter4/Chapter4";
import Chapter5 from "./components/employeeLoop/chapter5/Chapter5";
import Chapter6 from "./components/employeeLoop/chapter6/Chapter6";
import ChapterEnd from "./components/employeeLoop/chapterEnd/ChapterEnd";
import Toyou from "./components/employeeLoop/toyou/toyou";
import { AudioProvider } from "./components/audio/Audio";
import Student1 from "./components/studentLoop/chapter1/Student1";

export const DataContext = createContext();

function App() {
  const [userName, setUserName] = useState(
    () => localStorage.getItem("userName") || ""
  ); //ชื่อผู้ใช้
  //   localStorage.getItem("userName"): ฟังก์ชันนี้จะดึงค่าที่เคยถูกเก็บใน Local Storage ภายใต้คีย์ userName. ถ้ามีค่าที่ถูกเก็บไว้, ค่าเหล่านั้นจะถูกดึงมาใช้งาน.
  //   || "": ในกรณีที่ไม่มีค่าใน Local Storage (หรือค่าเป็น null), จะใช้ค่าว่าง ("") แทน.

  const [userAge, setUserAge] = useState(
    () => localStorage.getItem("userAge") || ""
  ); //อายุผู้ใช้
  const [userDream, setUserDream] = useState(
    () => localStorage.getItem("userDream") || ""
  ); //ความฝันของผู้ใช้
  const [userFeelDream, setUserFeelDream] = useState(
    () => localStorage.getItem("userFeelDream") || ""
  ); //ความรู้สึกหากความฝันเป็นจริง

  const containerRef = useRef(null);

const enterFullscreen = () => {
    const elem = containerRef.current; // ใช้ ref เพื่ออ้างอิงถึงองค์ประกอบ (element) ที่เราต้องการทำให้แสดงผลแบบเต็มหน้าจอ
    if (elem) { // ตรวจสอบว่ามีองค์ประกอบที่อ้างอิงอยู่หรือไม่
      if (elem.requestFullscreen) { // ตรวจสอบว่าเบราว์เซอร์รองรับฟังก์ชัน requestFullscreen (มาตรฐานของเบราว์เซอร์ส่วนใหญ่)
        elem.requestFullscreen() // เรียกใช้งานโหมดเต็มจอ
          .then(() => console.log("Entered fullscreen mode")) // ถ้าสำเร็จจะแสดงข้อความใน console
          .catch((err) => console.log("Error entering fullscreen: ", err)); // ถ้าเกิดข้อผิดพลาดจะแสดงข้อความ error
      } else if (elem.webkitRequestFullscreen) { // สำหรับ Safari ซึ่งใช้ webkitRequestFullscreen
        console.log("Fullscreen Safari");
        elem.webkitRequestFullscreen(); // เรียกใช้โหมดเต็มจอสำหรับ Safari
      } else if (elem.mozRequestFullScreen) { // สำหรับ Firefox ซึ่งใช้ mozRequestFullScreen
        console.log("Fullscreen Firefox");
        elem.mozRequestFullScreen(); // เรียกใช้โหมดเต็มจอสำหรับ Firefox
      } else if (elem.msRequestFullscreen) { // สำหรับ IE/Edge ซึ่งใช้ msRequestFullscreen
        console.log("Fullscreen Edge");
        elem.msRequestFullscreen(); // เรียกใช้โหมดเต็มจอสำหรับ IE/Edge
      } else {
        console.log("Fullscreen API is not supported in this browser."); // ถ้าเบราว์เซอร์ไม่รองรับ Fullscreen API จะแสดงข้อความว่าไม่รองรับ
      }
    } else {
      console.log("Element not found"); // ถ้าไม่พบองค์ประกอบที่ต้องการทำให้เต็มจอจะแสดงข้อความว่าไม่พบ
    }
  };


  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        containerRef.current.style.display = 'flex';
        containerRef.current.style.justifyContent = 'center';
        containerRef.current.style.alignItems = 'center';
      } else {
        // Reset styles when exiting fullscreen
        containerRef.current.style.display = '';
        containerRef.current.style.justifyContent = '';
        containerRef.current.style.alignItems = '';
      }
    };
  
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  

  // ฟังก์ชันที่ใช้เก็บข้อมูลลงใน Local Storage เมื่อ state เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("userAge", userAge);
  }, [userAge]);

  useEffect(() => {
    localStorage.setItem("userDream", userDream);
  }, [userDream]);

  useEffect(() => {
    localStorage.setItem("userFeelDream", userFeelDream);
  }, [userFeelDream]);

  const userContextValue = {
    userName,
    setUserName,
    userAge,
    setUserAge,
    userDream,
    setUserDream,
    userFeelDream,
    setUserFeelDream,
    enterFullscreen
  };

  return (
    <div ref={containerRef} 
    // style={{
    //   height: '100vh',       // ความสูงเต็มหน้าจอ
    //   width: '100vw',        // ความกว้างเต็มหน้าจอ
    //   backgroundColor: '#f0f0f0', // สีพื้นหลัง
    // }}
     className="main-router-container"
    >
      <BrowserRouter>
      <DataContext.Provider value={userContextValue}>
        <AudioProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/chapter1" element={<Chapter1 />} />
            <Route path="/chapter2" element={<Chapter2 />} />
            <Route path="/chapter3" element={<Chapter3 />} />
            <Route path="/chapter4" element={<Chapter4 />} />
            <Route path="/chapter5" element={<Chapter5 />} />
            <Route path="/chapter6" element={<Chapter6 />} />
            <Route path="/chapterend" element={<ChapterEnd />} />
            <Route path="/toyou" element={<Toyou />} />

            <Route path="/student1" element={<Student1 />} />
          </Routes>
        </AudioProvider>
      </DataContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
