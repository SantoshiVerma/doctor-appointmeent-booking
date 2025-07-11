import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  useEffect(() => {
    console.log("Appointments data from backend:", appointments);
  }, [appointments]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <p className="mb-4 text-xl font-semibold text-gray-800">All Appointments</p>

      <div className="bg-white border rounded-md text-sm max-h-[80vh] overflow-y-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr] gap-2 py-3 px-6 border-b bg-gray-100 font-medium text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Amount</p>
          <p>Cancel</p>
          <p>Status</p>
        </div>

        {/* Table Rows */}
        {appointments.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr] gap-2 items-center py-4 px-6 border-b"
            >
              {/* Serial Number */}
              <p className="font-medium text-gray-700">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-2">
                {item.userData?.image ? (
                  <img
                    src={item.userData.image}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    N/A
                  </div>
                )}
                <p className="text-gray-800">{item.userData?.name || "Unknown"}</p>
              </div>

              {/* Age */}
              <p className="text-gray-700">
                {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}
              </p>

              {/* Date & Time */}
              <p className="text-gray-600">
                {item.slotDate ? slotDateFormat(item.slotDate) : 'N/A'} at {item.slotTime || 'N/A'}
              </p>

              {/* Doctor Info */}
              <div className="flex items-center gap-2">
                {item.docData?.image ? (
                  <img
                    src={item.docData.image}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    N/A
                  </div>
                )}
                <p className="text-gray-800">{item.docData?.name || 'Unknown'}</p>
              </div>

              {/* Amount */}
              <p className="text-gray-700">{currency}{item.amount}</p>

              {/* Cancel Button */}
              <div>
                {item.cancelled || !item.payment ? (
                  <span className="text-gray-400 text-xs">N/A</span>
                ) : (
                  <img
                    onClick={() => {
                      if (window.confirm("Are you sure you want to cancel this appointment?")) {
                        cancelAppointment(item._id);
                      }
                    }}
                    src={assets.cancel_icon}
                    className="w-5 cursor-pointer "
                    title="Cancel Appointment"
                    alt="Cancel"
                  />
                )}
              </div>

              {/* Status */}
              <p className="text-xs">
                {item.cancelled ? (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded">Cancelled</span>
                ) : item.payment ? (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded">Paid</span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Pending</span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
