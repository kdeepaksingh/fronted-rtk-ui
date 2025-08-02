import { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaSignOutAlt,
  FaEdit,
  FaKey,
} from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { Typography } from "@mui/material";
import colors from "../../color";

const DashTopbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user?.name || "N/A";
  const email = user?.email || "N/A";
  const mobile = user?.mobileNo || "N/A";
  const role = user?.role || "User";

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md mb-6 sticky top-0 z-10">
      <h1 className="text-2xl font-semibold text-orange-700">Dashboard</h1>

      <div className="flex items-center gap-6 relative">
        <FaBell className="text-gray-500 text-xl cursor-pointer" />

        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-md">
              Role: <span className="font-bold">{role}</span>
            </div>
            <FaUserCircle className="text-blue-600 text-3xl" />
            <MdArrowDropDown className="text-gray-600 text-xl" />
          </div>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 z-30">
              <div className="bg-blue-800 text-white text-center py-2 rounded-t-lg font-semibold">
                User Account
              </div>

              <div className="p-3 space-y-2 border-b border-gray-300">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaUser className="text-gray-500" />
                  <span className="text-green-600">{name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-gray-500" />
                  <span className="text-green-600">{email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FaPhone className="text-gray-500" />
                  <span className="text-green-600">{mobile}</span>
                </div>
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-700">
                  <FaEdit />
                  <span>Update Profile</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-700">
                  <FaKey />
                  <span>Change Password</span>
                </div>
                <div
                  className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-red-600"
                  onClick={() => setVisible(true)}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={visible}
        onClose={() => setVisible(false)}
        title={"Title.ConfirmLogout"}
        height="auto"
        actions={[
          {
            text: "Action.Logout",
            onClick: handleLogout,
            sx: {
              backgroundColor: colors["ui-brown-dark"],
              color: colors["ui-white"],
            },
          },
          {
            text: "Action.Cancel",
            onClick: () => setVisible(false),
            variant: "outlined",
            color: "warning",
          },
        ]}
      >
        <div className="mt-1 align-items-center">
          <div className="col-xs-12">
            <Typography
              variant="body1"
              fontSize={"1.5rem"}
              fontWeight={600}
              color={colors["ui-brown-dark"]}
              className="text-center p-3"
            >
              Are you sure you want to logout?
            </Typography>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashTopbar;
