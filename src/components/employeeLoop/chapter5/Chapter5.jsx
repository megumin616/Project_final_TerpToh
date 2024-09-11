import React, { useContext, useEffect, useState } from "react";
import "./chapter5.css";
import { DataContext } from "../../../App";
import background from "../../../gifs/BG.gif";

//books
import booktest from "../../../images/book_test.jpg";
import bookSet1_1 from "../../../images/setBook1_1.jpg";
import bookSet1_2 from "../../../images/setBook1_2.jpg";
import bookSet1_3 from "../../../images/setBook1_3.jpg";
import bookSet2 from "../../../images/setBook2.jpg";
import { useNavigate } from "react-router-dom";

export default function Chapter5() {
  const { userName } = useContext(DataContext);
  const navigate = useNavigate();


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

  const books1 = [
    {
      nameBook: "The Alchemist",
      author: "Paulo Coelho",
      detailBook: `เล่มนี้เป็นเรื่องราวของการตามหาความฝันและความหมายของชีวิต โดยผู้เขียนเล่าเรื่องของซานติอาโก 
      คนเลี้ยงแกะที่ออกเดินทางค้นหาสมบัติในดินแดนที่ห่างไกล หนังสือเล่มนี้เหมาะสำหรับ${userName} 
      เพราะเน้นย้ำถึงการเชื่อในความฝันของตนเองและการยืนหยัดต่อสู้แม้เส้นทางจะยากลำบาก`,
      imgBook: bookSet1_1,
    },
    {
      nameBook: "Atomic Habits",
      author: "James Clear",
      detailBook: `หนังสือเล่มนี้อธิบายถึงวิธีการเปลี่ยนนิสัยเล็ก ๆ เพื่อสร้างความสำเร็จใหญ่ 
      เน้นที่การปรับปรุงทีละเล็กทีละน้อยที่สามารถนำไปสู่การเปลี่ยนแปลงที่ยิ่งใหญ่ 
      เล่มนี้จะช่วยให้${userName}มองเห็นวิธีการปรับเปลี่ยนและพัฒนาตนเองในระยะยาว 
      ซึ่งจะเป็นประโยชน์ในการทำตามความฝันของ${userName}เอง`,
      imgBook: bookSet1_2,
    },
    {
      nameBook: "Man's Search for Meaning",
      author: "Viktor E. Frankl",
      detailBook: `เล่มนี้เป็นผลงานที่มีความลึกซึ้งและทรงพลัง 
      เนื้อหาเกี่ยวกับประสบการณ์ของผู้เขียนที่รอดชีวิตจากค่ายกักกันในช่วงสงครามโลกครั้งที่ 2 
      และความคิดเกี่ยวกับการค้นหาความหมายของชีวิต ${userName}จะได้รับแรงบันดาลใจในการต่อสู้กับอุปสรรค
      และค้นหาความหมายของความฝันที่${userName}เชื่อมั่น`,
      imgBook: bookSet1_3,
    },
  ];
  const books2 = [
    {
      nameBook: "สัญญานะว่าจะยิ้มให้กับตัวเอง",
      author: "Whenimfeeeling",
      detailBook: `สำหรับ${userName}หนังสือเล่มนี้น่าจะเป็นประโยชน์อย่างยิ่ง 
      เพราะเป็นหนังสือที่เหมาะกับคนที่กำลังอยู่ในช่วงเวลาแห่งการคิดทบทวนตัวเองที่กำลังรู้สึกไม่พร้อมที่จะเริ่มต้นใหม่ 
      หรือกำลังหาวิธีในการเสริมสร้างพลังใจให้สามารถก้าวข้ามอุปสรรคต่าง ๆ ไปได้ 
      โดยไม่ต้องเร่งรีบในการตัดสินใจหรือเปลี่ยนแปลงชีวิต หนังสือเล่มนี้อาจช่วยให้${userName}รู้สึกมั่นใจมากขึ้น
      ในการเผชิญกับความท้าทายในชีวิตและหันมามองตัวเองในแง่ที่ดียิ่งขึ้น`,
      imgBook: bookSet2,
    },
    {
      nameBook: "Atomic Habits",
      author: "James Clear",
      detailBook: `เล่มนี้เหมาะกับคนที่ต้องการปรับเปลี่ยนพฤติกรรมหรือพัฒนานิสัยใหม่ 
      แต่ยังไม่พร้อมสำหรับการเปลี่ยนแปลงที่ใหญ่โต "Atomic Habits" 
      ให้คำแนะนำและวิธีการเล็กๆ น้อยๆ ที่สามารถนำไปสู่การเปลี่ยนแปลงที่มีผลในระยะยาว 
      หนังสือเล่มนี้อาจช่วยให้${userName}สร้างพื้นฐานเล็กๆ 
      เพื่อเตรียมตัวสำหรับการก้าวเดินไปข้างหน้าเมื่อคุณพร้อม`,
      imgBook: bookSet1_2,
    },
    {
      nameBook: "Man's Search for Meaning",
      author: "Viktor E. Frankl",
      detailBook: `หนังสือเล่มนี้อธิบายถึงประสบการณ์ที่ผู้เขียนได้ผ่านการอยู่ในค่ายกักกันนาซีและการค้นหาความหมายในชีวิต 
      แม้ว่าจะอยู่ในสถานการณ์ที่ยากลำบาก หนังสือเล่มนี้อาจช่วยให้${userName}ได้พิจารณาและหาความหมายหรือวัตถุประสงค์ในชีวิตของคุณเอง`,
      imgBook: bookSet1_3,
    },
  ];

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
