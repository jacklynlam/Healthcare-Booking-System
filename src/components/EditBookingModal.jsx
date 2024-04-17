import { Modal, Button, Form } from 'react-bootstrap';

export default function EditBookingModal({ show, onHide, booking, status, onStatusChange, onSubmit, onInputChange, isAdmin, currentUser }) {
    console.log('Modal Props:', { isAdmin, currentUser, bookingUserId: booking.userId });

return (   
   <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="patient_name"
                        required
                        value={booking.patient_name || ''}
                        onChange={onInputChange}
                        disabled={!isAdmin && booking.userId !== currentUser.id}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="contact_number"
                        value={booking.contact_number || ''}
                        onChange={onInputChange}
                        disabled={!isAdmin && booking.userId !== currentUser.id}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={booking.email || ''}
                        onChange={onInputChange}
                        disabled={!isAdmin && booking.userId !== currentUser.id}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={booking.description || ''}
                        onChange={onInputChange}
                        disabled={!isAdmin && booking.userId !== currentUser.id}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={status}
                        onChange={onStatusChange}
                        disabled={!isAdmin}  // Disable if not admin
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
        </Modal.Body>
    </Modal>
)
}
/*import { Modal, Button, Form } from 'react-bootstrap';

export default function EditBookingModal({ show, onHide, booking, status, onStatusChange, onSubmit, onInputChange, isAdmin, currentUser }) {
    console.log(isAdmin, currentUser);
    const canEditAll = isAdmin || booking.userId === currentUser.id;
    console.log("isAdmin:", isAdmin, "currentUser.id:", currentUser.id, "booking.userId:", booking.userId, "canEditAll:", canEditAll);


return (   
    
   <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="patient_name"
                        required
                        value={booking.patient_name || ''}
                        onChange={onInputChange}
                        disabled={!canEditAll}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="contact_number"
                        value={booking.contact_number || ''}
                        onChange={onInputChange}
                        disabled={!canEditAll}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={booking.email || ''}
                        onChange={onInputChange}
                        disabled={!canEditAll}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={booking.description || ''}
                        onChange={onInputChange}
                        disabled={!canEditAll}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={status}
                        onChange={onStatusChange}
                        disabled={!isAdmin}  // Disable if not admin
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
        </Modal.Body>
    </Modal>
)
}
*/