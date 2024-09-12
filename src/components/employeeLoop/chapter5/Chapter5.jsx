import React, { useContext, useEffect, useState } from "react";
import "./chapter5.css";
import { DataContext } from "../../../App";
import background from "../../../gifs/BG.gif";

//books
import { useNavigate } from "react-router-dom";
import useBook from "./books";

export default function Chapter5() {
  const { userName } = useContext(DataContext);
  const navigate = useNavigate();

  const {books1, books2} = useBook();

  const bg = background;

  const [backgroundImage, setBackgroundImage] = useState("");
  const [showHeader, setShowHeader] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showButtonAsk, setShowButtonAsk] = useState(false); // แสดงปุ่มเลือกคำตอบ
  const [content, setContent] = useState([]); // เนื้อหาที่จะแสดง
  const [displaytext, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0); // สำหรับติดตามบรรทัดที่กำลังแสดง
  const [noneDisplay, setNoneDisplay] = useState("");
  const [showButtonNextBook, setshowButtonNextBook] = useState(false); //แสดงปุ่มที่จะแสดงหนังสือ
  const [showButtonNextChapter, setShowButtonnextChapter] = useState(false); // แสดงปุ่มสุดท้ายไปยังหน้าอื่น

  const [booksAll, setBooksAll] = useState([]); //set เนื้อหาที่จะแนะนำหนังสือว่าจะเป็นอันไหน

  // สร้าง state เพื่อเก็บ index ของหนังสือที่จะแสดง
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBook, setShowBook] = useState(false); // แสดง div แนะนำหนังสือ

  const [displayChangeNextBook, setDisplayChangeNextBook] = useState(false); 

  

  // ฟังก์ชันเพื่อเปลี่ยนไปยังหนังสือถัดไป
  const nextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books1.length);
  };

  useEffect(() => {
    if(currentIndex === 2) {
      setDisplayChangeNextBook(true);
      setShowButtonnextChapter(true);
    }
  }, [currentIndex])
  

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
      }, 3500);
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
    setshowButtonNextBook(false);
    let newContent = [];
    if (value === 1) {
      newContent = [
        `การที่${userName}ตัดสินใจให้โอกาสตัวเองเสมอแบบนั้นเป็นสิ่งที่น่าชื่นชมมาก`,
        `ผมเชื่อว่าแม้เส้นทางจะยากลำบาก แต่การที่${userName}ไม่ยอมแพ้และยังคงเดินตามความฝันนั้น`,
        `จะทำให้ชีวิตของ${userName}มีความหมายมากยิ่งขึ้นอย่างแน่นอน`,
      ];
      setBooksAll(books1); //set เนื้อหาที่จะแนะนำหนังสือว่าจะเป็นอันไหน
    } else if (value === 2) {
      newContent = [
        `ผมเข้าใจนะว่าการตัดสินใจที่จะเริ่มต้นใหม่มันไม่ใช่เรื่องง่าย`,
        `และบางครั้งก็ต้องใช้เวลามากกว่าที่เราคิดไว้ ${userName}ไม่ต้องรีบร้อนหรอกนะ`,
        `ค่อยๆ ให้เวลากับตัวเอง คิดและรู้สึกกับสิ่งที่เกิดขึ้น หากวันหนึ่ง${userName}พร้อมที่จะเปิดโอกาสให้กับตัวเอง`,
        `ผมเชื่อว่า${userName}จะสามารถก้าวผ่านทุกอย่างไปได้อย่างแข็งแกร่ง แล้วผมจะอยู่ข้างๆ ${userName}เสมอในทุกก้าวที่${userName}เลือกเดินไป`,
      ];
      setBooksAll(books2); //set เนื้อหาที่จะแนะนำหนังสือว่าจะเป็นอันไหน
    }
    setContent(newContent);
    setDisplayText("none");
    setCurrentLineIndex(0); // รีเซ็ต index ของบรรทัดเริ่มต้น
  };

  useEffect(() => {
    if (answer) {
      const timer = setTimeout(() => {
        setshowButtonNextBook(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [answer]);

  //show books
  const handleShowBook = () => {
    setNoneDisplay("none");
    setShowBook(true);

    // #ทำถึงตรงนี้  ต่อไปก็ทำการแยกหนังสือที่จะแนะนำจากการเลือกคำตอบก่อนหน้า แล้วสร้าง state เก็บรูปกับรายละเอียดไว้ เพื่อที่จะเอามา
    // แสดงจากที่ได้เลือกไว้ แนะนำ 3 เล่ม และเกริ่นว่า "หนังสือ 3 เล่มที่เหมาะกับคุณในตอนนี้"
  };

  //ไปยังบทต่อไป
  const handleNextPage = () => {
    navigate("/chapter6");
  }

  return (
    <div
      className="container-chapter5"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapter5-detail">
        <div className="detail-text" style={{ display: displaytext }}>
          {showHeader && <h3>บทที่ 5 การเริ่มต้นใหม่</h3>}

          <p className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}>
            หลังจากที่ {userName}{" "}
            ได้ไตร่ตรองความรู้สึกของตนเองเกี่ยวกับงานและชีวิตที่เป็นอยู่แล้ว
            <br />
            คุณจะเปิดรับโอกาสให้ตัวเอง ในการตามความฝันอีกครั้งไหม?
          </p>
          {showButtonAsk ? (
            <div className="show-buttonask">
              <button onClick={() => answer(1)}>
                ฉันจะให้โอกาสตัวเองเสมอ ไม่ว่าเมื่อไหร่หรือเจออะไรในชีวิต
                ฉันจะเปิดรับโอกาสและทำตามความฝันของฉัน
              </button>
              <button style={{ marginTop: "1.3rem" }} onClick={() => answer(2)}>
                ฉันยังไม่พร้อม ในตอนนี้
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {content.length > 0 && (
          <div className="detail-text" style={{ display: noneDisplay }}>
            {content.slice(0, currentLineIndex).map((line, index) => (
              <p key={index} className="fade-in-line">
                {line}
              </p>
            ))}
            {showButtonNextBook ? (
              <button onClick={handleShowBook}>ถัดไป</button>
            ) : (
              ""
            )}
          </div>
        )}

        {showBook && (
          <div
            className="detail-text"
          >
            <h5 style={{color: 'gray'}}>หนังสือ 3 เล่มที่ฉันอย่างแนะนำกันคุณ</h5>
            <h3>{booksAll[currentIndex].nameBook}</h3>
            <p>{booksAll[currentIndex].author}</p>
            <img
              src={booksAll[currentIndex].imgBook}
              alt={booksAll[currentIndex].nameBook}
              height={200}
              />
              <p>{booksAll[currentIndex].detailBook}</p>
            <button onClick={nextBook}>{displayChangeNextBook ? "ดูอีกรอบ" : "หนังสือถัดไป"}</button>
            {showButtonNextChapter ? (<button style={{marginLeft: '2rem', color: 'rgb(35, 129, 245)'}} onClick={handleNextPage}>ถัดไป</button>) : ""}
          </div>
        )}
      </div>
    </div>
  );
}
