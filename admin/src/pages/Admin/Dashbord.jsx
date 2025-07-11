import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashbord = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

  const {slotDateFormat} =useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Top summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
            <img src={assets.doctor_icon} alt="" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
            <img src={assets.appointments_icon} alt="" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.appointment}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
            <img src={assets.patients_icon} alt="" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="mt-8">
          <div className="flex items-center gap-3 p-4 bg-white shadow-md rounded-lg mb-4">
            <img src={assets.list_icon} alt="" className="w-8 h-8" />
            <p className="text-lg font-semibold text-gray-800">Latest Bookings</p>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-12 h-12 rounded-full object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                <div>
                  {item.cancelled || !item.payment ? (
                    <span className="text-gray-400 text-xs">N/A</span>
                  ) : (
                    <img
                      onClick={() => {
                        if (
                          window.confirm('Are you sure you want to cancel this appointment?')
                        ) {
                          cancelAppointment(item._id);
                        }
                      }}
                      src={assets.cancel_icon}
                      className="w-5 cursor-pointer"
                      title="Cancel Appointment"
                      alt="Cancel"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashbord;
