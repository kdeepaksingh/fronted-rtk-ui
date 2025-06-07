import { CloseOutlined } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Condition from "../components/commons/Condition";

interface ModalLayoutProps {
  redirect?: string;
  allowClose?: boolean;
  children?: React.ReactNode;
}

export const ModalLayout = ({
  redirect = "/",
  allowClose = true,
  children,
}: ModalLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  return (
    <Modal open={true} disableAutoFocus>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        <Condition show={allowClose}>
          <div className="absolute right-1 top-1">
            <IconButton
              onClick={() => navigate(redirect)}
              aria-label="Close Modal"
            >
              <CloseOutlined />
            </IconButton>
          </div>
        </Condition>
        <Outlet />
        {children}
      </div>
    </Modal>
  );
};

export default ModalLayout;
