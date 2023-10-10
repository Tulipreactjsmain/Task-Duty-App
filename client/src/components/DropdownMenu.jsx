import { Dropdown, Menu } from "antd";
import { Image } from "react-bootstrap";
import { useStore } from "../config/store";
import Settings from "./Settings";

const DropdownMenu = ({ userData }) => {
  const { handleLogout, setShowSettingsModal, showSettingsModal } = useStore();

  const handleClose = () => setShowSettingsModal(false);
  const handleShow = () => setShowSettingsModal(true);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else if (key === "settings") {
      handleShow();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["hover"]}
        className="d-flex d-none d-lg-block d-md-block justify-content-center text-danger-emphasis align-items-center"
      >
        <div>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Image
              roundedCircle
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
              src={userData?.profileImg}
            />
          </a>
        </div>
      </Dropdown>
      <Settings show={showSettingsModal} onHide={handleClose} />
    </>
  );
};

export default DropdownMenu;
