import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userName, userAge, selectedOption } = useContext(DataContext);
  const location = useLocation();

  // ตรวจสอบว่าข้อมูลครบหรือยัง
//   const isDataComplete = userName && userAge && selectedOption;
    const isDataComplete = userName && userAge;

  // ถ้าข้อมูลไม่ครบถ้วน ให้นำทางผู้ใช้กลับไปที่หน้า /user
  if (!isDataComplete) {
    return <Navigate to="/user" replace state={{ from: location }} />;
  }

  // ถ้าข้อมูลครบถ้วน ให้นำผู้ใช้ไปยังหน้า /chapter1 หรือแสดง children ตามปกติ
  return children ? children : <Navigate to="/chapter1" replace />;
};

export default ProtectedRoute;
