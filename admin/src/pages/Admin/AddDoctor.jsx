import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docImg, setDocImage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [available, setAvailable] = useState(true);

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        toast.error('Image not selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', fees);
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
      formData.append('available', available.toString()); // always as "true"/"false"

      // Optional debug
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          aToken,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImage(false);
        setName('');
        setEmail('');
        setPassword('');
        setExperience('1 Year');
        setFees('');
        setAbout('');
        setSpeciality('General Physician');
        setDegree('');
        setAddress1('');
        setAddress2('');
        setAvailable(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log('❌ Add doctor error:', err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <p className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Doctor</p>

      <div className="flex flex-col items-center gap-3">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt=""
            className="w-32 h-32 object-contain rounded-full border-2 border-dashed border-gray-400"
          />
        </label>
        <input type="file" id="doc-img" hidden onChange={(e) => setDocImage(e.target.files[0])} />
        <p className="text-sm text-gray-600 text-center">Upload doctor picture</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required className="w-full p-2 border border-gray-300 rounded" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full p-2 border border-gray-300 rounded" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
          <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={`${i + 1} Year`}>
                {i + 1} Year
              </option>
            ))}
          </select>
          <input value={fees} onChange={(e) => setFees(e.target.value)} type="number" placeholder="Fees" required className="w-full p-2 border border-gray-300 rounded" />
        </div>

        <div className="space-y-4">
          <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
          <input value={degree} onChange={(e) => setDegree(e.target.value)} type="text" placeholder="Education" required className="w-full p-2 border border-gray-300 rounded" />
          <div className="flex gap-4">
            <input value={address1} onChange={(e) => setAddress1(e.target.value)} type="text" placeholder="Address Line 1" required className="w-full p-2 border border-gray-300 rounded" />
            <input value={address2} onChange={(e) => setAddress2(e.target.value)} type="text" placeholder="Address Line 2" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="available" checked={available} onChange={(e) => setAvailable(e.target.checked)} className="h-4 w-4" />
            <label htmlFor="available" className="text-gray-700">Available for appointments</label>
          </div>
        </div>
      </div>

      <div>
        <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About doctor" rows={5} required className="w-full p-2 border border-gray-300 rounded resize-none" />
      </div>

      <div className="text-center">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
