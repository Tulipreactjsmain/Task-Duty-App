import { Row, Col, Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  return (
    <>
      <Row className="pt-5">
        <div className="d-flex justify-content-between px-5 align-items-center">
          <Col style={{ maxWidth: "535px" }}>
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
          <Col className="heroImg">
            <Carousel fade controls={false} indicators={false}>
              <Carousel.Item>
                <Image
                  className="heroImg"
                  src="https://res.cloudinary.com/techbro/image/upload/v1696279497/Task%20Duty/Property_1_Frame_1_mpj6yo.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="heroImg"
                  src="https://res.cloudinary.com/techbro/image/upload/v1696279497/Task%20Duty/Property_1_Frame_2_sjkgcw.png"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="heroImg"
                  src="https://res.cloudinary.com/techbro/image/upload/v1696279498/Task%20Duty/Property_1_Frame_3_qyxbrb.png"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </div>
      </Row>
    </>
  );
}
