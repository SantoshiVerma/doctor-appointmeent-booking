import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { currency } = useContext(AppContext);
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext); 
  

  const [isEdit, setIsEdit] = useState(false);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setLocalData(profileData);
    }
  }, [profileData]);

  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',  // ✅ POST not PUT
        { ...localData },
        {
          headers: { dtoken: dToken },
        }
      );
  
      if (data.success) {
        toast.success('Profile updated successfully');
        getProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Update failed');
    }
  };
  

  const handleCancel = () => {
    setLocalData(profileData); // reset changes
    setIsEdit(false);
  };

  if (!localData) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Doctor Image */}
      <div className="flex justify-center mb-6">
        <img
          src={localData.image}
          alt="Doctor"
          className="w-40 h-40 rounded-full object-contain shadow"
        />
      </div>

      {/* Doctor Info */}
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold text-gray-800">{localData.name}</p>
        <p className="text-gray-600">
          {localData.degree} &mdash; {localData.speciality}
        </p>
        <p className="text-sm text-gray-500">Experience: {localData.experience} years</p>
      </div>

      {/* About */}
      <div className="mt-6">
        <p className="text-lg font-semibold text-gray-700">About:</p>
        {isEdit ? (
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md text-gray-700 mt-1"
            value={localData.about}
            onChange={(e) =>
              setLocalData((prev) => ({ ...prev, about: e.target.value }))
            }
          />
        ) : (
          <p className="text-gray-600">{localData.about}</p>
        )}
      </div>

      {/* Appointment Fee */}
      <div className="mt-4">
        <p className="text-lg font-medium text-gray-700">
          Appointment Fee:{' '}
          <span className="text-green-600 font-semibold">
            {currency}
            {isEdit ? (
              <input
                type="number"
                className="border px-2 py-1 rounded w-24 ml-2"
                value={localData.fees}
                onChange={(e) =>
                  setLocalData((prev) => ({ ...prev, fees: e.target.value }))
                }
              />
            ) : (
              localData.fees
            )}
          </span>
        </p>
      </div>

      {/* Address */}
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-700">Address:</p>
        {isEdit ? (
          <>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="Address Line 1"
              value={localData.address.line1}
              onChange={(e) =>
                setLocalData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Address Line 2"
              value={localData.address.line2}
              onChange={(e) =>
                setLocalData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </>
        ) : (
          <p className="text-gray-600 whitespace-pre-line">
            {localData.address.line1}
            <br />
            {localData.address.line2}
          </p>
        )}
      </div>

      {/* Availability */}
      <div className="mt-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={localData.available}
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, available: e.target.checked }))
          }
          id="availability"
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          disabled={!isEdit}
        />
        <label htmlFor="availability" className="text-sm text-gray-700">
          Available
        </label>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {isEdit ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
