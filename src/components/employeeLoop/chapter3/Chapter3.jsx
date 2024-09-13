import React, { useContext, useEffect, useState } from "react";
import "./chapter3.css";
import { DataContext } from "../../../App";
import background1 from "../../../gifs/chapter3-work.gif";
import background2 from "../../../gifs/chapter3.1-work.gif";
import { useNavigate } from "react-router-dom";

export default function Chapter3() {
  const { userName, userFeelDream } = useContext(DataContext);

  const bg1 = background1;
  const bg2 = background2;

  const navigate = useNavigate();

  // const content = [
  //   `วันหนึ่ง ขณะที่ ${userName} เดินอยู่ในสวนสาธารณะเพื่อผ่อนคลาย`,
  //   `${userName} ได้พบกับชายชราผู้หนึ่งที่กำลังนั่งอ่านบทความในสมุดเล่มเล็กๆ`,
  //   `${userName} จึงเดินเข้าไปหา`,
  //   `ชายชราเล่าให้ ${userName} ฟังถึงการใช้ชีวิตที่มีความสุขจากการทำในสิ่งที่ตนเองรัก`,
  //   `แม้ว่าจะไม่ได้เป็นที่ยอมรับในสังคมก็ตาม`,
  //   `แต่เขาก็รู้สึก ${userFeelDream}`,
  // ];
  const content = [
    `วันหนึ่ง ขณะที่ ${userName} เดินอยู่ในสวนสาธารณะเพื่อผ่อนคลาย`,
    `${userName} ได้พบกับชายชราผู้หนึ่งที่กำลังนั่งอ่านบทความในสมุดเล่มเล็กๆ`,
    `${userName} จึงเดินเข้าไปหา`,
    `ชายชราเล่าให้ ${userName} ฟังถึงการใช้ชีวิตที่มีความสุขจากการทำในสิ่งที่ตนเองรัก`,
    `แม้ว่าจะไม่ได้เป็นที่ยอมรับในสังคมก็ตาม`,
    `แต่เขาก็รู้สึก ${userFeelDream}`,
    `ชายชรายิ้มและบอกว่า 'ความสุขไม่ได้มาจากการที่คนอื่นยอมรับเรา แต่มาจากการที่เราได้ยอมรับตัวเอง'`,
    `คำพูดนั้นทำให้ ${userName} รู้สึกถึงความหมายลึกๆ ในการใช้ชีวิต`,
    "เขาเริ่มเข้าใจว่า บางทีเขาอาจจะต้องเริ่มทำสิ่งที่เขารักแทนที่จะทำสิ่งที่คนอื่นคาดหวัง",
    "ชายชรากล่าวอีกว่า 'ในตอนที่ฉันยังหนุ่ม ฉันก็เคยกลัวการตามหาความฝัน'",
    "แต่เมื่อฉันเริ่มยอมรับตัวเอง ชีวิตก็เริ่มเปลี่ยนไปในทางที่ดีขึ้นอย่างไม่น่าเชื่อ'",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // สถานะสำหรับการแสดง header
  const [backgroundImage, setBackgroundImage] = useState("");
  const [buttonShow, setButtonShow] = useState(false); // แสดงปุ่มเมื่อแสดงข้อความหมด
  const [showInput, setShowInput] = useState(false); // แสดง input
  const [textDisplay, setTextDisplay] = useState("");

  // ใช้ effect สำหรับแสดง header 4 วินาทีเมื่อเปิดหน้าครั้งแรก
  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setShowHeader(false); // ซ่อน header หลังจาก 4 วินาที
    }, 4000); // 4 วินาที

    return () => clearTimeout(headerTimer); // ล้าง timer เมื่อ component ถูก unmount หรือ re-render
  }, []);

  useEffect(() => {
    if (!showHeader) {
      setTimeout(() => {
        setBackgroundImage(`url(${bg1})`); // เปลี่ยน backgroundImage หลังจาก header ซ่อน
      }, 200); // เริ่มต้นทันทีหลังจากที่ header ซ่อน
    }
  }, [showHeader]);

  // ใช้ effect สำหรับหน่วงเวลาในการแสดงข้อความ content หลังจากที่ header ถูกซ่อน
  useEffect(() => {
    if (!showHeader) {
      setIsFading(true); // เริ่มต้นการแสดงข้อความแบบค่อยๆ ขึ้น
      const timer = setTimeout(() => {
        setIsNextEnabled(true);
      }, 500); // หน่วงเวลา 2 วินาที

      return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูก unmount หรือ re-render
    }
  }, [showHeader, currentLine]); // ทำงานเมื่อ showHeader เปลี่ยนแปลง

  useEffect(() => {
    if (currentLine === 2) {
      // เมื่อถึงบรรทัดที่ 3 (index 2)
      setBackgroundImage(`url(${bg2})`); // เปลี่ยน backgroundImage
    }
  }, [currentLine]);

  useEffect(() => {
    if (currentLine === content.length - 1) {
      // ตรวจสอบว่าถึงบรรทัดสุดท้ายแล้ว
      handleDreams(); // เรียกใช้ฟังก์ชันที่ต้องการ
    }
  }, [currentLine]); // ทำงานเมื่อ currentLine เปลี่ยนแปลง

  // ฟังก์ชันสำหรับเปลี่ยนบรรทัด
  const handleNextLine = () => {
    if (currentLine < content.length - 1) {
      setIsFading(false); // ซ่อนข้อความก่อนเปลี่ยนบรรทัด
      setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setIsNextEnabled(false); // ปิดการใช้งานปุ่มถัดไปชั่วคราว
      }, 500); // รอเวลาให้การ fade-out เสร็จ (0.5 วินาที)
    }
  };

  const handleDreams = () => {
    setButtonShow(true);
  };

  const handleInputDream = () => {
    setTextDisplay("none");
    setBackgroundImage("url()");
    setShowInput(true);
    setButtonShow(false);
  };

  const handleNext = () => {
    navigate("/chapter4");
  };

  return (
    <div
      className="container-chapter3"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapter3-detail">
        <div className="detail-text">
          {showHeader && (
            <h3 id="detail-h3-chapter3">บทที่ 3 แรงบันดาลใจจากการพบเจอ</h3>
          )}

          <p
            id="detail-p-chapter3"
            style={{ display: textDisplay }}
            className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}
          >
            {content[currentLine]}
          </p>

          {isNextEnabled && currentLine < content.length - 1 && (
            <button className="btn-chapter3" onClick={handleNextLine}>
              ถัดไป
            </button>
          )}
          {buttonShow ? (
            <button onClick={handleInputDream} className="btn-chapter3">
              ถัดไป
            </button>
          ) : (
            ""
          )}
          {showInput ? (
            <div>
              <p id="detail-h3-chapter3">รักษามันไว้นะ ความฝันของคุณหน่ะ!</p>
              <button
                style={{ color: "rgb(35, 129, 245)" }}
                onClick={handleNext}
                className="btn-chapter3"
              >
                ถัดไป
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
