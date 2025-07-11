import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAppointment = () => {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const navigate =useNavigate()

  const slotDateFormat = (slotDate) => {
    const [day, monthNum, year] = slotDate.split('_');
    const month = months[Number(monthNum) - 1] || "Invalid";
    return `${day} ${month} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error cancelling appointment");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try{

          const {data} =await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})

          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }

        } catch(error){

          console.log(error)
          toast.error(error.message)


        }
        
    }
  }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, {
        appointmentId,
      }, {
        headers: { token }
      });

      if (data.success) {
        // attach appointmentId to order for verification
        data.order.appointmentId = appointmentId;
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error initializing Razorpay");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <p className="text-2xl font-semibold text-gray-800 mb-6 text-center">My Appointments</p>

      <div className="grid gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6 border border-gray-200"
          >
            {/* Doctor Image */}
            <div className="w-full md:w-40 flex justify-center">
              <img
                src={item.docData.image}
                alt="Doctor"
                className="w-full max-h-40 object-contain rounded-md"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-2">
              <p className="text-xl font-medium text-gray-800">{item.docData.name}</p>
              <p className="text-sm text-gray-500">{item.docData.speciality}</p>
              <p className="text-sm text-gray-600 font-semibold">Address:</p>
              <p className="text-sm text-gray-500">{item.docData.address?.line1 || 'Not Available'}</p>
<p className="text-sm text-gray-500">{item.docData.address?.line2 || ''}</p>

              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold">Date & Time: </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-between gap-3 md:items-end md:ml-4">
              {!item.cancelled && item.payment && (
                <button className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-md cursor-default border border-green-300">
                  Paid
                </button>
              )}

              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <button className="bg-red-100 text-red-600 px-4 py-2 rounded-md cursor-default">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
