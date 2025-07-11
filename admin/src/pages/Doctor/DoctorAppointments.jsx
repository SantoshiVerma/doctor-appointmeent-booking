import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      console.log("Token found, calling getAppointments");
      getAppointments();
    } else {
      console.warn("No dToken found");
    }
  }, [dToken]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <p className="text-2xl font-bold mb-6 text-gray-800 text-center">All Appointments</p>

      <div className="overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-7 gap-4 bg-gray-100 p-3 rounded-t-md font-semibold text-gray-700 text-sm text-center border-y">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-7 gap-4 items-center bg-white p-4 border-b text-sm text-center hover:bg-gray-50"
          >
            <p>{index + 1}</p>

            {/* Patient Name & Image */}
            <div className="flex items-center justify-center gap-2">
              <img
                src={item.userData?.image || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="truncate">{item.userData?.name || "N/A"}</p>
            </div>

            {/* Payment */}
            <p className="text-gray-600">
              {item.payment ? "Online" : "CASH"}
            </p>

            {/* Age */}
            <p>{item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}</p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>
              {currency}
              {item.amount}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-3">
              {item.cancelled ? (
                <p className="text-red-500 font-semibold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-600 font-semibold">Completed</p>
              ) : (
                <>
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-5 cursor-pointer hover:scale-110 transition"
                    title="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt="Confirm"
                    className="w-5 cursor-pointer hover:scale-110 transition"
                    title="Confirm Appointment"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
