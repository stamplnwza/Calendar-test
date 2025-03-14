

import Calendar from "./Calendar.jsx"; // ไม่ต้องมี "componant/"
import './TaskDetail.css'; // ไม่ต้องมี "componant/"
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import DoneIcon from "@mui/icons-material/Done";

const taskCategories = [
  { label: "งานเร่งทนาย", count: 7, icon: <WorkIcon /> },
  { label: "รับงาน", count: 4, icon: <AssignmentIcon /> },
  { label: "อยู่ระหว่างการดำเนินการ", count: 2, icon: <DoneIcon /> },
  { label: "งานสืบทรัพย์", count: 1, icon: <AssignmentIcon /> },
  { label: "งานบังคับคดี", count: 1, icon: <DoneIcon /> },
  { label: "ยื่นฟ้องแล้ว", count: 3, icon: <WorkIcon /> },
  { label: "มีคำพิพากษา/มีคำสั่ง", count: 3, icon: <WorkIcon /> },
  { label: "ส่งเรื่องคืนธนาคาร", count: 3, icon: <WorkIcon /> },
  { label: "ล้มละลาย", count: 3, icon: <WorkIcon /> },
];

const TaskDetail = () => {
  return (
    <Box className="dashboard-container">
      {/* ปฏิทิน */}
      <Box className="calendar-section">
        <Calendar />
      </Box>
      
      {/* Task List */}
      <Box className="tasklist-section">
        <Typography variant="h6" className="tasklist-header">
          ตารางงานในเดือน
        </Typography>
        <Box className="tasklist-section-item">
          <List>
            {taskCategories.map((task, index) => (
              <ListItem key={index} className="task-item">
                <ListItemIcon className="task-icon">{task.icon}</ListItemIcon>
                <ListItemText primary={task.label} />
                <Typography className="task-count">{task.count}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskDetail;
