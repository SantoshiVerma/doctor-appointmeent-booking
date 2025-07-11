import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  // Correct VITE env variable usage
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") || ""
  );

  const [appointments, setAppointments] = useState([]);

  const[dashData,setDashData] =useState(false)
  const[profileData,setProfileData]=useState(false)


  // GET doctor appointments
  const getAppointments = async () => {
    console.log("Token found, calling getAppointments");

    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { dtoken: dToken } // must match what backend expects
        }
      );

      console.log("API Response =>", data);

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("API Error =>", error);
      toast.error("Failed to fetch appointments");
    }
  }

 // ✅ Corrected POST: Complete Appointment
const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/doctor/complete-appointment",
      { appointmentId },
      { headers: { dtoken: dToken } } // ✅ fixed here
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// ✅ Corrected POST: Cancel Appointment
const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/doctor/cancel-appointment",
      { appointmentId },
      { headers: { dtoken: dToken } } // ✅ fixed here
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

const getDashData =async () =>{

  try{
    const {data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})

    if(data.success){
      setDashData(data.dashData)
      console.log(data.dashData)
    } else{
      toast.error(data.message)
    }


  }catch(error){
    console.log(error);
    toast.error(error.message);

  }
}
 const getProfileData =async () =>{
  try{
    const {data}= await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
    if(data.success){
      setProfileData(data.profileData)
      console.log(data.profileData)
    }

  }catch(error){
    console.log(error);
    toast.error(error.message);

  }
 }





  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashData,setDashData,getDashData,
    profileData,setProfileData,getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
