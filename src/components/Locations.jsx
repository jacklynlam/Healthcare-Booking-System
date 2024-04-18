import { Col, Container, Row, Card } from "react-bootstrap";
import '../index.css';

export default function Locations() {
  const locations = [
    {
      name: "Subang Jaya",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1063496063657!2d101.60696547567603!3d3.06623815365524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c848dc32f31%3A0x77197dd40b736133!2sSunway%20Medical%20Centre!5e0!3m2!1sen!2smy!4v1712906240699!5m2!1sen!2smy",
      address: "5, Jalan Lagoon Selatan, Bandar Sunway, 47500, Subang Jaya, Selangor",
      tel: "03-5131-9028",
      whatsapp: "601612345678"
    },
    {
      name: "Damansara",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7909302901594!2d101.59299917567603!3d3.1497813531473158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4f08db2454dd%3A0x27876cfecc9fd89c!2sSunway%20Specialist%20Centre%20Damansara!5e0!3m2!1sen!2smy!4v1712906474391!5m2!1sen!2smy",
      address: "Sunway Retails, Jalan PJU 5/1, Kota Damansara, 47810, Petaling Jaya, Selangor",
      tel: "03-5131-9028",
      whatsapp: "601612345678"
    },
    {
      name: "Penang",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.139862447741!2d100.39417147567724!3d5.395649735239888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac5c412b61603%3A0xc4c9a5e5dfdd76e7!2sSunway%20Medical%20Centre%20Penang!5e0!3m2!1sen!2smy!4v1712906610292!5m2!1sen!2smy",
      address: "3106, Lebuh Tenggiri 2, Seberang Jaya, 13700, Perai, Pulau Pinang",
      tel: "03-5131-9028",
      whatsapp: "601612345678"
    },
    {
      name: "Malacca",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8742240463625!2d101.71986257567596!3d3.1279364532812464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3616ea9079ad%3A0x1adda238eab28469!2sSunway%20Medical%20Centre%20Velocity%20(SMCV)%20Tower%20B!5e0!3m2!1sen!2smy!4v1712906741988!5m2!1sen!2smy",
      address: "Pusat Perubatan Sunway Velocity, Lingkaran Sunway Velocity, 48481, Melaka",
      tel: "03-5131-9028",
      whatsapp: "601612345678"
    },
  ];

  return (
    <Container id="locations" className="mb-5 p-4 location-container" style={{ paddingTop: "2rem",  }}>
      <Row className="justify-content-center align-items-center" style={{ minHeight: '10vh' }}>
<Col lg={10} md={8}>
  <Card className="m-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', borderRadius: '15px' }}>
    <Card.Header as="h3" className="text-center bg-primary text-white">Locations</Card.Header>
    <Card.Body>
      <Row>
        {locations.map((location, idx) => (
          <Col lg={8} md={8} className="mb-4" key={idx}>
            <Card className="location-card shadow-sm" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: 'irem',
            }}>
              <Card.Body>
                <h3 className="location-title mb-3">{location.name}</h3>
                <p>{location.address}</p>
                <div className="g-map mb-3">
                  <iframe
                    width="100%"
                    height="250"
                    style={{ border: 'none' }}
                    src={location.src}
                    allowFullScreen
                  ></iframe>
                </div>
                {/* Call button */}
            <a href={`tel:${location.tel}`} className="btn btn-primary mt-3">
            <i className="bi bi-telephone me-2"></i>
              Call {location.name} Branch
            </a>
            {/* WhatsApp button */}
            <a href={`https://wa.me/${location.whatsapp}`} 
               className="btn btn-success mt-3" 
               style={{ marginLeft: '10px' }}>
                <i className="bi bi-whatsapp me-2"></i>
              WhatsApp {location.name} Branch
            </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
  );
}

/*import { Col, Container, Row } from "react-bootstrap";
import '../index.css';

export default function Locations() {
  return (
    <Container id="locations" style={{ height: "90vh" }} className="mt-5 mb-5 location-container">
      <h1 className="location-header">Locations</h1>
      <Row className="mt-4">
        <Col md={6} className="location-column">
          <h3 className="mt-5">Subang Jaya</h3>
          <p>
            5, Jalan Lagoon Selatan, Bandar Sunway,
            47500, Subang Jaya, Selangor
          </p>
          <p><a href="tel:03-5131-9028" className="btn btn-primary">Call Subang Jaya Branch</a></p>
          <div className="g-map">
            <iframe
              width="100%"
              height="350"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.1063496063657!2d101.60696547567603!3d3.06623815365524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c848dc32f31%3A0x77197dd40b736133!2sSunway%20Medical%20Centre!5e0!3m2!1sen!2smy!4v1712906240699!5m2!1sen!2smy"
            ></iframe>
          </div>
        </Col>
        <Col md={6} className="location-column">
          <h3 className="mt-5">Damansara</h3>
          <p>
            Sunway Nexis Retails, Jalan PJU 5/1, Kota Damansara, 47810, Petaling Jaya, Selangor
          </p>
          <p><a href="tel:03-5131-9028" className="btn btn-primary">Call Damansara Branch</a></p>
          <div className="g-map">
            <iframe
              width="100%"
              height="350"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7909302901594!2d101.59299917567603!3d3.1497813531473158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4f08db2454dd%3A0x27876cfecc9fd89c!2sSunway%20Specialist%20Centre%20Damansara!5e0!3m2!1sen!2smy!4v1712906474391!5m2!1sen!2smy"
            >
            </iframe>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
      <Col md={6} className="location-column">
          <h3 className="mt-5">Penang</h3>
          <p>
            3106, Lebuh Tenggiri 2, Seberang Jaya, 13700, Perai, Pulau Pinang
          </p>
          <p><a href="tel:03-5131-9028" className="btn btn-primary">Call Penang Branch</a></p>
          <div className="g-map">
            <iframe
              width="100%"
              height="350"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.139862447741!2d100.39417147567724!3d5.395649735239888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac5c412b61603%3A0xc4c9a5e5dfdd76e7!2sSunway%20Medical%20Centre%20Penang!5e0!3m2!1sen!2smy!4v1712906610292!5m2!1sen!2smy"
            ></iframe>
          </div>
        </Col>
        <Col md={6} className="location-column">
          <h3 className="mt-5">Malacca</h3>
          <p>
            Pusat Perubatan Sunway Velocity, Lingkaran Sunway Velocity, 48481, Melaka
          </p>
          <p><a href="tel:03-5131-9028" className="btn btn-primary">Call Malacca Branch</a></p>
          <div className="g-map">
            <iframe
              width="100%"
              height="350"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8742240463625!2d101.71986257567596!3d3.1279364532812464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3616ea9079ad%3A0x1adda238eab28469!2sSunway%20Medical%20Centre%20Velocity%20(SMCV)%20Tower%20B!5e0!3m2!1sen!2smy!4v1712906741988!5m2!1sen!2smy"
            >
              </iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
*/