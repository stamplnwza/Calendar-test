import React from "react";
// นำเข้า React (ในกรณีนี้เราไม่ใช้ useState หรือ useEffect จึงแค่ import React เท่านั้น)

import "./ModalDash.css"; // นำเข้าไฟล์ CSS สำหรับจัดรูปแบบของ ModalDash

// ประกาศ Functional Component ModalDash รับ props หลักๆ ดังนี้:
// - type: ประเภทของ Modal (เช่น "ASC", "เบิก", "เคลียร์เงิน", "ชะลอ", "ไม่สมบูรณ์")
// - data: ข้อมูลรายละเอียดของแต่ละประเภทที่จะแสดงภายใน Modal
// - onClose: ฟังก์ชันสำหรับปิด Modal
// - onApprove: ฟังก์ชันสำหรับอนุมัติ (ใช้ในบางประเภทที่ต้องมีการอนุมัติ)
// - onReject: ฟังก์ชันสำหรับปฏิเสธ (ใช้ในบางประเภท)
// - onEdit: ฟังก์ชันสำหรับแก้ไขหรือดำเนินการต่อใน Modal
const ModalDash = ({ type, data, onClose, onApprove, onReject, onEdit }) => {

  // ฟังก์ชัน renderContent ใช้สำหรับแสดงเนื้อหาภายใน Modal ตามค่า type ที่ส่งเข้ามา
  const renderContent = () => {
    // ใช้ switch-case เพื่อเลือกแสดงเนื้อหาตามประเภทของ Modal
    switch (type) {
      case "ASC":
        return (
          <>
            {/* หัวข้อของ Modal เมื่อ type คือ ASC */}
            <h3>ASC รอแอดมินอนุมัติ</h3>
            {/* แสดงชื่อและจำนวนที่ดึงมาจาก data */}
            <p>ชื่อ: {data.name}</p>
            <p>จำนวน: {data.count}</p>
            {/* ส่วนปุ่มดำเนินการภายใน Modal */}
            <div className="modal-buttons">
              {/* ปุ่ม "ปิด" เพื่อเรียก onClose เมื่อผู้ใช้ต้องการปิด Modal */}
              <button onClick={onClose}>ปิด</button>
            </div>
          </>
        );

      case "เบิก":
        return (
          <>
            <h3>รายละเอียดรายการเบิกรออนุมัติ</h3>
            <p>ชื่อรายการเบิก: {data.name}</p>
            <p>จำนวนเงิน: {data.amount} บาท</p>
            <p>ผู้ขอเบิก: {data.requester}</p>
            <p>วันที่ขอเบิก: {data.date}</p>
            <p>สถานะ: {data.status}</p>
            <div className="modal-buttons">
              {/* ปุ่มอนุมัติรายการเบิก */}
              <button onClick={onApprove}>อนุมัติ</button>
              {/* ปุ่มปฏิเสธรายการเบิก */}
              <button onClick={onReject}>ปฏิเสธ</button>
              {/* ปุ่มปิด Modal */}
              <button onClick={onClose}>ปิด</button>
            </div>
          </>
        );

      case "เคลียร์เงิน":
        return (
          <>
            <h3>รายละเอียดการเคลียร์เงินรออนุมัติ</h3>
            <p>ชื่อการเคลียร์เงิน: {data.name}</p>
            <p>จำนวนเงิน: {data.amount} บาท</p>
            <p>ผู้ขอเคลียร์เงิน: {data.requester}</p>
            <p>วันที่ขอเคลียร์เงิน: {data.date}</p>
            <p>สถานะ: {data.status}</p>
            <div className="modal-buttons">
              {/* ปุ่มอนุมัติการเคลียร์เงิน */}
              <button onClick={onApprove}>อนุมัติ</button>
              {/* ปุ่มปฏิเสธการเคลียร์เงิน */}
              <button onClick={onReject}>ปฏิเสธ</button>
              <button onClick={onClose}>ปิด</button>
            </div>
          </>
        );

      case "ชะลอ":
        return (
          <>
            <h3>รายละเอียดงานที่ถูกชะลอ</h3>
            <p>ชื่องาน: {data.name}</p>
            <p>สาเหตุที่ถูกชะลอ: {data.reason}</p>
            <p>วันที่เริ่มชะลอ: {data.date}</p>
            <p>สถานะ: {data.status}</p>
            <div className="modal-buttons">
              {/* ปุ่มดำเนินการต่อ (อาจเป็นการแก้ไขหรือรีเซ็ตสถานะ) */}
              <button onClick={onEdit}>ดำเนินการต่อ</button>
              <button onClick={onClose}>ปิด</button>
            </div>
          </>
        );

      case "ไม่สมบูรณ์":
        return (
          <>
            <h3>รายละเอียดบันทึกข้อมูลไม่สมบูรณ์</h3>
            <p>ชื่อข้อมูล: {data.name}</p>
            <p>รายละเอียด: {data.details}</p>
            <p>วันที่บันทึกข้อมูล: {data.date}</p>
            <p>ผู้บันทึกข้อมูล: {data.recorder}</p>
            <p>สถานะ: {data.status}</p>
            <div className="modal-buttons">
              {/* ปุ่มแก้ไข เพื่อแก้ไขข้อมูลที่ไม่สมบูรณ์ */}
              <button onClick={onEdit}>แก้ไข</button>
              <button onClick={onClose}>ปิด</button>
            </div>
          </>
        );

      default:
        // ถ้า type ไม่ตรงกับกรณีที่กำหนดไว้ จะคืนค่า null (ไม่แสดงอะไร)
        return null;
    }
  };

  // ส่วนแสดงผลของ ModalDash Component
  return (
    // modal-overlay เป็น container พื้นหลังที่ครอบคลุมหน้าจอและช่วยเน้น Modal ให้โดดเด่น
    <div className="modal-overlay">
      {/* modal-content คือกล่องหลักของ Modal ที่แสดงเนื้อหาที่ได้จาก renderContent */}
      <div className="modal-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ModalDash;
// ส่งออก ModalDash Component เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของโปรเจกต์
