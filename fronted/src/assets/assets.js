import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import logo from './logo.svg'
import profile_pic from './profile_pic.png'
import dropdown_icon from './dropdown_icon.svg'
import group_profiles from './group_profiles.png'
import arrow_icon from './arrow_icon.svg'

import header_img from './header_img.png' 
import appointment_image from './appointment_image.png'



import General_physician from './General_physician.svg';
import Gynecologist from './Gynecologist.svg';
import Dermatologist from './Dermatologist.svg';
import Pediatricians from './Pediatricians.svg';
import Neurologist from './Neurologist.svg';
import Gastroenterologist from './Gastroenterologist.svg';
import docalbeena from './docalbeena.png'
import docarvind from './docarvind.png'
import dochemant from './dochemant.png'
import docrenuka from './docrenuka.png'
import docrajat from './docrajat.png'
import docmanish from './docmanish.png'
import docneha from './docneha.png'
import docnishant from './docnishant.png'
import info_icon from './info_icon.svg'

import docpooja from './docpooja.png'
import verified_icon from './verified_icon.svg'
import about_image from './about_image.png'
import contact_image from './contact_image.png'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import dockhushi from './dockhushi.png'
export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    logo,
    profile_pic,
    dropdown_icon,
    group_profiles,
    arrow_icon,
    header_img,
    appointment_image,
    verified_icon,
    info_icon,
    about_image,
    contact_image,
    menu_icon,
    cross_icon
}

export const specialityData = [
    {
      speciality: 'General_physician',
      image: General_physician,
    },
    {
        speciality: "Gynecologist",
      image: Gynecologist,
    },
    {
        speciality: "Dermatologist",
      image: Dermatologist,
    },
    {
        speciality: "Pediatricians",
      image: Pediatricians,
    },
    {
        speciality: "Neurologist",
      image: Neurologist,
    },
    {
        speciality: "Gastroenterologist",
      image: Gastroenterologist,
    }
  ];
  export const doctors = [
    
      {
        _id: "doc1",
        name: "Dr. Renuka Verma",
        image: docrenuka,
        speciality: "General_physician",
        degree: "MBBS, MD (General Medicine)",
        experience: "10 years",
        about: "Experienced in treating chronic illnesses and primary care management. Skilled in hypertension, diabetes, and lifestyle disorders. Offers long-term care and follow-up consultations.",
        fees: 500,
        address: {
          line1: "123 Health Street",
          line2: "Mumbai"
        }
      },
      {
        _id: "doc2",
        name: "Dr. Albeena Khan",
        image: docalbeena,
        speciality: "Gynecologist",
        degree: "MBBS, MS (Gynecology)",
        experience: "8 years",
        about: "Specialist in women's health, pregnancy, and reproductive care. Experienced in prenatal and postnatal treatment. Offers counseling for fertility and menstrual disorders.",
        fees: 700,
        address: {
          line1: "22 Women's Care Lane",
          line2: "Delhi"
        }
      },
      {
        _id: "doc3",
        name: "Dr. Rajat Singh",
        image: docrajat,
        speciality: "Dermatologist",
        degree: "MBBS, MD (Dermatology)",
        experience: "6 years",
        about: "Expert in skin, hair, and nail disorders with cosmetic treatment experience. Treats acne, pigmentation, and fungal infections. Provides skin rejuvenation and laser therapy.",
        fees: 600,
        address: {
          line1: "45 Skin Wellness Avenue",
          line2: "Bengaluru"
        }
      },
      {
        _id: "doc4",
        name: "Dr. Hemant Parmar",
        image: dochemant,
        speciality: "Pediatricians",
        degree: "MBBS, MD (Pediatrics)",
        experience: "9 years",
        about: "Provides medical care for infants, children, and adolescents. Specializes in vaccinations and child development. Handles nutrition and seasonal infections in kids.",
        fees: 550,
        address: {
          line1: "8 Kids Health Plaza",
          line2: "Hyderabad"
        }
      },
      {
        _id: "doc5",
        name: "Dr. Arvind Rao",
        image: docarvind,
        speciality: "Neurologist",
        degree: "MBBS, DM (Neurology)",
        experience: "12 years",
        about: "Specialist in neurological disorders, stroke, and epilepsy management. Treats migraines, nerve damage, and memory issues. Provides EEG and advanced diagnostics.",
        fees: 800,
        address: {
          line1: "88 Neuro Care Road",
          line2: "Pune"
        }
      },
      {
        _id: "doc6",
        name: "Dr. Khushi khernal",
        image: dockhushi,
        speciality: "Gynecologist",
        degree: "MBBS, MS (Gynecology)",
        experience: "8 years",
        about: "Specialist in women's health, pregnancy, and reproductive care. Experienced in prenatal/postnatal treatment and fertility counseling. Committed to providing empathetic and informed care to all patients.",
        fees: 700,
        address: {
          line1: "22 Women's Care Lane",
          line2: "Delhi"
        }
      },
      {
        _id: "doc7",
        name: "Dr. Manish Deshmukh",
        image: docmanish,
        speciality: "General_physician",
        degree: "MBBS",
        experience: "5 years",
        about: "Focused on diagnosing common illnesses and lifestyle management. Manages diabetes, cholesterol, and viral infections. Offers personalized health counseling.",
        fees: 400,
        address: {
          line1: "47 Care Clinic",
          line2: "Nagpur"
        }
      },
      {
        _id: "doc8",
        name: "Dr. Neha Verma",
        image: docneha,
        speciality: "Gynecologist",
        degree: "MBBS, DGO",
        experience: "11 years",
        about: "Specialist in female reproductive health and menstrual disorders. Skilled in managing PCOS and hormonal imbalances. Provides pregnancy and postpartum care.",
        fees: 650,
        address: {
          line1: "12 Blossom Hospital",
          line2: "Jaipur"
        }
      },
      {
        _id: "doc9",
        name: "Dr. Sulochna Verma",
        image: docpooja,
        speciality: "Dermatologist",
        degree: "MBBS, DDVL",
        experience: "4 years",
        about: "Skin specialist with a focus on acne, allergies, and hair loss treatment. Provides chemical peels, dermabrasion, and skin allergy testing. Helps in scar and mole removal.",
        fees: 500,
        address: {
          line1: "19 SkinCraft Clinic",
          line2: "Ahmedabad"
        }
      },
      {
        _id: "doc10",
        name: "Dr. Nishant Bhatia",
        image: docnishant,
        speciality: "Pediatricians",
        degree: "MBBS, DCH",
        experience: "6 years",
        about: "Offers child immunizations and growth monitoring consultations. Treats newborn issues, allergies, and common fevers. Ensures holistic child wellness and development.",
        fees: 550,
        address: {
          line1: "73 ChildCare Hub",
          line2: "Bhopal"
        }

      }
    
    
  ];
  
