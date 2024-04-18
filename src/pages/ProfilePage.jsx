import BookingTable from '../components/BookingTable';
import ProfileDetails from '../components/ProfileDetails';


export default function ProfilePage() {
  return (
    <>
    <div className="profile-page-bg">
    <ProfileDetails />      
    <BookingTable />
    </div>
    </>
  )
}