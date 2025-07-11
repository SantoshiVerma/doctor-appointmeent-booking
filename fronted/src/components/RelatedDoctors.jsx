import React, { useContext, useEffect, useState } from 'react'
import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({speciality,docId}) => {

  const {doctors}=useContext(AppContext)
  const navigate =useNavigate()

      const [relDoc,setRelDocs] =useState([])

      useEffect(()=>{
        if(doctors.length>0 && speciality){
           const doctorsData =doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)

           setRelDocs(doctorsData)
        }
        
      },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctor Cards Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
            key={index}
            className='w-full bg-white rounded-xl border border-blue-200 overflow-hidden shadow-sm cursor-pointer hover:-translate-y-2 transition-transform duration-300'
          >
            {/* Doctor Image */}
            <img
              className='w-full max-h-60 object-contain bg-white p-2 rounded-t-xl'
              src={item.image}
              alt={item.name}
            />

            {/* Card Content */}
            <div className='p-4 space-y-1'>
              <div className='flex items-center gap-2 text-sm text-green-600'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

   
     
    </div>
  )
}

export default RelatedDoctors
