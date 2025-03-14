import React, { useState, useEffect } from "react";
// นำเข้า React พร้อมกับ hook useState สำหรับจัดการ state และ useEffect สำหรับ side effects เช่นการโหลดข้อมูล

import FullCalendar from "@fullcalendar/react";
// นำเข้า FullCalendar component สำหรับแสดงปฏิทินในรูปแบบ React

import dayGridPlugin from "@fullcalendar/daygrid";
// นำเข้า plugin สำหรับแสดงปฏิทินแบบตารางรายเดือน

import interactionPlugin from "@fullcalendar/interaction";
// นำเข้า plugin สำหรับรองรับการ interaction เช่นการคลิกในปฏิทิน

import "./Calendar.css";
// นำเข้าไฟล์ CSS ที่ใช้จัดรูปแบบให้กับปฏิทินและส่วนประกอบอื่นๆ

import ModalCalendar from "./ModalCalendar"; // Import Modal
// นำเข้า ModalCalendar component สำหรับเพิ่ม/แก้ไขกิจกรรม

import { db } from "../firebase";
// นำเข้า instance ของ Firebase Firestore ที่กำหนดไว้ในโปรเจค

import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
// นำเข้าฟังก์ชันจาก Firestore สำหรับการจัดการฐานข้อมูล:
// - collection: ระบุ collection ที่ต้องการเข้าถึง
// - addDoc: เพิ่มเอกสารใหม่ลงใน collection
// - onSnapshot: ฟังการเปลี่ยนแปลงแบบ real-time
// - doc: ระบุเอกสารเฉพาะใน collection
// - updateDoc: อัปเดตข้อมูลในเอกสาร
// - deleteDoc: ลบเอกสารออกจาก collection

// ประกาศ Component MyCalendar ซึ่งเป็นส่วนหลักที่แสดงปฏิทินและจัดการกิจกรรม
const MyCalendar = () => {
  // สร้าง state สำหรับเก็บข้อมูลกิจกรรมที่โหลดมาจาก Firestore
  const [events, setEvents] = useState([]);
  // state สำหรับควบคุมการแสดงหรือซ่อน Modal
  const [modalOpen, setModalOpen] = useState(false);
  // state สำหรับเก็บกิจกรรมที่ถูกเลือก เมื่อคลิกที่กิจกรรมในปฏิทิน
  const [selectedEvent, setSelectedEvent] = useState(null);
  // state สำหรับเก็บวันที่ที่ผู้ใช้คลิกในปฏิทิน (ใช้สำหรับเพิ่มกิจกรรมใหม่)
  const [selectedDate, setSelectedDate] = useState(null);
  // state สำหรับบอกว่าอยู่ในโหมดแก้ไขกิจกรรมหรือไม่
  const [editMode, setEditMode] = useState(false);

  // useEffect นี้ทำงานเพียงครั้งเดียวเมื่อ component ถูก mount
  // ใช้ onSnapshot เพื่อติดตามข้อมูลใน collection "events" แบบ real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      // map ข้อมูลจาก snapshot ให้เป็น array ของ event objects
      const eventList = snapshot.docs.map((doc) => ({
        id: doc.id, // เก็บ id ของเอกสาร
        title: doc.data().title, // ชื่อกิจกรรม
        date: doc.data().date, // วันที่ในรูปแบบ YYYY-MM-DD
        backgroundColor: doc.data().color, // สีพื้นหลังสำหรับกิจกรรมในปฏิทิน
        textColor: "white", // กำหนดสีข้อความให้เป็นสีขาว (สำหรับความคมชัด)
      }));
      setEvents(eventList); // อัปเดต state events ด้วยข้อมูลที่ได้
    });

    // ฟังก์ชัน cleanup จะยกเลิกการฟังเมื่อ component ถูก unmount
    return () => unsubscribe();
  }, []); // dependency array ว่าง หมายความว่า useEffect นี้ทำงานแค่ครั้งเดียวตอน mount

  // ฟังก์ชัน handleDateClick จะถูกเรียกเมื่อผู้ใช้คลิกที่วันที่ในปฏิทิน
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // เก็บวันที่ที่คลิกในรูปแบบ string (YYYY-MM-DD)
    setSelectedEvent(null); // รีเซ็ตข้อมูลกิจกรรมที่เลือก (เพราะเป็นการเพิ่มกิจกรรมใหม่)
    setEditMode(false); // ปิดโหมดแก้ไข
    setModalOpen(true); // เปิด Modal เพื่อให้ผู้ใช้เพิ่มกิจกรรมใหม่
  };

  // ฟังก์ชัน handleEventClick จะถูกเรียกเมื่อผู้ใช้คลิกที่กิจกรรมในปฏิทิน
  const handleEventClick = (info) => {
    // สร้าง object เก็บข้อมูลของกิจกรรมที่ถูกคลิก
    setSelectedEvent({
      id: info.event.id, // รหัสของกิจกรรม
      title: info.event.title, // ชื่อกิจกรรม
      date: info.event.startStr, // วันที่เริ่มต้นของกิจกรรมในรูปแบบ string
      color: info.event.backgroundColor, // สีพื้นหลังที่แสดงในปฏิทิน
    });
    setEditMode(false); // เริ่มต้นด้วยโหมดดู (ไม่แก้ไข)
    setModalOpen(true); // เปิด Modal เพื่อแสดงรายละเอียดของกิจกรรม
  };

  // ฟังก์ชัน handleSaveEvent ใช้สำหรับบันทึกข้อมูลกิจกรรม ทั้งสำหรับเพิ่มใหม่และแก้ไข
  const handleSaveEvent = async (title, color) => {
    // ตรวจสอบว่าชื่อกิจกรรมไม่ว่าง หากว่างจะแสดง alert และหยุดการทำงาน
    if (!title || !title.trim()) {
      alert("กรุณากรอกชื่อกิจกรรม");
      return;
    }

    try {
      // ถ้ามี selectedEvent อยู่และอยู่ในโหมดแก้ไข จะอัปเดตกิจกรรมที่มีอยู่
      if (selectedEvent && editMode) {
        await updateDoc(doc(db, "events", selectedEvent.id), {
          title,
          date: selectedEvent.date, // ใช้วันที่เดิมจาก selectedEvent
          color,
        });
      } else {
        // ถ้าไม่ใช่กรณีแก้ไข ให้เพิ่มกิจกรรมใหม่ลงใน Firestore โดยใช้วันที่ที่คลิก
        await addDoc(collection(db, "events"), { title, date: selectedDate, color });
      }
      // หลังจากบันทึกสำเร็จ ปิด Modal และรีเซ็ต state ที่เกี่ยวข้อง
      setModalOpen(false);
      setSelectedEvent(null);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // ฟังก์ชัน handleDeleteEvent ใช้สำหรับลบกิจกรรมที่ถูกเลือกออกจาก Firestore
  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {
        await deleteDoc(doc(db, "events", selectedEvent.id));
        // หลังจากลบสำเร็จ ปิด Modal และรีเซ็ต selectedEvent
        setModalOpen(false);
        setSelectedEvent(null);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <>
      {/* FullCalendar แสดงปฏิทิน โดยใช้ plugin และกำหนด props ต่าง ๆ */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // ใช้ plugin สำหรับตารางเดือนและการ interaction
        editable={true} // อนุญาตให้แก้ไขกิจกรรม (เช่นลากและวาง)
        selectable={true} // อนุญาตให้ผู้ใช้เลือกวันที่
        initialView="dayGridMonth" // ตั้งค่าให้แสดงปฏิทินแบบเดือนเป็นมุมมองเริ่มต้น
        headerToolbar={{
          left: " prev,next title ", // ตั้งปุ่มเลื่อนย้อนหลัง, ไปข้างหน้า และแสดงชื่อเดือน/ปีทางซ้าย
          center: "",
          right: "",
        }}
        events={events} // ส่งข้อมูลกิจกรรมที่เก็บใน state events ไปแสดงในปฏิทิน
        dateClick={handleDateClick} // เมื่อคลิกที่วันที่จะเรียก handleDateClick
        eventClick={handleEventClick} // เมื่อคลิกที่กิจกรรมจะเรียก handleEventClick
        height="auto" // ปรับความสูงของปฏิทินให้เหมาะสมกับเนื้อหา
        contentHeight="auto" // ปรับความสูงของเนื้อหาในปฏิทิน
        dayMaxEvents={3} // จำกัดจำนวนกิจกรรมที่แสดงในแต่ละวัน (ถ้ามากจะมีปุ่ม "more")
      />

      {/* แสดง ModalCalendar เมื่อ modalOpen เป็น true */}
      {modalOpen && (
        <ModalCalendar
          event={selectedEvent} // ส่งข้อมูลกิจกรรมที่ถูกเลือก (ถ้ามี) ไปให้ Modal
          editMode={editMode} // ส่งสถานะว่าอยู่ในโหมดแก้ไขหรือไม่ไปให้ Modal
          onClose={() => {
            // เมื่อปิด Modal ให้รีเซ็ต state ที่เกี่ยวข้อง
            setModalOpen(false);
            setSelectedEvent(null);
            setEditMode(false);
          }}
          onSave={handleSaveEvent} // ส่งฟังก์ชันสำหรับบันทึกกิจกรรมให้ Modal
          onDelete={handleDeleteEvent} // ส่งฟังก์ชันสำหรับลบกิจกรรมให้ Modal
          onEdit={() => setEditMode(true)} // เมื่อเรียก onEdit ให้เปลี่ยน state editMode เป็น true เพื่อเข้าสู่โหมดแก้ไข
        />
      )}
    </>
  );
};

export default MyCalendar;
// ส่งออก MyCalendar component เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของโปรเจค
