import { Button } from 'react-bootstrap';
import { format } from 'date-fns';

export default function BookingRow ({ booking, openEditModal, openDeleteModal, isAdmin, currentUserId }) {

     return(
    <tr>
        <td>{booking.patient_name}</td>
        <td>{booking.location}</td>
        <td>{booking.service}</td>
        <td>{booking.doctor}</td>
        <td>{format(new Date(booking.booking_date), 'yyyy-MM-dd')}</td>
        <td>{booking.booking_time}</td>
        <td>{booking.contact_number}</td>
        <td>{booking.email}</td>
        <td>{booking.description}</td>
        <td>{booking.status}</td>
        <td>
            { (isAdmin || booking.userId === currentUserId) && (
                <>
            <Button variant="primary me-2 " onClick={() => openEditModal(booking)}>Edit</Button>
            <Button variant="danger" onClick={() => openDeleteModal(booking.booking_id)}>Delete</Button>
            </>
            )}
        </td>
    </tr>
    )
}
/*import { Button } from 'react-bootstrap';
import { format } from 'date-fns';

export default function BookingRow ({ booking, openEditModal, openDeleteModal, isAdmin, currentUserId }) {

     return(
    <tr>
        <td>{booking.patient_name}</td>
        <td>{booking.location}</td>
        <td>{booking.service}</td>
        <td>{booking.doctor}</td>
        <td>{format(new Date(booking.booking_date), 'yyyy-MM-dd')}</td>
        <td>{booking.booking_time}</td>
        <td>{booking.contact_number}</td>
        <td>{booking.email}</td>
        <td>{booking.description}</td>
        <td>{booking.status}</td>
        <td>
            { (isAdmin || booking.userId === currentUserId) && (
                <>
            <Button variant="primary" onClick={() => openEditModal(booking)}>Edit</Button>
            <Button variant="danger" onClick={() => openDeleteModal(booking.booking_id)}>Delete</Button>
            </>
            )}
        </td>
    </tr>
    )
} */