import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';

export default function DoctorList() {
  const selectedDepartment = useSelector((state) => state.department.selectedDepartment);
  const doctors = useSelector((state) => state.doctor.doctors);
  const navigate = useNavigate();

  if (!selectedDepartment) return <p>Please select a department to view doctors.</p>;

  const filteredDoctors = doctors.filter(doctor => doctor.departmentId === selectedDepartment);

  const handleAppointmentEnquiry = (doctor) => {
    navigate('/booking', { state: { doctor } }); // Navigate to the booking page with doctor state
  };

  return (
    <div className="doctor-list">
      {filteredDoctors.length > 0 ? filteredDoctors.map((doctor) => (
        <Card key={doctor.id} className="doctor-item mb-3">
          <Card.Img variant="top" src={doctor.image_url} alt={doctor.name} />
          <Card.Body>
            <Card.Title>{doctor.name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Specialty: {doctor.specialty}</ListGroup.Item>
              <ListGroup.Item>Languages: {doctor.languages}</ListGroup.Item>
              <ListGroup.Item>Gender: {doctor.gender}</ListGroup.Item>
              <ListGroup.Item>Qualifications: {doctor.qualifications}</ListGroup.Item>
              <ListGroup.Item>Location: {doctor.location}</ListGroup.Item>
              <ListGroup.Item>Contact: {doctor.contact}</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" className="mt-3">Schedule & Detail</Button>
            <Button 
            variant="secondary" 
            className="mt-3 ml-2"
            onClick={() => handleAppointmentEnquiry(doctor)}>
              Appointment Enquiry
              </Button>
          </Card.Body>
        </Card>
      )) : <p>No doctors available for this department.</p>}
    </div>
  );
}