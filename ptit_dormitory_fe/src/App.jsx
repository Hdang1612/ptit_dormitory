import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./view/Login";
import ForgotPassword from "./view/ForgotPassword";
import UserIdentificationCard from "./view/UserIdentificationCard";
import UserEditPage from "./view/UserEditPage";
import RegistrationListPage from "./view/RegistrationListPage";
import ContractList from "./view/ContractList";
import AddContract from "./view/AddContract";
import InforContract from "./view/InforContract";
import ContractRenewalApp from "./view/ContractRenewalApp";
import CancelContract from "./view/CancelContract";
import RoomList from "./view/RoomList";
import ShiftManagement from "./view/ShiftManagement";
import ShiftSchedule from "./view/ShiftSchedule";
import StaffDuty from "./view/StaffDuty";
import StudentCheckin from "./view/StudentCheckin";
import StudentInfo from "./view/StudentInfo";
import StudentList from "./view/StudentList";
import StudentEdit from "./view/StudentEdit";
import AddStudent from "./view/AddStudent";
import ShiftReports from "./view/ShiftReports";
import RoomReport from "./view/RoomReport";
import FormAddContract from "./view/FormAddContract";
import { Frame } from "./view/Frame/index.jsx";
import { PowerMonitoring } from "./view/PowerMonitoring/index.jsx";
import { Reports } from "./view/Reports/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dangnhap" replace />} />
        {/* Dũng */}
        <Route path="/dangnhap" element={<Login />}></Route>
        <Route path="/quenmatkhau" element={<ForgotPassword />}></Route>
        <Route path="/thedinhdanh" element={<UserIdentificationCard />}></Route>
        <Route path="/suathongtin" element={<UserEditPage />}></Route>
        <Route
          path="/danhsachdondky"
          element={<RegistrationListPage />}
        ></Route>
        <Route path="/danhsachhopdong" element={<ContractList />}></Route>
        <Route path="/themdangky" element={<AddContract />}></Route>
        <Route path="/thongtindangky" element={<FormAddContract />}></Route>
        <Route path="/thongtinhopdong" element={<InforContract />}></Route>
        <Route path="/giahanhopdong" element={<ContractRenewalApp />}></Route>
        <Route path="/huyhopdong" element={<CancelContract />}></Route>

        {/* Quốc Anh */}
        <Route path="/dsphong" element={<RoomList />}></Route>
        <Route path="/shiftmanage" element={<ShiftManagement />}></Route>
        <Route path="/shiftschedule" element={<ShiftSchedule />}></Route>
        <Route path="/staffduty" element={<StaffDuty />}></Route>
        <Route path="/studentcheckin" element={<StudentCheckin />}></Route>
        <Route path="/student-infor" element={<StudentInfo />}></Route>
        <Route path="/student-list" element={<StudentList />}></Route>
        <Route path="/student-edit" element={<StudentEdit />}></Route>
        <Route path="/add-student" element={<AddStudent />}></Route>
        <Route path="/shift-reports" element={<ShiftReports />}></Route>
        <Route path="/room-report" element={<RoomReport />}></Route>
        
        {/* Hoàng Anh */}
        <Route path="/invoice" element={<Frame />} />
        <Route path="/power-monitoring" element={<PowerMonitoring />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
