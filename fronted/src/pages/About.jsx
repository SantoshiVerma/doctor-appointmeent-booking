import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
       <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>

       </div>
       <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[420px] rounded-lg' src ={assets.about_image} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        Welcome to <span className="font-semibold text-primary">Prescripto</span>your trusted digital platform for scheduling appointments with verified doctors across multiple specialties. Our mission is to make healthcare access fast, easy, and convenient for everyone—no long waiting times, no unnecessary paperwork, just direct access to expert care when you need it most.
        <p>
          At Prescripto, patients can explore doctor profiles, check real-time availability, and book appointments either online or for in-clinic visits. Whether you need a general physician, pediatrician, dermatologist, neurologist, or any other specialist, our platform helps you make informed decisions with ease. Each doctor is carefully verified, and their qualifications, experience, and ratings are transparently available for you.
        </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
          Our Vision is to revolutionize the way people access healthcare by creating a seamless bridge between patients and doctors through technology. We aim to build a world where quality medical care is just a click away — accessible, affordable, and available to everyone, no matter where they are. By empowering individuals to make informed decisions and manage their health proactively, we hope to create healthier, stronger communities.

        </p>
        </div>
       </div>
       <div className='text-xl my-4'>
        <p>
          WHY <span className='text-gray-700'>CHOOSE US</span>
        </p>

       </div>
       <div className='flex flex-col md:flex-row mb-20'>
       <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        
   <b>Efficiency:</b>
   <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Convenience:</b>
        <p>Access to a network of trustes healthcare professionals in your area. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b> Personalization:</b>
        <p>Tailored recommendations and reminders to help you stay on top of ypur health.</p>
        </div>
       </div>
    </div>
  )
}

export default About
