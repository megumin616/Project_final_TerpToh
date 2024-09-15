// Chapter1.jsx
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../App";
import "./chapter1.css"; // นำเข้าไฟล์ CSS
import "../../../App.css"
import background1 from "../../../gifs/chapter1-work.gif";
import background2 from "../../../gifs/chapter1.1-work.gif";
import { useNavigate } from "react-router-dom";

export default function Chapter1() {
  const { userName } = useContext(DataContext);
  const { userDream, setUserDream } = useContext(DataContext);

  const bg1 = background1;
  const bg2 = background2;

  const navigate = useNavigate();

  // ข้อความที่จะให้แสดงทีละบรรทัด
  // const content = [
  //   "ในเมืองใหญ่ที่วุ่นวาย ที่ต้องใช้ชีวิตในแต่ละวันอย่างเคร่งเครียด",
  //   "การเดินทางจากบ้านไปที่ทำงานและกลับบ้านในตอนเย็นเป็นกิจวัตร",
  //   `${userName} เป็นพนักงานในบริษัทแห่งหนึ่ง ซึ่งเป็นแหล่งหาเลี้ยงชีพหลัก`,
  //   "แต่ในใจลึกๆ ตัวเขารู้สึกว่าชีวิตของเขาขาดอะไรบางอย่าง",
  //   "บางอย่างที่เคยได้ฝัน เมื่อนานมาแล้ว",
  // ];
  //chapter1
  const content = [
    "ในเมืองใหญ่ที่วุ่นวาย ที่ต้องใช้ชีวิตในแต่ละวันอย่างเคร่งเครียด",
    "การเดินทางจากบ้านไปที่ทำงานและกลับบ้านในตอนเย็นเป็นกิจวัตร",
    `${userName} เป็นพนักงานประจำอยู่ที่แห่งหนึ่ง ซึ่งเป็นแหล่งหาเลี้ยงชีพหลัก`,
    `ระหว่างทางกลับ ${userName}มองไปรอบๆ เห็นผู้คนที่ดูเร่งรีบ ไม่มีใครมีรอยยิ้ม`,
    "ความรู้สึกในแต่ละวัน หมุนเวียนซ้ำๆ ไม่เคยเปลี่ยนแปลง",
    "แต่ในใจลึกๆ ตัวเขารู้สึกว่าชีวิตของเขา ขาดอะไรบางอย่าง",
    "บางอย่างที่เคยได้ฝัน เมื่อนานมาแล้ว",
  ];

  // สถานะสำหรับบรรทัดที่จะแสดง
  const [currentLine, setCurrentLine] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // สถานะสำหรับการแสดง header
  const [backgroundImage, setBackgroundImage] = useState("");
  const [buttonShow, setButtonShow] = useState(false); // แสดงปุ่มเมื่อแสดงข้อความหมด
  const [showInput, setShowInput] = useState(false); // แสดง input
  const [textDisplay, setTextDisplay] = useState("");
  const [validateDream, setValidateDream] = useState(false); //ตรวจสอบค่า userDream ว่ามีมั้ย

  // ##ใช้ effect สำหรับแสดง header 4 วินาทีเมื่อเปิดหน้าครั้งแรก
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

  // ##ใช้ effect สำหรับหน่วงเวลาในการแสดงข้อความ content หลังจากที่ header ถูกซ่อน
  useEffect(() => {
    if (!showHeader) {
      setIsFading(true); // เริ่มต้นการแสดงข้อความแบบค่อยๆ ขึ้น
      const timer = setTimeout(() => {
        setIsNextEnabled(true);
      }, 500); // หน่วงเวลา 2 วินาที

      return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูก unmount หรือ re-render
    }
  }, [showHeader, currentLine]); // ทำงานเมื่อ showHeader เปลี่ยนแปลง

  // ##เปลี่ยน background เมื่อถึงบรรทัดที่กำหมด
  useEffect(() => {
    if (currentLine === 2) {
      // เมื่อถึงบรรทัดที่ 3 (index 2)
      setBackgroundImage(`url(${bg2})`); // เปลี่ยน backgroundImage
    }
  }, [currentLine]);

  // ตรวจสอบว่าถึงบรรทัดสุดท้ายแล้ว
  useEffect(() => {
    if (currentLine === content.length - 1) {
      handleDreams(); // เรียกใช้ฟังก์ชันที่ต้องการ
    }
  }, [currentLine]); // ทำงานเมื่อ currentLine เปลี่ยนแปลง

  // ##ฟังก์ชันสำหรับเปลี่ยนบรรทัด
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
    setButtonShow(true); // แสดงปุ่ม
  };
  const handleInputDream = () => {
    setTextDisplay("none");
    setBackgroundImage("url()");
    setShowInput(true);
    setButtonShow(false);
  };

  const handleNext = () => {
    let isValid = true;

    // ตรวจสอบชื่อ
    if (userDream.trim() === "") {
      setValidateDream(true); // ตั้งค่า validateName เป็น true หากชื่อว่างเปล่า
      isValid = false;
    } else {
      setValidateDream(false); // ตั้งค่า validateName เป็น false หากชื่อไม่ว่าง
    }

    // นำทางไปยังหน้าถัดไปหากข้อมูลทั้งหมดถูกต้อง
    if (isValid) {
      navigate("/chapter2");
    }
  };

  return (
    <div
      className="container-chapter1"
      style={{
        backgroundImage: backgroundImage,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="chapter1-detail">
        <div className="detail-text">
          {showHeader && <h3>บทที่ 1 เริ่มต้นชีวิตประจำวัน</h3>}

          <p
            style={{ display: textDisplay }}
            id="detail-text-chapter1"
            className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}
          >
            {content[currentLine]}
          </p>

          {isNextEnabled && currentLine < content.length - 1 && (
            <button className="btn-chapter1" onClick={handleNextLine}>
              ถัดไป
            </button>
          )}
          {buttonShow ? (
            <button onClick={handleInputDream} className="btn-chapter1">
              ถัดไป
            </button>
          ) : (
            ""
          )}
          {showInput ? (
            <div>
              <p>ความฝันในชีวิตคุณ อยากเป็นอะไรเหรอ?</p>
              <input
                placeholder="ใส่ความฝันของคุณ..."
                onChange={(e) => setUserDream(e.target.value)}
              />
              {validateDream && (
                <p style={{ fontSize: "14px", color: "red" }}>กรุณากรอก</p>
              )}
              <button
                style={{ color: "rgb(35, 129, 245)" }}
                onClick={handleNext}
                className="btn-chapter1"
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
