import React, { useContext, useEffect, useState } from 'react'
import './chapterend.css'
import background1 from '../../../gifs/chapter3.1-work.gif'
import backgroundEnd from '../../../gifs/chapterEnd.gif'
import { DataContext } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../../audio/Audio'

export default function ChapterEnd() {
  const {togglePlay1} = useAudio();
  const {userName} = useContext(DataContext);
  const navigate = useNavigate();

  const bg1 = background1;
  const bg2 = backgroundEnd;

  const [currentLine, setCurrentLine] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // สถานะสำหรับการแสดง header
  const [backgroundImage, setBackgroundImage] = useState("");
  const [buttonShow, setButtonShow] = useState(false); // แสดงปุ่มเมื่อแสดงข้อความหมด
  const [textDisplay, setTextDisplay] = useState("");


  const content = [
    `ในที่สุด${userName}ก็กลับไปยังสถานที่ที่เขาพบกับชายชราอีกครั้ง 
    พร้อมกับเรื่องราวต่างๆในชีวิตที่${userName}ได้วาดฝัน 
    ${userName}ได้เล่าเรื่องนั้นให้ชายชราเป็นการขอบคุณและเล่าเรื่องราวการเดินทางที่ผ่านมามากมายให้ชายชราฟัง `,
    'ทั้งสองคนต่างยิ้มให้กันและรู้สึกถึงความอบอุ่นในใจ',
    `การเดินตามความฝันไม่ใช่แค่การก้าวข้ามอุปสรรคในชีวิต แต่ยังเป็นการสร้างเส้นทางใหม่ให้กับผู้ที่มีความหวัง ทุกๆ ก้าวที่คุณเดินไป 
    ทำให้คุณแข็งแกร่งขึ้นและกลายเป็นแรงบันดาลใจให้กับผู้คนรอบข้าง อย่าหยุด สู้ต่อไป!`,
  ]


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

  useEffect(() => {
    if (!showHeader) {
      setIsFading(true); // เริ่มต้นการแสดงข้อความแบบค่อยๆ ขึ้น
      const timer = setTimeout(() => {
        setIsNextEnabled(true);
      }, 3000); // หน่วงเวลา 3 วินาที

      return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูก unmount หรือ re-render
    }
  }, [showHeader, currentLine]); // ทำงานเมื่อ showHeader เปลี่ยนแปลง

  const handleNextLine = () => {
    if (currentLine < content.length - 1) {
      setIsFading(false); // ซ่อนข้อความก่อนเปลี่ยนบรรทัด
      setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setIsNextEnabled(false); // ปิดการใช้งานปุ่มถัดไปชั่วคราว
      }, 500); // รอเวลาให้การ fade-out เสร็จ (0.5 วินาที)
    }
  };

  useEffect(() => {
    if (currentLine === 1) { // เมื่อถึงบรรทัดที่ 3 (index 2)
      setBackgroundImage(`url(${bg2})`); // เปลี่ยน backgroundImage
    }
  }, [currentLine]);

  // ตรวจสอบว่าถึงบรรทัดสุดท้ายแล้ว
  useEffect(() => {
    if (currentLine === content.length - 1) { 
      setButtonShow(true);; // เรียกใช้ฟังก์ชันที่ต้องการ
    }
  }, [currentLine]); // ทำงานเมื่อ currentLine เปลี่ยนแปลง

  const handleNext = () => {
    togglePlay1();
    navigate('/toyou');
  }

  return (
    <div
      className="container-chapterend"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapterend-detail">
        <div className="detail-text">
          {showHeader && <h3>บทส่งท้าย การกลับมาสู่ตัวเอง</h3>}

          <p style={{display: textDisplay}} className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}>
            {content[currentLine]}
          </p>

          {isNextEnabled && currentLine < content.length - 1 && (
            <button className="btn-chapterend" onClick={handleNextLine}>ถัดไป</button>
          )}
          {buttonShow ? <button style={{color: 'rgb(35, 129, 245)'}} onClick={handleNext} className="btn-chapterend">ถึงคุณ</button> : ""}
        </div>
      </div>
    </div>
  )
}
