import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDepartment } from '../features/departmentSlice';
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap';
import DoctorList from './DoctorList';

export default function DepartmentList() {
  const departments = useSelector((state) => state.department.departments);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [activeDepartmentId, setActiveDepartmentId] = useState(null);


 const handleDepartmentClick = (departmentId) => {
    /*dispatch(selectDepartment(departmentId)); */
    setActiveDepartmentId(departmentId);
    setShowModal(true);
    // If you also need to fetch doctors for this department, dispatch that action here
  }; 

  const handleViewDoctors = (departmentId) => {
    setActiveDepartmentId(departmentId);
    dispatch(selectDepartment(departmentId));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(selectDepartment(null));
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <h1 className="m-2 p-2">Find a Doctor</h1>
          {departments.map((department) => (
            <Col md={4} className="mb-4 d-flex align-items-stretch" key={department.id}>
              <Card className="w-100">
                <Card.Img variant="top" src={department.image_url} alt={department.name} />
                <Card.Body>
                  <Card.Title>{department.name}</Card.Title>
                  <Button variant="primary" onClick={() => handleViewDoctors(department.id)}>View Doctors</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Doctors List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorList />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


