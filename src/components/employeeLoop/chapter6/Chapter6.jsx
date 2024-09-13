import React, { useContext, useEffect, useState } from "react";
import "./chapter6.css";
import { DataContext } from "../../../App";
import background from "../../../gifs/chapter6-workAndStudent.gif";
import { useNavigate } from "react-router-dom";

export default function Chapter6() {
  const { userName } = useContext(DataContext);

  const navigate = useNavigate();

  const bg = background;

  const [backgroundImage, setBackgroundImage] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showButtonAsk, setShowButtonAsk] = useState(false); // แสดงปุ่มเลือกคำตอบ
  const [content, setContent] = useState([]); // เนื้อหาที่จะแสดง
  const [displaytext, setDisplayText] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // สำหรับติดตามบรรทัดที่กำลังแสดง
  const [buttonNextPage, setButtonNextPage] = useState(false);

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setShowHeader(false); // ซ่อน header หลังจาก 4 วินาที
    }, 4000); // 4 วินาที

    return () => clearTimeout(headerTimer); // ล้าง timer เมื่อ component ถูก unmount หรือ re-render
  }, []);

  useEffect(() => {
    if (!showHeader) {
      const timer = setTimeout(() => {
        setBackgroundImage(`url(${bg})`); // เปลี่ยน backgroundImage หลังจาก header ซ่อน
      }, 200); // เริ่มต้นทันทีหลังจากที่ header ซ่อน
      return () => clearTimeout(timer);
    }
  }, [showHeader]);

  useEffect(() => {
    if (!showHeader) {
      setIsFading(true); // เริ่มต้นการแสดงข้อความแบบค่อยๆ ขึ้น
      const timer = setTimeout(() => {
        setShowButtonAsk(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showHeader]); // ทำงานเมื่อ showHeader เปลี่ยนแปลง

  useEffect(() => {
    if (content.length > 0 && currentLineIndex < content.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prevIndex) => prevIndex + 1);
      }, 2500); // แสดงบรรทัดถัดไปทุกๆ 1 วินาที
      return () => clearTimeout(timer);
    }
  }, [content, currentLineIndex]);

  const answer = (value) => {
    setButtonNextPage(false);
    let newContent = [];
    if (value === 1) {
      newContent = [
        `ดีแล้วที่คุณพร้อมจะสู้! ความสำเร็จไม่ใช่เรื่องง่าย และมันไม่มาโดยไม่พยายาม`,
        `แต่ทุกครั้งที่คุณตัดสินใจที่จะไม่ยอมแพ้ คุณก็จะเติบโตและเข้าใกล้ความฝันของคุณมากขึ้นเสมอ`,
        `ฉันเชื่อในตัวคุณ! และคุณจงเชื่อในตัวเอง`,
      ];
    } else if (value === 2) {
      newContent = [
        `มันไม่เป็นปัญหาเลย ทุกคนมีช่วงเวลาที่ต้องเตรียมตัวและฝึกฝน`,
        `การยอมรับความรู้สึกของตัวเองเป็นก้าวแรกที่ดี`,
        `ค่อยๆ หาความมั่นใจและสร้างความพร้อมตามความสามารถของตัวเอง`,
        `เพื่อที่คุณจะได้พร้อมสำหรับการเดินหน้าเมื่อถึงเวลาที่เหมาะสม`,
      ];
    }
    setContent(newContent);
    setDisplayText("none");
    setCurrentLineIndex(0); // รีเซ็ต index ของบรรทัดเริ่มต้น
  };

  // แสดงปุ่มหลังจากใช้ answer() ไปหลัง 4 วิ
  useEffect(() => {
    if (answer) {
      const timer = setTimeout(() => {
        setButtonNextPage(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [answer]);

  



  const handleNextPage = () => {
    navigate("/chapterend");
  };

  return (
    <div
      className="container-chapter5"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapter5-detail">
        <div className="detail-text" style={{ display: displaytext }}>
          {showHeader && <h3>บทที่ 6 การเผชิญกับอุปสรรค</h3>}

          <p id="detail-p-chapter6" className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}>
            ในขณะที่ {userName} กำลังเดินหน้าตามหาความฝัน
            แน่นอนว่าจะต้องพบเจอกับอุปสรรคมากมาย
            <br />
            ไม่ว่าจะเป็นเรื่องของผู้คน เวลา ความสัมพันธ์ ความไม่มั่นใจในตัวเอง
            หรือแม้แต่การยอมรับจากคนรอบข้าง
            <br />
            ถึงแม้บางครั้ง {userName}{" "}
            จะรู้สึกถึงความท้าทายที่ต้องเผชิญอย่างหนักหน่วง <br />{" "}
            <span style={{ color: "rgb(35, 129, 245)" }}>
              แต่หากเป็นตัว{userName}ในตอนนี้ {userName}จะเลือกที่จะสู้ต่อไปหรือไม่?
            </span>
          </p>
          {showButtonAsk ? (
            <div className="show-buttonask">
              <button onClick={() => answer(1)}>ใช่! ฉันจะสู้ต่อไป</button>
              <button style={{ marginTop: "1.3rem" }} onClick={() => answer(2)}>
                ฉันยังไม่พร้อมจริงๆในตอนนี้
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {content.length > 0 && (
          <div className="detail-text">
            {content.slice(0, currentLineIndex).map((line, index) => (
              <p id="detail-p-chapter6" key={index} className="fade-in-line">
                {line}
              </p>
            ))}
            {buttonNextPage ? (
              <button onClick={handleNextPage}>ถัดไป</button>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
