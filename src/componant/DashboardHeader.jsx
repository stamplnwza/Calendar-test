import React, { useState } from "react";
// นำเข้า React พร้อมกับ hook useState สำหรับจัดการ state ภายใน Component

import FilterButtons from "./FilterButtons"; // Import ปุ่มตัวกรองที่แยกไว้
// นำเข้า Component FilterButtons ซึ่งจัดการแสดงปุ่มตัวกรองและส่งข้อมูลผ่าน onButtonClick

import ModalDash from "./ModalDash"; // Import ModalDash
// นำเข้า Component ModalDash สำหรับแสดง Modal รายละเอียดงานตามประเภท

import './DashboardHeader.css';
// นำเข้าไฟล์ CSS สำหรับจัดรูปแบบและสไตล์ของ DashboardHeader

// กำหนดตัวแปร bannerData ที่เก็บข้อความหรือข้อมูลสำคัญที่จะแสดงในส่วน banner
let bannerData = {
    tittle: "สวัสดีทนายแก้ว! นี่คือตารางงานของคุณ"
}

const DashboardHeader = () => {
    // สร้าง state สำหรับควบคุมประเภทของ Modal ที่จะเปิด (modalType)
    const [modalType, setModalType] = useState(null);
    // สร้าง state สำหรับเก็บข้อมูลที่ส่งเข้ามาใน Modal (modalData)
    const [modalData, setModalData] = useState({});

    // ฟังก์ชัน handleButtonClick รับค่าจาก FilterButtons เมื่อผู้ใช้คลิกปุ่มตัวกรอง
    // โดยรับ type (ประเภทของ Modal) และ data (ข้อมูลรายละเอียดงาน)
    const handleButtonClick = (type, data) => {
        setModalType(type);
        setModalData(data);
    };

    // ฟังก์ชัน handleCloseModal สำหรับปิด Modal โดยรีเซ็ต modalType และ modalData
    const handleCloseModal = () => {
        setModalType(null);
        setModalData({});
    };

    // ฟังก์ชัน handleApprove สำหรับจัดการเหตุการณ์อนุมัติ
    // เมื่อผู้ใช้กดปุ่มอนุมัติใน ModalDash จะ log ข้อมูล modalData แล้วปิด Modal
    const handleApprove = () => {
        console.log("อนุมัติ:", modalData);
        handleCloseModal();
    };

    // ฟังก์ชัน handleReject สำหรับจัดการเหตุการณ์ปฏิเสธ
    const handleReject = () => {
        console.log("ปฏิเสธ:", modalData);
        handleCloseModal();
    };

    // ฟังก์ชัน handleEdit สำหรับจัดการเหตุการณ์แก้ไขหรือดำเนินการต่อ
    const handleEdit = () => {
        console.log("แก้ไข:", modalData);
        handleCloseModal();
    };

    return (
        <div className="banner-bg">
            {/* Container หลักที่ใช้แสดงพื้นหลัง banner */}
            <div className="container">
                <div className="banner-con">
                    {/* ส่วนข้อความภายใน banner */}
                    <div className="banner-text">
                        <h1>{bannerData.tittle}</h1>
                        {/* แสดงหัวข้อของ banner จาก bannerData */}
                        
                        <div className="filter-buttons">
                            {/* แสดงปุ่มตัวกรอง โดยส่งฟังก์ชัน handleButtonClick ให้กับ FilterButtons */}
                            <FilterButtons onButtonClick={handleButtonClick} />
                        </div>
                    </div>
                </div>
            </div>

            {/* แสดง ModalDash เมื่อมี modalType (ไม่เป็น null) */}
            {modalType && (
                <ModalDash
                    type={modalType} // ส่งประเภทของ Modal ไปให้ ModalDash เพื่อให้แสดงเนื้อหาที่เหมาะสม
                    data={modalData} // ส่งข้อมูลรายละเอียดงานให้ ModalDash
                    onClose={handleCloseModal} // ส่งฟังก์ชันสำหรับปิด Modal
                    onApprove={handleApprove} // ส่งฟังก์ชันสำหรับอนุมัติ
                    onReject={handleReject} // ส่งฟังก์ชันสำหรับปฏิเสธ
                    onEdit={handleEdit} // ส่งฟังก์ชันสำหรับแก้ไข
                />
            )}
        </div>
    );
};

export default DashboardHeader;
// ส่งออก DashboardHeader Component เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของโปรเจกต์
