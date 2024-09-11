import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/user");
  };
  return (
    <div className="container-home">
      <div className="home-detail">
        <div className="home-text">
          <h3>**คำแนะนำ**</h3>
          <p style={{margin: '1rem'}}>
            (แนะนำให้เปิดเว็บบนอุปกรณ์มือถือ) <br/>
            เว็บไซต์นี้นำเสนอเนื้อหาที่เกี่ยวข้องกับอารมณ์ความฝันและความทรงจำ
            หากคุณยังไม่พร้อมรับมือกับอารมณ์ที่อาจเกิดขึ้นหรือมีประสบการณ์ที่ไม่ต้องการนึกถึง
            ขอให้พิจารณาให้รอบคอบก่อนเริ่มต้นใช้งาน
          </p>
          <p style={{margin: '2rem'}}>
            หากคุณรู้สึกไม่สบายใจระหว่างการใช้งาน คุณสามารถหยุดพักได้ทุกเมื่อ
            การดูแลจิตใจของตนเองเป็นสิ่งสำคัญที่สุด
          </p>
          <p style={{ fontSize: "16px" }}>
            *เว็บไซต์นี้เป็นการออกแบบการเล่าเรื่องเชิงสร้างสรรค์ให้ผู้ใช้ได้มีส่วนร่วม
            ไม่ใช่แบบทดสอบทางจิตวิทยาหรือการพยากรณ์ใด ๆ*
          </p>
          <button style={{margin: '1rem'}} onClick={handleNext}>แตะเพื่อไปต่อ</button>
        </div>
      </div>
    </div>
  );
}
