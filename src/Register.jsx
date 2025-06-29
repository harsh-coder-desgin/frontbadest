import { useState,useEffect } from 'react'
import axios from 'axios'

function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    avatar: null,
    coverImage: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullName', form.fullName)
    formData.append('email', form.email)
    formData.append('username', form.username)
    formData.append('password', form.password)
    formData.append('avatar', form.avatar)
    if (form.coverImage) formData.append('coverImage', form.coverImage)

   try {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const res = await axios.post(`${API_URL}/api/v1/users/register`, formData);
  
  console.log('Registered:', res.data);
  console.log(res);
  console.log(API_URL, "qqq");

  alert(res.data.message || 'Registered successfully');
  } catch (err) {
  console.error('Registration failed', err);
  }
}
useEffect(() => {
    const pingBackend = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const res = await axios.get(`${API_URL}/api/v1/users/ping`);
        console.log("✅ Ping Success:", res.data);
        console.log(res);
        } catch (err) {
        console.error("❌ Ping failed:", err.message);
      }
    };

    pingBackend();
  }, []);
  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <label>Avatar Image:</label>
        <input type="file" name="avatar" accept="image/*" required onChange={handleChange} />
        <label>Cover Image (optional):</label>
        <input type="file" name="coverImage" accept="image/*" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
