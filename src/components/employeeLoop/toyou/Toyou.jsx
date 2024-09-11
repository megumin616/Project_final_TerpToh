import React, { useContext, useEffect, useState } from "react";
import "./toyou.css";
import backgroundImage from "../../../images/bolivia.jpg";
import { DataContext } from "../../../App";
import qr from '../../../images/QR.jpg';
import copy from '../../../images/copy.png';
import { useAudio } from "../../audio/Audio";

const quotes = [
  "อย่าเสียเวลาไปกับสิ่งที่ไม่สามารถควบคุมได้ ใช้เวลาให้เกิดประโยชน์กับสิ่งที่คุณสามารถทำได้",
  "ความล้มเหลวเป็นส่วนหนึ่งของความสำเร็จ อย่ากลัวที่จะล้ม แล้วคุณจะเติบโต",
  "การเริ่มต้นใหม่ในวันนี้ อาจจะเป็นการตัดสินใจที่ดีที่สุดในชีวิตของคุณ",
  "ชีวิตคือการเดินทาง ไม่ใช่การเร่งรีบ ไปทีละก้าวให้เต็มที่",
  "อย่าปล่อยให้ความกลัวเป็นตัวกำหนดการตัดสินใจ ใช้หัวใจและความกล้าในการนำทาง",
  "ความสุขไม่ได้มาจากการได้ทุกอย่าง แต่มาจากการชื่นชมทุกสิ่งที่มี",
  "การเปลี่ยนแปลงเริ่มต้นที่ตัวคุณ จงกล้าที่จะเปลี่ยนแปลงเพื่อตัวเองและชีวิตที่ดีกว่า",
  "ไม่มีเส้นทางไหนที่เรียบง่าย แต่ทุกเส้นทางมีค่าถ้าคุณเดินไปด้วยความหวังและศรัทธา",
  "ชีวิตไม่ได้วัดจากจำนวนครั้งที่เราหายใจ แต่วัดจากจำนวนครั้งที่ทำให้เรารู้สึกตื่นเต้น",
  "ความรักและความเมตตาเป็นพลังที่แข็งแกร่งที่สุดที่เรามี ใช้พลังเหล่านี้ในการเปลี่ยนโลก",
];

const messages = [
  "ไม่เคยยอมแพ้แม้จะเผชิญกับความยากลำบาก",
  "กล้าที่จะเผชิญหน้ากับความกลัว",
  "ยังคงเชื่อในศักยภาพของตัวเอง",
  "ให้โอกาสตัวเองในการเริ่มต้นใหม่เสมอ",
  "รักและดูแลตัวเองอย่างดี",
  "ยิ้มให้กับทุกความท้าทาย",
  "ฟังเสียงของหัวใจและทำตามความฝัน",
  "พยายามเป็นคนที่ดีกว่าเดิมในทุกๆ วัน",
  "เลือกที่จะมองหาความสุขในสิ่งเล็กๆ",
  "ให้อภัยตัวเองและผู้อื่นได้",
  "เชื่อมั่นในพลังของการเปลี่ยนแปลง",
  "ใส่ใจและรักคนรอบข้าง",
  "ยังคงมีความหวังในวันที่มืดมน",
  "พัฒนาตัวเองเพื่อสิ่งที่ดีกว่าเสมอ",
  "สร้างความสุขให้กับตัวเองและผู้อื่น",
  "เรียนรู้จากความผิดพลาดและเติบโต",
  "กล้าที่จะเป็นตัวของตัวเอง",
  "ฟังความต้องการของใจอย่างแท้จริง",
  "เป็นกำลังใจให้ตัวเองเสมอ",
  "กล้าที่จะออกจากเขตความสบาย",
  "ให้คุณค่ากับตัวเองในทุกๆ สถานการณ์",
  "พยายามที่จะเป็นคนที่เข้าใจคนอื่นมากขึ้น",
  "ค้นพบสิ่งที่รักและลงมือทำอย่างจริงจัง",
  "ยังคงมองหาความงามในทุกๆ วัน",
  "สร้างพลังบวกให้กับตัวเอง",
  "ตัดสินใจที่จะแข็งแกร่งเมื่ออ่อนแอ",
  "เลือกที่จะรักตัวเองในแบบที่เป็น",
  "ไม่ยอมให้ความท้าทายทำให้ล้มเหลว",
  "รักษาความสุขและความสงบในใจ",
  "เชื่อว่าอนาคตที่ดีกว่ายังรออยู่ข้างหน้า",
];

export default function Toyou() {
  const { userAge } = useContext(DataContext);
  const {isPlaying2,togglePlay2 } = useAudio();

  const [quote, setQuote] = useState("");
  const [currentMessage, setCurrentMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [floatingMessages, setFloatingMessages] = useState([]);
  const [noneDisplay, setNoneDisplay] = useState(""); // ซ่อนเนื้อหา
  const [blockDisplay, setBlockDisplay] = useState(false); // แสดงเนื้อหา about me

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const bg = backgroundImage;

  const handleClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const newMessage = {
      id: Date.now(), // ใช้ timestamp เพื่อให้ได้ id ที่ไม่ซ้ำ
      text: randomMessage,
    };

    setFloatingMessages((prevMessages) => [...prevMessages, newMessage]);

    // ให้ข้อความหายไปหลังจาก 3 วินาที
    setTimeout(() => {
      setFloatingMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== newMessage.id)
      );
    }, 12000);
  };

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  //เล่นเพลงเมื่อเปิดหน้านี้
  useEffect(() => {
    const timers = setTimeout(() => {
      togglePlay2();
    }, 2000);
    return () => clearTimeout(timers);
  }, [])

  //about me
  const changeAboutme = () => {
    setNoneDisplay("none");
    setBlockDisplay(true);
  };
  const backAboutme = () => {
    setNoneDisplay("");
    setBlockDisplay(false);
  };

    // ฟังก์ชันที่ใช้สำหรับปิดป๊อปอัพเมื่อคลิกที่นอกป๊อปอัพ
    const handleOverlayClick = (e) => {
      if (e.target.className === 'popup-overlay') {
        closePopup();
      }
    };

      // ฟังก์ชันคัดลอกไปยังคลิปบอร์ด
  const copyToClipboard = () => {
    navigator.clipboard.writeText('027-8-56359-6') // เลขบัญชีที่จะคัดลอก
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // รีเซ็ตสถานะข้อความหลังจาก 2 วินาที
      })
      .catch((err) => console.error('Failed to copy!', err));
  };

  return (
    <div className="container-toyou" style={{ backgroundImage: `url(${bg})` }}>
      <div className="toyou-detail" style={{ display: noneDisplay }}>
        <div className="detail-text fade-intoyou">
          <p id="toyou-p">ข้อความจากชายชรา</p>
          {quote}
        </div>
        <span className="fade-intoyou">
          นี่คืออายุของคุณ "{userAge}" และไม่มีคำว่าสายในการจะเริ่มต้นใหม่
        </span>
      </div>

      {floatingMessages.map((message) => (
        <div
          key={message.id}
          className="floating-message"
          style={{ display: noneDisplay }}
        >
          {message.text}
        </div>
      ))}
      <div
        className="btn-toyou-thankyou fade-intoyou"
        style={{ marginBottom: "4rem" }}
      >
        <button style={{ display: noneDisplay }} onClick={handleClick}>
          ขอบคุณตัวฉันที่..
        </button>
      </div>

      {blockDisplay ? (
        <div className="profile-card">
          {/* <img src="your-image.jpg" alt="Profile Picture" className="profile-image"/> */}
          <h1 className="name">ชื่อ: Warathep Tanyaruk</h1>
          <p className="age">อายุ: 22</p>
          <p className="education">สถานที่ศึกษา: RBRU</p>
          <p className="about-profile">
            สวัสดีครับ ผมชื่อเล่นว่าต้นนะครับ
            ผมตั้งใจจัดทำเว็บไซต์นี้ขึ้นมาด้วยความจริงใจและความมุ่งมั่นจากความรู้สึกสับสนและความท้าทายที่เคยเผชิญหน้ามาก่อนในชีวิตของตัวเอง
            ตัวผมเองเป็นคนที่รักความสงบมาก
            ชอบที่จะอยู่ในโลกของหนังสือและใช้เวลาอยู่กับตัวเอง
            ทบทวนความคิดและความรู้สึก
            ผมพบว่าช่วงเวลาเหล่านั้นมักจะเป็นช่วงเวลาที่มีคุณค่า
            ช่วยให้เราได้กลับมามองเห็นตัวเองอย่างแท้จริง
            ผมหวังว่าเว็บไซต์นี้จะเป็นพื้นที่เล็ก ๆ
            ที่ช่วยให้คุณได้หยุดพักจากความวุ่นวายในชีวิตประจำวัน
            และได้กลับมาทบทวนสิ่งที่สำคัญในชีวิตของคุณเอง
            ขอให้เราทุกคนได้อยู่กับปัจจุบัน
            ด้วยความรู้สึกขอบคุณและมุ่งมั่นที่จะใช้ชีวิตในทุกช่วงเวลาให้มีความสุขอย่างแท้จริง
            เพราะในท้ายที่สุดแล้ว ความสุขไม่ได้มาจากภายนอก
            แต่มาจากภายในจิตใจของเราเอง
          </p>
          <div className="contact-profile">
            <h2>ช่องทางติดต่อ</h2>
            <div className="contantflex">
              <a>Email: toncom616@gmail.com</a>
              <a>Ig: warathep61</a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="btn-aboutme fade-intoyou">
        {blockDisplay ? (
          <button onClick={backAboutme}>กลับ</button>
        ) : (
          <button onClick={changeAboutme}>ผู้จัดทำเว็บ</button>
        )}
      </div>

      {blockDisplay ? (
        <div className="btn-aboutme2">
          <button onClick={openPopup}>สนับสนุนค่ากาแฟ</button>
        </div>
      ) : (
        ""
      )}

      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              ✖
            </button>
            <div className="qr-container">
              <img src={qr} alt="QR Code" />
              <p>ธนาคาร: กสิกรไทย</p>
              <p className="copyable">
                เลขบัญชี: 027-8-56359-6 <img onClick={copyToClipboard} src={copy}/>
              {isCopied && <span className="copy-notice">คัดลอกแล้ว!</span>}
              </p>
              <p>ชื่อบัญชี: วราเทพ ธัญญารักษ์</p>
              <p>ขอบคุณมากๆครับ!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
