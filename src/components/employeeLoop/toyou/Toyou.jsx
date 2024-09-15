import React, { useContext, useEffect, useState } from "react";
import "./toyou.css";
import backgroundImage from "../../../images/bolivia.jpg";
import { DataContext } from "../../../App";
import qr from "../../../images/QR.jpg";
import copy from "../../../images/copy.png";
import { useAudio } from "../../audio/Audio";
import useBook from "../chapter5/books";
import dataToyou from "./dataToyou";

export default function Toyou() {
  const { userAge } = useContext(DataContext);
  const { togglePlay2 } = useAudio();

  const { recommendedBooks } = useBook();
  const { quotes, messages } = dataToyou();

  const [quote, setQuote] = useState("");
  const [floatingMessages, setFloatingMessages] = useState([]);
  const [noneDisplay, setNoneDisplay] = useState(""); // ซ่อนเนื้อหา
  const [blockDisplay, setBlockDisplay] = useState(false); // แสดงเนื้อหา about me
  const [blockDisplay2, setBlockDisplay2] = useState(false); // แสดงเนื้อหา about me
  const [booksDisplay, setBooksDisplay] = useState(false);
  const [blockDisplayBook, setBlockDisplayBook] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); //ไว้เปลี่ยนการดุหนังสือ

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const bg = backgroundImage;

  // สุ่มคำคม
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
  }, []);

  // สุ่มคำมาแสดง
  const handleClick = () => {
    // เลือกข้อความสุ่มจากอาเรย์ messages
    //ใช้ Math.random() เพื่อสุ่มเลขระหว่าง 0 และ 1 แล้วคูณด้วยความยาวของอาเรย์ messages เพื่อให้ได้ดัชนีที่สุ่ม
    //Math.floor() ใช้เพื่อลดทอนค่าให้เป็นจำนวนเต็ม
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    // สร้างข้อความใหม่ที่มี id และข้อความที่สุ่มเลือก
    const newMessage = {
      id: Date.now(), // ใช้ timestamp เพื่อให้ได้ id ที่ไม่ซ้ำ
      text: randomMessage,
    };
    // อัปเดตสถานะด้วยการเพิ่มข้อความใหม่เข้าไปในอาเรย์ข้อความเดิมด้วย
    setFloatingMessages((prevMessages) => [...prevMessages, newMessage]);

    // ให้ข้อความหายไปหลังจาก 12 วินาที
    setTimeout(() => {
      setFloatingMessages((prevMessages) =>
        // กรองออกข้อความที่มี id ตรงกับ newMessage.id
        prevMessages.filter((message) => message.id !== newMessage.id)
      );
    }, 12000);
  };

  //about me
  const changeAboutme = () => {
    setNoneDisplay("none");
    setBlockDisplay(true);
    setBooksDisplay(false);
    setBlockDisplayBook("none");
  };
  const backAboutme = () => {
    setNoneDisplay("");
    setBlockDisplayBook("");
    setBlockDisplay(false);
    setBooksDisplay(false);
    setBlockDisplay2(false);
  };
  const showbookall = () => {
    setNoneDisplay("none");
    setBooksDisplay(true);
    setBlockDisplay2(true);
  };

  // ฟังก์ชันที่ใช้สำหรับปิดป๊อปอัพเมื่อคลิกที่นอกป๊อปอัพ
  const handleOverlayClick = (e) => {
    if (e.target.className === "popup-overlay") {
      closePopup();
    }
  };

  // ฟังก์ชันคัดลอกไปยังคลิปบอร์ด
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("027-8-56359-6") // เลขบัญชีที่จะคัดลอก
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // รีเซ็ตสถานะข้อความหลังจาก 2 วินาที
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  //section handle book
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendedBooks.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recommendedBooks.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="main-container-toyou">
      <div
        className="container-toyou"
        style={{ backgroundImage: `url(${bg})` }}
      >
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
              ขอให้คุณได้อยู่กับปัจจุบัน
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

        {booksDisplay ? (
          <div className="books-card">
            <h2>{recommendedBooks[currentIndex].nameBook}</h2>
            <h4>by {recommendedBooks[currentIndex].author}</h4>
            <img
              src={recommendedBooks[currentIndex].imgBook}
              alt={recommendedBooks[currentIndex].nameBook}
              style={{ width: "200px", height: "300px" }}
            />
            <p>{recommendedBooks[currentIndex].detailBook}</p>

            <div className="btn-book-card">
              <button onClick={handlePrev}>Back</button>
              <button onClick={handleNext}>Next</button>
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

        <div
          className="btn-books fade-intoyou"
          style={{ display: blockDisplayBook }}
        >
          {blockDisplay2 ? (
            <button onClick={backAboutme}>กลับ</button>
          ) : (
            <button onClick={showbookall}>หนังสือเล่มอื่นๆ</button>
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
                  เลขบัญชี: 027-8-56359-6{" "}
                  <img onClick={copyToClipboard} src={copy} />
                  {isCopied && <span className="copy-notice">คัดลอกแล้ว!</span>}
                </p>
                <p>ชื่อบัญชี: วราเทพ ธัญญารักษ์</p>
                <p>ขอบคุณมากๆครับ!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
