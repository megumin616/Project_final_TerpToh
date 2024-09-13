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

  const [messageIndex, setMessageIndex] = useState(8);
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

  // ##เลือกคำตอบจากตัวเลือกของผู้ใช้
  const handleAnswer = (value) => {
    setFadeClass("");
    setShowAsk1(false);

    if (value === 1) {
      setSelectedAnswer(`ดีใจที่คุณรู้สึกแฮปปี้นะ! การมีช่วงเวลาที่สนุกสนานและมีความสุขนั้นมีคุณค่ามาก <br>
        เพราะมันทำให้เราได้ชาร์จพลังและพร้อมสำหรับวันต่อไป <br>
        ขอให้ความรู้สึกดี ๆ นี้อยู่กับคุณไปนาน ๆ <br>
        และขอให้คุณได้พบเจอช่วงเวลาที่น่าจดจำในทุกๆ วันนะ!`);
    } else if (value === 2) {
      setSelectedAnswer(`ไม่เป็นไรเลยที่คุณรู้สึกเฉย ๆ บางครั้งเราทุกคนก็มีช่วงเวลาที่เรียบง่ายและสงบเงียบ <br> 
        แต่อย่าลืมว่ายังมีโอกาสให้คุณได้ลองสิ่งใหม่ ๆ <br>
        หรือค้นหาสิ่งที่ทำให้ใจคุณตื่นเต้นและสนุกสนานมากขึ้นนะ <br>
        ชีวิตเต็มไปด้วยความเป็นไปได้เสมอ!`);
    } else if (value === 3) {
      setSelectedAnswer(`เข้าใจว่าความเบื่อสามารถเกิดขึ้นได้กับทุกคน<br> 
        แต่อย่าลืมว่านี่อาจเป็นสัญญาณให้คุณลองเปลี่ยนแปลงบางสิ่ง ลองทำสิ่งใหม่ ๆ ที่คุณยังไม่เคยทำ <br>
        หรือหาโอกาสในการสร้างสรรค์และท้าทายตัวเอง <br>
        คุณอาจค้นพบความสุขหรือแรงบันดาลใจใหม่ ๆ ที่รอคุณอยู่นะ!`);
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

  // ในคำถามที่ 2 เมื่อผู้ใช้เลือก "ใช้เวลากับเพื่อนมาก หรือ กับแฟนมาก" จะใช้ฟังชั้นนี้
  const handleAnswer2 = () => {
    setShowAsk2(false);
    setAnswerDisplay2("block");
    setMessageIndex(0);
    setFadeClass(""); // รีเซ็ตคลาสการจาง
    const timer = setTimeout(() => {
      setShowButtonNextAsk2(true);
    }, 24000);
    return () => clearTimeout(timer);
  };
  // ในคำถามที่ 2 เมื่อผู้ใช้เลือก "ตอบอะไรก็ตาม" จะใช้ฟังชั้นนี้
  const handleAnswer2_1 = () => {
    if (people === "") {
      setMesVal(true); // ใช้กันว่า ถ้าไม่ใส่ค่าอะไรมาเลย จะขึ้นบอก
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

  // const messages = [
  //   "อย่าลืมนะว่า คุณจะกลายเป็นคนที่คุณใช้เวลาด้วยมากที่สุด เพราะพลังงานของคุณและเขาเหมือนกัน",
  //   "แต่คุณดีกว่านี้ได้ เจอคนที่ดีกว่านี้ได้ กำหนดสังคมและเส้นทางของตัวเองดีกว่านี้ได้",
  //   "เพียงแค่คุณเริ่มต้นที่จะ 'คิดบวก' และวาดชีวิตในแบบที่ตัวคุณเองต้องการ",
  //   "ฉันเชื่อว่าคุณทำได้",
  // ];
  const messages = [
    "การที่คุณเลือกใช้เวลาร่วมกับใครบางคนมากเป็นพิเศษ",
    "แสดงถึงความสำคัญและความเชื่อมโยงที่คุณมีต่อกัน",
    "อย่าลืมว่า คุณจะกลายเป็นคนที่คุณใช้เวลาด้วยมากที่สุด",
    "เพราะพลังงานของคุณและเขาก็จะคล้ายกัน",
    "แต่คุณมีโอกาสเสมอที่จะเป็นคนที่ดีกว่านี้ เจอคนที่ดีกว่านี้",
    "และกำหนดสังคมและเส้นทางของตัวเองให้ดีกว่านี้ได้",
    "แค่เริ่มต้นด้วยการ 'คิดบวก' และวาดชีวิตในแบบที่คุณต้องการ",
    "ฉันเชื่อมั่นว่าคุณทำได้!",
  ];

  // ##แสดงเนื้อหาแบบทีละส่วนของ messages
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
  }, [messageIndex]);

  return (
    <div
      className="container-chapter4"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="chapter4-detail" style={{ display: chapterDetail }}>
        <div className="detail-text">
          {showHeader && <h3>บทที่ 4 การตัดสินใจที่ยากลำบาก</h3>}

          <p
            id="detail-p-chapter4"
            className={`fade-text ${isFading ? "fade-in" : "fade-out"}`}
          >
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

      {/* คำถามที่ 1 ของผู้ใช้ */}
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

      {/* คำตอบของผู้ใช้ ในคำถามที่ 1 */}
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

      {/* คำถามที่ 2 ของผู้ใช้ */}
      {showAsk2 ? (
        <div className="question-chapter4">
          <p>
            นอกจากครอบครัวและตัวฉันเองแล้ว
            ฉันใช้เวลาร่วมกับใครมากที่เป็นพิเศษไหม?
          </p>
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
          </div>
        </div>
      ) : (
        ""
      )}

      {/* คำตอบของผู้ใช้ ในคำถามที่ 2 */}
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

      {/* คำถามที่ 3 ของผู้ใช้ */}
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

      {/* คำตอบของผู้ใช้ ในคำถามที่ 3 */}
      {contentAsk3 ? (
        <div className="question-chapter4">
          <p className={`fade-content`}>
            ความกลัวเป็นสิ่งที่เกิดขึ้นกับทุกคน
            <br /> มันเป็นสัญญาณว่าเรากำลังเผชิญกับสิ่งที่ไม่เคยเจอมาก่อน
            <br /> ซึ่งเป็นส่วนหนึ่งของการเติบโตและการเรียนรู้
            <br /> อย่าปล่อยให้ความกลัวนั้นหยุดคุณจากการก้าวไปข้างหน้า
            <br />{" "}
            แต่จงใช้มันเป็นแรงผลักดันในการสร้างความเปลี่ยนแปลงในชีวิตของคุณ
            <br /> ให้คุณก้าวออกจากเขตสบายและไปยังที่ที่คุณไม่เคยไป
            <br /> เพราะบางครั้ง การก้าวผ่านความกลัวนั้นเอง
            <br /> คือการเปิดประตูสู่สิ่งที่ยิ่งใหญ่กว่าที่เราคาดคิดไว้
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
