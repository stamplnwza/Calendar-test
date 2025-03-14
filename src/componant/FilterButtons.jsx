import { Box, Button, Badge } from "@mui/material";
// นำเข้า Component ต่าง ๆ จาก Material UI:
// - Box: ใช้จัดวางเลย์เอาท์ในรูปแบบ container
// - Button: ปุ่มที่มีสไตล์ Material UI
// - Badge: แสดงตัวเลขหรือสัญลักษณ์เล็ก ๆ บนปุ่มหรือไอคอน

import MailIcon from '@mui/icons-material/Mail';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import SimCardAlertOutlinedIcon from '@mui/icons-material/SimCardAlertOutlined';
// นำเข้าไอคอนจาก Material UI Icons เพื่อใช้เป็นส่วนหนึ่งของปุ่มแสดงผล เช่น
// - MailIcon: ไอคอนจดหมาย
// - PublishedWithChangesIcon: ไอคอนแสดงถึงการแก้ไข/อัปเดต
// - CurrencyExchangeIcon: ไอคอนแลกเปลี่ยนเงินตรา
// - MonetizationOnOutlinedIcon: ไอคอนเกี่ยวกับการเงิน/การเบิก
// - PauseCircleOutlineOutlinedIcon: ไอคอนสำหรับสถานะหยุด/ชะลอ
// - SimCardAlertOutlinedIcon: ไอคอนสำหรับเตือนสถานะข้อมูลไม่สมบูรณ์

import './FilterButtons.css'; // นำเข้าไฟล์ CSS สำหรับสไตล์

// ประกาศ Functional Component FilterButtons รับ props คือ onButtonClick
const FilterButtons = ({ onButtonClick }) => {
  return (
    // Box เป็น container ที่ใช้จัดวางเลย์เอาท์ในแนวเดียวกัน
    <Box className="filter-buttons-container">
      <div>
        {/* ปุ่มแรกสำหรับ "ASC รอแอดมินอนุมัติ" */}
        <Button
          variant="contained" // ใช้สไตล์ปุ่มแบบ "contained" ซึ่งมีพื้นหลังเต็ม
          size="large" // ขนาดปุ่มใหญ่
          startIcon={<PublishedWithChangesIcon />} // ตั้งไอคอนซ้ายปุ่มเป็น PublishedWithChangesIcon
          className="filter-button" // ใช้คลาส CSS จากไฟล์ FilterButtons.css
          onClick={() => onButtonClick("ASC", { name: "ASC รอแอดมินอนุมัติ", count: 4 })}
        >
          ASC รอแอดมินอนุมัติ
          {/* Badge แสดงตัวเลข count (4) พร้อมกับไอคอน MailIcon */}
          <Badge badgeContent={4} color="primary">
            <MailIcon color="action" />
          </Badge>
        </Button>

        {/* ปุ่มที่สอง สำหรับ "WSC รอแอดมินอนุมัติรายการเบิก" */}
        <Button
          variant="contained"
          size="large"
          startIcon={<MonetizationOnOutlinedIcon />} // ใช้ไอคอน MonetizationOnOutlinedIcon
          className="filter-button"
          onClick={() => onButtonClick("เบิก", { name: "WSC รอแอดมินอนุมัติรายการเบิก", amount: 10000, requester: "ทีม IT", date: "2023-10-25", status: "รออนุมัติ" })}
        >
          WSC รอแอดมินอนุมัติรายการเบิก
        </Button>

        {/* ปุ่มที่สาม สำหรับ "WSC รอแอดมินอนุมัติการเคลียร์เงิน" */}
        <Button
          variant="contained"
          size="large"
          startIcon={<CurrencyExchangeIcon />} // ใช้ไอคอน CurrencyExchangeIcon
          className="filter-button"
          onClick={() => onButtonClick("เคลียร์เงิน", { name: "WSC รอแอดมินอนุมัติการเคลียร์เงิน", amount: 50000, requester: "ทีม HR", date: "2023-10-26", status: "รออนุมัติ" })}
        >
          WSC รอแอดมินอนุมัติการเคลียร์เงิน
        </Button>

        {/* ปุ่มที่สี่ สำหรับ "งานอยู่ในการชะลอ" */}
        <Button
          variant="contained"
          size="large"
          startIcon={<PauseCircleOutlineOutlinedIcon />} // ใช้ไอคอน PauseCircleOutlineOutlinedIcon
          className="filter-button"
          onClick={() => onButtonClick("ชะลอ", { name: "งานอยู่ในการชะลอ", reason: "รอการอนุมัติงบประมาณ", date: "2023-10-24", status: "ถูกชะลอ" })}
        >
          งานอยู่ในการชะลอ
        </Button>

        {/* ปุ่มที่ห้า สำหรับ "บันทึกข้อมูลไม่สมบูรณ์" */}
        <Button
          variant="contained"
          size="large"
          startIcon={<SimCardAlertOutlinedIcon />} // ใช้ไอคอน SimCardAlertOutlinedIcon
          className="filter-button"
          onClick={() => onButtonClick("ไม่สมบูรณ์", { name: "บันทึกข้อมูลไม่สมบูรณ์", details: "ข้อมูลบางส่วนหายไป", date: "2023-10-25", recorder: "ทีม IT", status: "ไม่สมบูรณ์" })}
        >
          บันทึกข้อมูลไม่สมบูรณ์
        </Button>
      </div>
    </Box>
  );
};

export default FilterButtons;
// ส่งออก FilterButtons Component เพื่อให้สามารถนำไปใช้งานในส่วนอื่นของโปรเจกต์