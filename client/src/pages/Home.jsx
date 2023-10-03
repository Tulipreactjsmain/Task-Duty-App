import { Row, Col, Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  return (
    <>
      <Row className="d-flex justify-content-between px-large px-md-5 px-3 gap-5 align-items-center pt-5">
        {/* <div className="d-flex justify-content-between px-5 align-items-center">
          
        </div> */}
        <Col  xs={12} lg={6} style={{ maxWidth: "535px" }}>
            <h1>
              Manage your Tasks On{" "}
              <span style={{ color: "#974FD0" }}>TaskDuty</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
              tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at
              platea tempus duis non eget. Hendrerit tortor fermentum bibendum
              mi nisl semper porttitor. Nec accumsan.
            </p>
            <Button className="border-0" style={{ backgroundColor: "#974FD0" }}>Go to My Tasks</Button>
          </Col>
          <Col   xs={12} lg={6} className="heroImg">
            <Carousel className="custom-carousel" fade controls={false} indicators={false}>
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
