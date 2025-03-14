import React, { useState } from "react"; 
// นำเข้า React พร้อมกับ hook useState สำหรับจัดการ state ภายใน component

import "./ModalCalendar.css"; 
// นำเข้าไฟล์ CSS สำหรับจัดการสไตล์ของ modal

// ประกาศ Component ModalCalendar รับ props หลักๆ ได้แก่ event, editMode, onClose, onSave, onDelete, onEdit
const ModalCalendar = ({ event, editMode, onClose, onSave, onDelete, onEdit }) => {
  // สร้าง state eventName สำหรับเก็บชื่อกิจกรรม โดยถ้ามีข้อมูล event อยู่แล้ว (เช่นในโหมดดูหรือแก้ไข) จะใช้ event.title มิฉะนั้นจะเป็นสตริงว่าง
  const [eventName, setEventName] = useState(event?.title || ""); 
  // สร้าง state selectedColor สำหรับเก็บค่าสีที่เลือก โดยถ้ามี event อยู่แล้วจะใช้ event.color มิฉะนั้นค่าเริ่มต้นคือ "red"
  const [selectedColor, setSelectedColor] = useState(event?.color || "red"); 

  // กำหนดรายการสีให้ผู้ใช้เลือก โดยแต่ละสีอยู่ใน array
  const colors = ["red", "blue", "green", "yellow", "purple"];

  return (
    // div นี้คือ modal-overlay ครอบคลุมทั้งหน้าจอ ทำให้พื้นหลังโปร่งแสง
    // เมื่อคลิกที่พื้นหลังนี้ (นอก modal-content) จะเรียก onClose เพื่อปิด modal
    <div className="modal-overlay" onClick={onClose}>
      {/* div นี้คือ modal-content ซึ่งเป็นกล่องหลักของ modal */}
      {/* การเรียก e.stopPropagation() ใน onClick ป้องกันไม่ให้คลิกในกล่องนี้ส่งผลไปที่ overlay ทำให้ modal ไม่ถูกปิดโดยไม่ตั้งใจ */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* แสดงหัวข้อของ modal โดยเปลี่ยนข้อความตามเงื่อนไข */}
        {/* - ถ้า editMode เป็นจริง จะแสดง "แก้ไขกิจกรรม" */}
        {/* - ถ้ามี event แต่ไม่ได้อยู่ในโหมดแก้ไข จะแสดง "กิจกรรม" */}
        {/* - ถ้าไม่มี event จะแสดง "กิจกรรมใหม่" */}
        <div className="modal-title">
          {editMode ? "แก้ไขกิจกรรม" : event ? "กิจกรรม" : "กิจกรรมใหม่"}
        </div>

        {/* ช่อง input สำหรับกรอกหรือแสดงชื่อกิจกรรม */}
        <input
          type="text"
          className="modal-input"
          placeholder="ใส่ชื่อกิจกรรม"
          value={eventName} // แสดงค่าที่เก็บอยู่ใน state eventName
          onChange={(e) => setEventName(e.target.value)} // อัปเดต state เมื่อผู้ใช้พิมพ์ข้อความใหม่
          disabled={!editMode && !!event} 
          // ถ้าไม่อยู่ในโหมดแก้ไขและมี event อยู่แล้ว ให้ปิดการแก้ไข (disabled)
        />

        {/* เงื่อนไขการแสดงส่วนเลือกสี: 
            - จะแสดงเฉพาะเมื่อไม่มี event (เพิ่มกิจกรรมใหม่) หรืออยู่ในโหมดแก้ไข */}
        {(!event || editMode) && (
          <div className="color-picker">
            {colors.map((color) => (
              // สำหรับแต่ละสีใน array colors สร้าง div ที่เป็นตัวเลือกสี
              <div
                key={color} // กำหนด key สำหรับแต่ละ element ใน array เพื่อให้ React ระบุได้อย่างถูกต้อง
                className="color-option"
                style={{
                  backgroundColor: color, // กำหนดพื้นหลังตามสีใน array
                  // ถ้าสีที่กำลังแสดงตรงกับสีที่เลือกไว้ (selectedColor) จะแสดง border เพื่อเน้นว่าเลือกอยู่
                  border: selectedColor === color ? "2px solid black" : "none",
                }}
                onClick={() => setSelectedColor(color)} // เมื่อคลิกเปลี่ยนค่า selectedColor ใน state
              ></div>
            ))}
          </div>
        )}

        {/* ถ้ามี event และไม่ได้อยู่ในโหมดแก้ไข (ดูข้อมูลกิจกรรม) */}
        {/* จะแสดงกล่องแสดงสีที่เลือกไว้ โดยมี border เพื่อเน้น */}
        {event && !editMode && (
          <div className="selected-color">
            <div
              className="color-option"
              style={{
                backgroundColor: selectedColor,
                border: "2px solid black",
              }}
            ></div>
          </div>
        )}

        {/* ส่วนแสดงกลุ่มปุ่มสำหรับการดำเนินการ (แก้ไข, ลบ, บันทึก, ยกเลิก) */}
        <div className="btn-group">
          {/* ถ้ามี event และไม่ได้อยู่ในโหมดแก้ไข (แสดงในโหมดดู) */}
          {event && !editMode && (
            <>
              {/* ปุ่ม "แก้ไข" เมื่อคลิกจะเรียก onEdit เพื่อเข้าสู่โหมดแก้ไข */}
              <button className="btn-edit" onClick={onEdit}>
                แก้ไข
              </button>
              {/* ปุ่ม "ลบ" เมื่อคลิกจะเรียก onDelete เพื่อลบกิจกรรม */}
              <button className="btn-delete" onClick={onDelete}>
                ลบ
              </button>
            </>
          )}
          {/* ถ้าอยู่ในโหมดแก้ไข (สำหรับแก้ไขกิจกรรม) */}
          {editMode && (
            <>
            {/* ปุ่ม "บันทึก" เมื่อคลิกจะตรวจสอบว่ามีชื่อกิจกรรมหรือไม่ แล้วเรียก onSave */}
              <button
                className="btn-save"
                onClick={() => {
                  // ตรวจสอบว่าชื่อกิจกรรมไม่ว่าง ถ้าว่างให้แจ้งเตือน
                  if (!eventName || !eventName.trim()) {
                    alert("กรุณากรอกชื่อกิจกรรม");
                    return;
                  }
                  // ถ้าชื่อถูกต้อง จะส่งค่า eventName กับ selectedColor ให้ onSave
                  onSave(eventName, selectedColor);
                }}
              >
                บันทึก
              </button>
              {/* ปุ่ม "ยกเลิก" เพื่อปิด modal โดยเรียก onClose */}
              <button className="btn-cancel" onClick={onClose}>
                ยกเลิก
              </button>
              
            </>
          )}
          {/* ถ้าไม่มี event (กรณีเพิ่มกิจกรรมใหม่) */}
          {!event && (
            <>
            {/* ปุ่ม "บันทึก" ที่ทำงานเหมือนในโหมดแก้ไข */}
              <button
                className="btn-save"
                onClick={() => {
                  if (!eventName || !eventName.trim()) {
                    alert("กรุณากรอกชื่อกิจกรรม");
                    return;
                  }
                  onSave(eventName, selectedColor);
                }}
              >
                บันทึก
              </button>
              {/* ปุ่ม "ยกเลิก" เพื่อปิด modal */}
              <button className="btn-cancel" onClick={onClose}>
                ยกเลิก
              </button>
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCalendar;
// ส่งออก Component ModalCalendar เพื่อให้ส่วนอื่นสามารถนำไปใช้งานได้
