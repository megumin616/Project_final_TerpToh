import React, { useState, useEffect, useContext } from "react";
import "./chapter2.css";
import { DataContext } from "../../../App";
import background from "../../../gifs/chapter2-work.gif";
import { useNavigate } from "react-router-dom";

export default function Chapter2() {
  const { userName, userDream } = useContext(DataContext);
  const { userFeelDream, setUserFeelDream } = useContext(DataContext);

  const bg = background;

  const navigate = useNavigate();

  const [currentLine, setCurrentLine] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // สถานะสำหรับการแสดง header
  const [backgroundImage, setBackgroundImage] = useState("");
  const [buttonShow, setButtonShow] = useState(false); // แสดงปุ่มเมื่อแสดงข้อความหมด
  const [showInput, setShowInput] = useState(false); // แสดง input
  const [textDisplay, setTextDisplay] = useState("");
  const [validateDream, setValidateDream] = useState(false); //ตรวจสอบค่า userDream

  // const content = [
  //     `หนึ่งคืนที่เงียบสงบ ${userName} ได้นั่งพักผ่อนในห้องและบังเอิญพบสมุดบันทึกเก่าๆของเขา`,
  //     `ที่เต็มไปด้วยภาพวาดและข้อความเกี่ยวกับความฝันในการเป็น ${userDream}`,
  //     `${userName} รู้สึกถึงความตื่นเต้นที่เคยมีเมื่อครั้งเป็นเด็ก`,
  //     `ความฝันที่เคยสดใสตอนนั้นกลับมามีชีวิตอีกครั้งในความคิดของ ${userName}`,
  // ];
  const content = [
    `หนึ่งคืนที่เงียบสงบ ${userName} ได้นั่งพักผ่อนในห้องและบังเอิญพบสมุดบันทึกเก่าๆของเขา`,
    `ที่เต็มไปด้วยภาพวาดและข้อความเกี่ยวกับความฝันในการเป็น ${userDream}`,
    `${userName} รู้สึกถึงความตื่นเต้นที่เคยมีเมื่อครั้งเป็นเด็ก`,
    `ความฝันที่เคยสดใสตอนนั้นกลับมามีชีวิตอีกครั้งในความคิดของ ${userName}`,
    "เขาเริ่มต้นเปิดสมุดบันทึกและอ่านข้อความที่เขาเขียนไว้",
    "ข้อความนั้นเล่าว่า 'อย่าลืมความฝันของเรา...อย่าลืมเหตุผลที่เรารักในสิ่งนี้'",
    `${userName} เริ่มรู้สึกว่าความฝันนั้นไม่ใช่แค่ความทรงจำ แต่เป็นแรงบันดาลใจที่เขาต้องการ`,
    "(ความฝันนั้นจะนำพาเขาไปสู่ที่ไหนกันนะ)",
  ];

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
        setBackgroundImage(`url(${bg})`); // เปลี่ยน backgroundImage หลังจาก header ซ่อน
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
    let isValid = true;

    // ตรวจสอบชื่อ
    if (userFeelDream.trim() === "") {
      setValidateDream(true); // ตั้งค่า validateName เป็น true หากชื่อว่างเปล่า
      isValid = false;
    } else {
      setValidateDream(false); // ตั้งค่า validateName เป็น false หากชื่อไม่ว่าง
    }

    // นำทางไปยังหน้าถัดไปหากข้อมูลทั้งหมดถูกต้อง
    if (isValid) {
      navigate("/chapter3");
    }
  };

  return (
    <div
      className="container-chapter2"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapter2-detail">
        <div className="detail-text">
          {showHeader && (
            <h3 id="detail-h3-chapter2">บทที่ 2 ความทรงจำในวัยเด็ก</h3>
          )}

          <p
            style={{ display: textDisplay }}
            id="detail-text-chapter2"
            className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}
          >
            {content[currentLine]}
          </p>
          {isNextEnabled && currentLine < content.length - 1 && (
            <button className="btn-chapter2" onClick={handleNextLine}>
              ถัดไป
            </button>
          )}
          {buttonShow ? (
            <button onClick={handleInputDream} className="btn-chapter2">
              ถัดไป
            </button>
          ) : (
            ""
          )}
          {showInput ? (
            <div className="ask-input">
              <p>
                หากความฝันของ {userName} เป็นจริง {userName}{" "}
                จะรู้สึกอย่างไรกับตัวเองบ้าง?
              </p>
              <input
                placeholder="ใส่ความฝันของคุณ..."
                onChange={(e) => setUserFeelDream(e.target.value)}
              />
              {validateDream && (
                <p style={{ fontSize: "14px", color: "red" }}>กรุณากรอก</p>
              )}
              <button
                style={{ color: "rgb(35, 129, 245)" }}
                onClick={handleNext}
                className="btn-chapter2"
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
