import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('dob', userData.dob)
      formData.append('gender', userData.gender)
      if (image) formData.append('image', image)

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="max-w-3xl mx-auto p-6 text-gray-700">
      {/* Profile Image and Name */}
      <div className="flex flex-col items-center gap-4 mb-8">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative w-28 h-28">
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover shadow-md"
              />
              {!image && (
                <img
                  src={assets.upload_icon}
                  alt="Upload"
                  className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full"
                />
              )}
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt=""
            className="w-28 h-28 rounded-full shadow-md object-cover"
          />
        )}

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-center border rounded-md px-3 py-1 w-60"
          />
        ) : (
          <p className="text-xl font-semibold">{userData.name}</p>
        )}
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Contact Information */}
      <div className="mb-8 space-y-6">
        <p className="text-lg font-semibold text-gray-800">Contact Information</p>

        <div className="grid grid-cols-3 items-center gap-4 text-sm">
          <p className="text-gray-600 font-medium">Email:</p>
          <p className="col-span-2 text-blue-700">{userData.email}</p>
        </div>

        <div className="grid grid-cols-3 items-center gap-4 text-sm">
          <p className="text-gray-600 font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="col-span-2 border rounded-md px-3 py-1 w-full"
            />
          ) : (
            <p className="col-span-2">{userData.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-3 items-start gap-4 text-sm">
          <p className="text-gray-600 font-medium">Address:</p>
          {isEdit ? (
            <div className="col-span-2 space-y-2">
              <input
                type="text"
                value={userData?.address?.line1 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="border rounded-md px-3 py-1 w-full"
              />
              <input
                type="text"
                value={userData?.address?.line2 || ''}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="border rounded-md px-3 py-1 w-full"
              />
            </div>
          ) : (
            <p className="col-span-2">
              {userData?.address?.line1}
              <br />
              {userData?.address?.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="mb-8 space-y-6">
        <p className="text-lg font-semibold text-gray-800">Basic Information</p>

        <div className="grid grid-cols-3 items-center gap-4 text-sm">
          <p className="text-gray-600 font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="col-span-2 border rounded-md px-3 py-1 w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="col-span-2">{userData.gender}</p>
          )}
        </div>

        <div className="grid grid-cols-3 items-center gap-4 text-sm">
  <p className="text-gray-600 font-medium">Birthday:</p>
  {isEdit ? (
    <input
      type="date"
      value={userData.dob?.substring(0, 10) || ''}
      onChange={(e) =>
        setUserData((prev) => ({ ...prev, dob: e.target.value }))
      }
      className="col-span-2 border rounded-md px-3 py-1 w-full"
    />
  ) : (
    <p className="col-span-2">{userData.dob?.substring(0, 10)}</p>
  )}
</div>

      </div>

      {/* Buttons */}
      <div className="text-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
