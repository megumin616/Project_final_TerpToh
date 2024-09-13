export const handleNextClick = ({
  userName,
  userAge,
  selectedOption,
  setValidateName,
  setValidateAge,
  setValidate,
  navigate,
  enterFullscreen,
  togglePlay1,
}) => {
  // ฟังก์ชันตรวจสอบข้อมูลและนำทางไปยังหน้าใหม่
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
      enterFullscreen();
      togglePlay1();
      navigate("/chapter1"); // นำทางไปยังหน้าที่ชื่อ "chapter1"
    } else if (selectedOption === "นักศึกษา") {
      enterFullscreen();
      togglePlay1();
      navigate("/student1"); // นำทางไปยังหน้าที่ชื่อ "anotherPage" (ระบุเส้นทางที่ต้องการ)
    }
  }
};
