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
import { BillnPayment } from "./view/BillnPayment/index.jsx";
import { PowerMonitoring } from "./view/PowerMonitoring/index.jsx";
import { Reports } from "./view/Reports/index.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dangnhap" replace />} />

        {/* Dũng */}
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/quenmatkhau" element={<ForgotPassword />} />
        <Route path="/thedinhdanh" element={<UserIdentificationCard />} />
        <Route path="/suathongtin" element={<UserEditPage />} />
        <Route path="/danhsachdondky" element={<RegistrationListPage />} />
        <Route path="/danhsachhopdong" element={<ContractList />} />
        <Route path="/themdangky" element={<AddContract />} />
        <Route path="/thongtindangky" element={<FormAddContract />} />
        <Route path="/thongtindangky/:id" element={<FormAddContract />} />
        <Route path="/thongtinhopdong" element={<InforContract />} />
        <Route path="/thongtinhopdong/:id" element={<InforContract />} />
        <Route path="/giahanhopdong" element={<ContractRenewalApp />} />
        <Route
          path="/giahanhopdong/:contractId"
          element={<ContractRenewalApp />}
        />
        <Route path="/huyhopdong" element={<CancelContract />} />
        <Route path="/huyhopdong/:id" element={<CancelContract />} />

        {/* Quốc Anh */}
        <Route path="/dsphong" element={<RoomList />}></Route>
        <Route path="/shiftmanage" element={<ShiftManagement />}></Route>
        <Route path="/shiftschedule" element={<ShiftSchedule />}></Route>
        <Route path="/staffduty" element={<StaffDuty />}></Route>
        <Route path="/studentcheckin" element={<StudentCheckin />}></Route>
        <Route path="/student/:id" element={<StudentInfo />} />
        <Route path="/student-list" element={<StudentList />}></Route>
        <Route path="/student-edit/:id" element={<StudentEdit />}></Route>
        <Route path="/add-student" element={<AddStudent />}></Route>
        <Route path="/shift-reports" element={<ShiftReports />}></Route>
        <Route path="/room-report" element={<RoomReport />}></Route>

        {/* Hoàng Anh */}
        <Route path="/invoice" element={<BillnPayment />} />
        <Route path="/power-monitoring" element={<PowerMonitoring />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
