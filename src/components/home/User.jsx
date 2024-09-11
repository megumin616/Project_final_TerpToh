import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../../App";
import "./user.css";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../audio/Audio";

export default function User() {
  //function play sound
  const {isPlaying1,togglePlay1 } = useAudio();
  // สร้าง state สำหรับเก็บข้อมูลที่ป้อนเข้ามา
  const [selectedOption, setSelectedOption] = useState("");
  const { userName, setUserName, userAge, setUserAge } =
    useContext(DataContext);

  // สร้าง state สำหรับตรวจสอบความถูกต้องของข้อมูล
  const [validate, setValidate] = useState(false);
  const [validateName, setValidateName] = useState(false);
  const [validateAge, setValidateAge] = useState(false);

  // ใช้ useNavigate จาก react-router-dom เพื่อทำการนำทาง
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ select
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // ฟังก์ชันตรวจสอบข้อมูลและนำทางไปยังหน้าใหม่
  const handleNext = () => {
    togglePlay1();
    let isValid = true;

    // ตรวจสอบชื่อ
    if (userName.trim() === "") {
      setValidateName(true); // ตั้งค่า validateName เป็น true หากชื่อว่างเปล่า
      isValid = false;
    } else {
      setValidateName(false); // ตั้งค่า validateName เป็น false หากชื่อไม่ว่าง
    }

    // ตรวจสอบอายุ
    if (userAge.trim() === "" || isNaN(userAge)) {
      setValidateAge(true); // ตั้งค่า validateAge เป็น true หากอายุไม่ถูกต้อง
      isValid = false;
    } else {
      setValidateAge(false); // ตั้งค่า validateAge เป็น false หากอายุถูกต้อง
    }

    // ตรวจสอบตัวเลือก
    if (selectedOption === "") {
      setValidate(true); // ตั้งค่า validate เป็น true หากตัวเลือกไม่ถูกเลือก
      isValid = false;
    } else {
      setValidate(false); // ตั้งค่า validate เป็น false หากตัวเลือกถูกเลือก
    }

    // นำทางไปยังหน้าถัดไปหากข้อมูลทั้งหมดถูกต้อง
    if (isValid) {
      if (selectedOption === "วัยทำงาน") {
        navigate("/chapter1"); // นำทางไปยังหน้าที่ชื่อ "chapter1"
      } else if (selectedOption === "นักศึกษา") {
        navigate(""); // นำทางไปยังหน้าที่ชื่อ "anotherPage" (ระบุเส้นทางที่ต้องการ)
      }
    }
  };

  return (
    <div className="container-user">
      <div className="user-detail">
        <div className="user-text">
          <div>
            <h1>เติบโต</h1>
          </div>
          <div >
            {/* ช่องกรอกชื่อ */}
            <p>ชื่อ</p>
            <input
              type="text"
              placeholder="ใส่ชื่อเล่นของคุณ"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // อัพเดตค่า userName เมื่อมีการเปลี่ยนแปลง
            />
            {validateName && (
              <p style={{ fontSize: "14px", color: "red" }}>กรุณากรอกชื่อ</p>
            )}
            {/* ช่องกรอกอายุ */}
            <p style={{ marginTop: "1rem" }}>อายุ</p>
            <input
              type="number"
              placeholder="ใส่อายุของคุณ"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)} // อัพเดตค่า userAge เมื่อมีการเปลี่ยนแปลง
            />
            {validateAge && (
              <p style={{ fontSize: "14px", color: "red" }}>
                กรุณากรอกอายุให้ถูกต้อง
              </p>
            )}
            {/* ตัวเลือก */}
            <div className="select-user" style={{ marginTop: "1rem" }}>
              <p>คุณกำลังอยู่ในช่วง</p>
              <select value={selectedOption} onChange={handleChange}>
                <option value="">เลือก...</option>
                <option value="นักศึกษา">นักศึกษา</option>
                <option value="วัยทำงาน">วัยทำงาน</option>
              </select>
              {validate && (
                <p style={{ fontSize: "14px", color: "red" }}>
                  คุณยังไม่ได้เลือก
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <button onClick={handleNext}>ไปต่อ</button>{" "}
        </div>
      </div>
    </div>
  );
}
