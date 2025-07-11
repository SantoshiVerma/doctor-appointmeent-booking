import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);

  const normalize = (str = '') =>
    str.toLowerCase().replace(/[\s_]/g, ''); // ✅ remove both spaces and underscores

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) =>
          doc.speciality &&
          normalize(doc.speciality) === normalize(speciality)
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className='px-6 sm:px-10 md:px-16 lg:px-20 py-10'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
        Browse through the Doctors Specialists
      </h1>

      {/* Filter Pills */}
      <div className='flex flex-wrap gap-2 mb-6'>
        {[
          'All',
          'General_physician',
          'Gynecologist',
          'Dermatologist',
          'Pediatricians',
          'Neurologist',
          'Gastroenterologist',
        ].map((item, index) => (
          <button
            key={index}
            onClick={() =>
              item === 'All'
                ? navigate('/doctors')
                : navigate(`/doctors/${item.toLowerCase()}`)
            }
            className={`px-4 py-1 rounded-full text-sm transition-all ${
              normalize(speciality) === normalize(item)
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {item.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filterDoc.length > 0 ? (
          filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='bg-white rounded-xl border border-blue-200 overflow-hidden shadow-sm cursor-pointer hover:-translate-y-2 transition-transform duration-300'
            >
              <img
                className='w-full max-h-60 object-contain bg-white p-2 rounded-t-xl'
                src={item.image}
                alt={item.name}
              />
              <div className='p-4 space-y-1'>
                <div className='flex items-center gap-2 text-sm text-green-600'>
                  <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 col-span-full'>
            No doctors found for this speciality.
          </p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
