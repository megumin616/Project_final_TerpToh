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
    const elem = containerRef.current; // ใช้ ref เพื่ออ้างอิงถึงองค์ประกอบที่เราต้องการให้เต็มจอ
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
          .then(() => console.log("Entered fullscreen mode"))
          .catch((err) => console.log("Error entering fullscreen: ", err));
      } else if (elem.webkitRequestFullscreen) { // Safari
        console.log("Fullscreen Safari");
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
        console.log("Fullscreen Firefox");
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) { // IE/Edge
        console.log("Fullscreen Edge");
        elem.msRequestFullscreen();
      } else {
        console.log("Fullscreen API is not supported in this browser.");
      }
    } else {
      console.log("Element not found");
    }
  };
  
  

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
    <div ref={containerRef} style={{
      height: '100vh',       // ความสูงเต็มหน้าจอ
      width: '100vw',        // ความกว้างเต็มหน้าจอ
      backgroundColor: '#f0f0f0', // สีพื้นหลัง
    }}>
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
