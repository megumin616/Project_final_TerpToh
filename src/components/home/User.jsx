import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../App";
import "./user.css";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../audio/Audio";

//function
import { handleNextClick } from "./function";

export default function User() {
  //function play sound
  const { isPlaying1, togglePlay1 } = useAudio();
  // สร้าง state สำหรับเก็บข้อมูลที่ป้อนเข้ามา
  const [selectedOption, setSelectedOption] = useState("");
  const { userName, setUserName, userAge, setUserAge, enterFullscreen } =
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

  // ฟังก์ชันที่เรียกใช้เมื่อผู้ใช้คลิกปุ่ม
  const handleNext = () => {
    handleNextClick({
      userName,
      userAge,
      selectedOption,
      setValidateName,
      setValidateAge,
      setValidate,
      navigate,
      enterFullscreen,
      togglePlay1,
    });
  };

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
  }, [selectedOption])

  return (
    <div className="container-user">
      <div className="user-detail">
        <div className="user-text">
          <div>
            <h1>เติบโต</h1>
          </div>
          <div>
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
