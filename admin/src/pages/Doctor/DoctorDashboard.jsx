import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'



const DoctorDashboard = () => {

  const {dToken,dashData,setDashData,getDashData,cancelAppointment,completeAppointment} =useContext(DoctorContext)
  const {currency}=useContext(AppContext)
const {slotDateFormat} =useContext(AppContext)
  useEffect(()=>{
    if(dToken){
      getDashData()
    }

  },[dToken])

  return dashData && (
    <div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
                  <img src={assets.earning_icon} alt="" className="w-12 h-12" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{currency},{dashData.earnings}</p>
                    <p className="text-gray-500">Doctors</p>
                  </div>
                </div>
      
                <div className="flex items-center p-4 bg-white shadow rounded-xl space-x-4">
                  <img src={assets.appointments_icon} alt="" className="w-12 h-12" />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
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
       src={item.userData?.image || "https://via.placeholder.com/40"}
     alt="User"
        className="w-10 h-10 rounded-full object-cover"
/>

                                <div>
                                  <p className="font-semibold text-gray-800">{item.userData?.name || "N/A"}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {slotDateFormat(item.slotDate)}
                                  </p>
                                </div>
                              </div>
              
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
      
    </div>
  )
}

export default DoctorDashboard
