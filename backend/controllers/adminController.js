import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from '../models/doctorModel.js'
import jwt  from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'



const addDoctor = async (req, res) => {
  try {
    console.log("req.body =>", req.body);
    console.log("req.file =>", req.file);

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available
    } = req.body;

    const imageFile = req.file;

    // Validate required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !available) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check for duplicate email
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Validate image upload
    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Doctor image is required" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    const imageUrl = imageUpload.secure_url;

    // Parse address string
    let parsedAddress;
    try {
      parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
    } catch {
      return res.status(400).json({ success: false, message: "Invalid address format" });
     
    }

    // Create new doctor object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees), // Ensure number
      address: parsedAddress,
      available: available === 'true' || available === true,
 // string to boolean
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.status(201).json({ success: true, message: "Doctor added successfully" });

  } catch (error) {
    console.error("Error in addDoctor:", error);
    return res.status(500).json({ success: false, message: error.message });
    
  }
};



//api for admin login

const loginAdmin =async(req,res)=>{
  try{
    
    const {email,password}= req.body

    if(email === process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){

     const token =jwt.sign(email+password,process.env.JWT_SECRET)
     res.json({success:true,token})


    } else{
      res.json({success:false,message:"Invaild credentials"})
    } 
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }


}
 //API to get all doctors list for admin panel
 const allDoctors = async (req,res) =>{

  try{
    const doctors =await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
  }catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
 }


 //API to get all appointment list
 const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    const fixedAppointments = appointments.map(app => {
      const docData = app.docData || {};
      const userData = app.userData || {};

      return {
        ...app._doc, // include all base data
        docData: {
          name: docData.name || '',
          image: docData.image || '',
          speciality: docData.speciality || ''
        },
        userData: {
          name: userData.name || '',
          image: userData.image || '',
          dob: userData.dob || ''
        }
      };
    });

    res.json({ success: true, appointments: fixedAppointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
} // api for appointment canceeled

const appointmentCancel = async (req,res) =>{
  try{

    const {appointmentId} =req.body

    const appointmentData =await appointmentModel.findById(appointmentId)

    //verify appointment user

    

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    //releasing doctor slot

     const {docId,slotDate,slotTime} =appointmentData

     const doctorData= await doctorModel.findById(docId)

     let slots_booked=doctorData.slots_booked

     slots_booked[slotDate]=slots_booked[slotDate].filter(e => e!==slotTime)

     await doctorModel.findByIdAndUpdate(docId,{slots_booked})

     res.json({success:true,message:'Appointment Cancelled'})

  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//Api to get dashbord data for admon panel

const adminDashBoard =async(req,res)=>{

  try{
    const doctors =await doctorModel.find({})

    const users =await userModel.find({})

    const appointment=await appointmentModel.find({})

    const dashData={
      doctors:doctors.length,
      appointment:appointment.length,
      patients:users.length,
      latestAppointments:appointment.reverse().slice(0,5)
    }
    res.json({success:true,dashData})

  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})

  }
}


export { addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashBoard};
