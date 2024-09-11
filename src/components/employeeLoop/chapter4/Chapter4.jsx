import React, { useContext, useEffect, useState } from "react";
import "./chapter4.css";
import { DataContext } from "../../../App";
import background from "../../../gifs/chapter4-work.gif";
import background1 from "../../../gifs/chapter4.1-work.gif";
import { useNavigate } from "react-router-dom";

export default function Chapter4() {
  const { userName } = useContext(DataContext);

  const bg = background;
  const bg1 = background1;

  const navigate = useNavigate();

  const content = `${userName} ได้กลับมาที่ห้องและตั้งคำถามกับตัวเองว่า...`;

  const [isFading, setIsFading] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // สถานะสำหรับการแสดง header
  const [backgroundImage, setBackgroundImage] = useState("");
  const [buttonShow, setButtonShow] = useState(false); // แสดงปุ่มเมื่อแสดงข้อความหมด
  const [showAsk1, setShowAsk1] = useState(false); // แสดงส่วน ask
  const [showAsk2, setShowAsk2] = useState(false); // แสดงส่วน ask
  const [showAsk3, setShowAsk3] = useState(false); // แสดงส่วน ask
  const [chapterDetail, setChapterDetail] = useState(""); // display none chapter-detail
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswer2, setSelectedAnswer2] = useState("");
  const [showButtonNextAsk, setShowButtonNextAsk] = useState(false);
  const [showButtonNextAsk2, setShowButtonNextAsk2] = useState(false);
  const [showButtonNextAsk3, setShowButtonNextAsk3] = useState(false);
  const [people, setPeople] = useState("");
  const [people2, setPeople2] = useState("");

  const [answerDisplay1, setAnswerDisplay1] = useState("");
  const [answerDisplay2, setAnswerDisplay2] = useState("none");
  const [answerDisplay3, setAnswerDisplay3] = useState("");

  const [messageIndex, setMessageIndex] = useState(4);
  const [fadeClass, setFadeClass] = useState("");
  const [contentAsk3, setContentAsk3] = useState(false); //แสดงข้อความ อันสุดท้าย

  const [mesVal, setMesVal] = useState(false); //ไว้สำหรับถ้าไม่ได้ใส่ค่าในช่อง input
  console.log("mess", selectedAnswer2);

  // ใช้ effect สำหรับแสดง header 4 วินาทีเมื่อเปิดหน้าครั้งแรก
  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setShowHeader(false);
    }, 4000); // 4 วินาที
    return () => clearTimeout(headerTimer);
  }, []);

  useEffect(() => {
    if (!showHeader) {
      const bgTimer = setTimeout(() => {
        setBackgroundImage(`url(${bg})`);
      }, 200); // เริ่มต้นทันทีหลังจากที่ header ซ่อน
      return () => clearTimeout(bgTimer);
    }
  }, [showHeader]);

  // ใช้ effect สำหรับหน่วงเวลาในการแสดงข้อความ content หลังจากที่ header ถูกซ่อน
  useEffect(() => {
    if (!showHeader) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setButtonShow(true);
      }, 500); // หน่วงเวลา 2 วินาที

      return () => clearTimeout(timer);
    }
  }, [showHeader]);

  const handleAsk = () => {
    setButtonShow(false);
    setChapterDetail("none");
    setShowAsk1(true);
  };

  const handleAnswer = (value) => {
    setFadeClass("");
    setShowAsk1(false);

    if (value === 1) {
      setSelectedAnswer(`อย่างน้อยตัวคุณ ก็พึงพอใจกับชีวิตที่เป็นอยู่ <br>
  ได้ใช้เวลาส่วนหนึ่งไปกับสิ่งที่คุณรักและหลงใหล <br> ซึ่งมันดีมากนะ ทำต่อไป!`);
    } else if (value === 2) {
      setSelectedAnswer(`ถึงแม้ตอนนี้คุณอาจจะไม่เอ็นจอยกับอะไรเป็นพิเศษ <br>
  แต่มีบางสิ่งที่คุณสามารถทำให้ดีขึ้นได้ สิ่งๆนั้นซ่อนอยู่ในตัวคุณเสมอมา <br>
  สิ่งนั้น รอคุณค้นพบมันอยู่นะ`);
    } else if (value === 3) {
      setSelectedAnswer(`ถึงแม้ตอนนี้อาจจะไม่สนุกแต่ก็อาจมีบางสิ่งที่คุณสามารถทำให้ดีขึ้นได้ <br>
  สิ่งๆนั้นซ่อนอยู่ในตัวคุณเสมอมา สิ่งนั้น รอคุณค้นพบมันอยู่นะ <br> และท้ายที่สุดคุณจะพบมันอย่างแน่นอน`);
    }

    // ตั้งค่าหน่วงเวลาสำหรับการแสดงเอฟเฟกต์ fade-in
    setTimeout(() => {
      setFadeClass("fade-in"); // ตั้งคลาส fade-in เพื่อแสดง transition
    }, 100); // หน่วงเวลาสั้นๆ เพื่อให้การรีเซ็ตคลาสทำงาน

    const timer = setTimeout(() => {
      setShowButtonNextAsk(true);
    }, 4000);
    return () => clearTimeout(timer);
  };

  // funciton เปลี่ยนคำถาม
  const handleNextAsk = () => {
    setShowButtonNextAsk(false);
    setAnswerDisplay1("none");
    setShowAsk2(true);
  };
  const handleNextAsk2 = () => {
    setShowButtonNextAsk2(false);
    setAnswerDisplay2("none");
    setShowAsk3(true);
  };
  const handleNextAsk3 = () => {
    if (people2 === "") {
      setMesVal(true);
    } else {
      setMesVal(false);
      setAnswerDisplay3("none");
      setBackgroundImage(`url(${bg1})`);

      // Timer แรกเพื่อแสดงเนื้อหา
      const timer = setTimeout(() => {
        setContentAsk3(true);

        // Timer ที่สองเพื่อแสดงปุ่มหลังจากเนื้อหาแสดงแล้ว
        const timer2 = setTimeout(() => {
          setShowButtonNextAsk3(true);
        }, 6000);

        // ล้าง timer2 เมื่อจำเป็น
        return () => clearTimeout(timer2);
      }, 3500);

      // ล้าง timer เมื่อจำเป็น
      return () => clearTimeout(timer);
    }
  };
  const handleNextChapter = () => {
    navigate("/chapter5");
  };

  const handleAnswer2 = () => {
    setShowAsk2(false);
    setAnswerDisplay2("block");
    setMessageIndex(0);
    setFadeClass(""); // รีเซ็ตคลาสการจาง
    const timer = setTimeout(() => {
      setShowButtonNextAsk2(true);
    }, 12000);
    return () => clearTimeout(timer);
  };
  const handleAnswer2_1 = () => {
    if (people === "") {
      setMesVal(true);
    } else {
      setMesVal(false);
      setShowAsk2(false);
      setAnswerDisplay2("block");
      setMessageIndex(0);
      setFadeClass(""); // รีเซ็ตคลาสการจาง
      const timer = setTimeout(() => {
        setShowButtonNextAsk2(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  };

  const messages = [
    "อย่าลืมนะว่า คุณจะกลายเป็นคนที่คุณใช้เวลาด้วยมากที่สุด เพราะพลังงานของคุณและเขาเหมือนกัน",
    "แต่คุณดีกว่านี้ได้ เจอคนที่ดีกว่านี้ได้ กำหนดสังคมและเส้นทางของตัวเองดีกว่านี้ได้",
    "เพียงแค่คุณเริ่มต้นที่จะ 'คิดบวก' และวาดชีวิตในแบบที่ตัวคุณเองต้องการ",
    "ฉันเชื่อว่าคุณทำได้",
  ];

  useEffect(() => {
    if (messageIndex < messages.length) {
      // รีเซ็ตคลาสก่อนการแสดงข้อความใหม่
      setFadeClass("");

      // หน่วงเวลาเล็กน้อยเพื่อให้เบราว์เซอร์จับการเปลี่ยนแปลงได้
      const fadeTimeoutId = setTimeout(() => {
        setFadeClass("fade-in");

        // เพิ่มข้อความใหม่หลังจากหน่วงเวลา
        const messageTimeoutId = setTimeout(() => {
          setSelectedAnswer2(
            (prev) => prev + messages[messageIndex] + "<br />"
          );
          setMessageIndex((prev) => prev + 1);
        }, 2500); // หน่วงเวลา 2 วินาทีเพื่อแสดงข้อความ

        // เคลียร์ timeout เมื่อลบ component
        return () => clearTimeout(messageTimeoutId);
      }, 100); // หน่วงเวลาสั้นๆ เพื่อให้ fade-in ทำงานได้

      // เคลียร์ timeout เมื่อลบ component
      return () => clearTimeout(fadeTimeoutId);
    }
    // const timer = setTimeout(() => {
    //   setShowButtonNextAsk2(true);
    // }, 11000);
    // return () => clearTimeout(timer);
  }, [messageIndex]);

  return (
    <div
      className="container-chapter4"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapter4-detail" style={{ display: chapterDetail }}>
        <div className="detail-text">
          {showHeader && <h3>บทที่ 4 การตัดสินใจที่ยากลำบาก</h3>}

          <p id="detail-p-chapter4" className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}>
            {content}
          </p>
          {buttonShow ? (
            <button onClick={handleAsk} className="btn-chapter4">
              ถัดไป
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {showAsk1 ? (
        <div className="question-chapter4">
          <p>ฉันสนุกกับการใช้เวลาในช่วงที่ผ่านมานี้ไหม?</p>
          <div className="btn-qsk">
            <button onClick={() => handleAnswer(1)}>ฉันแฮปปี้มาก</button>
            <button onClick={() => handleAnswer(2)}>ฉันรู้สึกเฉยๆ</button>
            <button onClick={() => handleAnswer(3)}>ฉันรู้สึกเบื่อ</button>
          </div>
        </div>
      ) : (
        ""
      )}

      {selectedAnswer && (
        <div className="answer-container" style={{ display: answerDisplay1 }}>
          <p
            className={`answer-detail ${fadeClass}`}
            dangerouslySetInnerHTML={{ __html: selectedAnswer }}
          />
          {showButtonNextAsk ? (
            <button onClick={handleNextAsk}>ถัดไป</button>
          ) : (
            ""
          )}
        </div>
      )}

      {showAsk2 ? (
        <div className="question-chapter4">
          <p>นอกจากครอบครัวและตัวฉันเองแล้ว ฉันใช้เวลาร่วมกับใครมากที่เป็นพิเศษไหม?</p>
          <div className="btn-qsk">
            <button onClick={handleAnswer2}>เพื่อนของฉัน</button>
            <button onClick={handleAnswer2}>แฟนของฉัน</button>
            <div>
              <input
                onChange={(e) => setPeople(e.target.value)}
                placeholder="คนอื่นๆ / ไม่มี ใส่คำตอบได้ที่นี่..."
              />
              {mesVal ? (
                <p
                  style={{
                    fontSize: "10px",
                    color: "red",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  ใส่คำตอบของคุณ
                </p>
              ) : (
                ""
              )}
              <button onClick={handleAnswer2_1}>บันทึก</button>
            </div>
            {/* <button onClick={() => handleAnswer(3)}>ฉันไม่รู้สึกเบื่อ</button> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {selectedAnswer2 && (
        <div className="answer-container" style={{ display: answerDisplay2 }}>
          <p
            className={`answer-detail message-detail ${fadeClass}`}
            dangerouslySetInnerHTML={{ __html: selectedAnswer2 }}
          />
          {showButtonNextAsk2 ? (
            <button onClick={handleNextAsk2}>ถัดไป</button>
          ) : (
            ""
          )}
        </div>
      )}

      {showAsk3 ? (
        <div className="question-chapter4" style={{ display: answerDisplay3 }}>
          <p>สุดท้ายนี้ ความกลัวที่ขัดขวางฉันไม่ให้ก้าวหน้า คืออะไร?</p>
          <div className="btn-qsk">
            <input
              onChange={(e) => setPeople2(e.target.value)}
              placeholder="ใส่คำตอบของคุณ..."
            />
            <button onClick={handleNextAsk3}>บันทึก</button>
          </div>
          {mesVal ? (
            <p
              style={{
                fontSize: "12px",
                color: "red",
                margin: "0",
                padding: "0",
              }}
            >
              ใส่คำตอบของคุณ
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {contentAsk3 ? (
        <div className="question-chapter4">
          <p className={`fade-content`}>
            ความกลัวเป็นส่วนหนึ่งของการเติบโต
            <br /> อย่าปล่อยให้มันหยุดคุณจากความก้าวไปข้างหน้า
            <br /> ฉันเชื่อว่าคุณกล้าที่จะเผชิญกับมัน แล้วคุณจะพบว่า
            <br /> ความกลัวนั้นเล็กน้อยเพียงใด
          </p>
          {showButtonNextAsk3 ? (
            <button onClick={handleNextChapter}>ถัดไป</button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
