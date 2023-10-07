import { Row, Col, Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { NavLink } from "react-router-dom";
import { useStore } from "../config/store";
import toast from "react-hot-toast";

export default function Home() {
  const {userData} = useStore()

  const handleClick = () => {
    if (!userData) {
      toast("Please log in to access your tasks.");
    }
  };
  return (
    <>
    {/* px-md-5 */}
      <Row className="d-flex justify-content-between customPadding gap-5 align-items-center pt-5">
        <Col xs={12} lg={6} style={{ maxWidth: "535px" }}>
          <h1>
            Manage your Tasks On
            <span style={{ color: "#974FD0" }}>TaskDuty</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>

          <NavLink
            to={userData ? `${userData.username}/tasks` : null}
            className="text-white "
          >
            <Button
              className="border-0 hover"
              style={{ backgroundColor: "#974FD0" }}
              onClick={handleClick}
            >
              Go to My Tasks
            </Button>
          </NavLink>
        </Col>
        <Col xs={12} lg={6} className="heroImg">
          <Carousel
            className="custom-carousel"
            fade
            controls={false}
            indicators={false}
          >
            <Carousel.Item className="carousel-inner">
              <Image
                className="w-100"
                src="https://res.cloudinary.com/techbro/image/upload/v1696322351/Task%20Duty/Property_1_Frame_1_atulpd.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="w-100"
                src="https://res.cloudinary.com/techbro/image/upload/v1696322352/Task%20Duty/Property_1_Frame_3_e1c69l.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="w-100"
                src="https://res.cloudinary.com/techbro/image/upload/v1696322351/Task%20Duty/Property_1_Frame_1_atulpd.png"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </>
  );
}
