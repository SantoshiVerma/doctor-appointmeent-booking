import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-primary">All Registered Doctors</h2>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No doctors found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300"
            >
              {/* Image Box - only this changes on hover */}
              <div className="w-full h-60 bg-white group hover:bg-primary transition-colors duration-300 flex justify-center items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Doctor Info */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)} 
                    className="h-4 w-4 accent-primary"
                  />
                  <label className="text-sm text-gray-700">
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
