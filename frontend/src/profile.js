import React, { useState, useEffect } from 'react';
import './profile.css'; 

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    loc: '',
    age: null,
    height: null,
    weight: null,
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedLoc = localStorage.getItem('loc');
    const storedAge = localStorage.getItem('age');
    const storedHeight = localStorage.getItem('height');
    const storedWeight = localStorage.getItem('weight');

    setProfile({
      name: storedUsername || '',
      email: storedEmail || '',
      loc: storedLoc || '',
      age: storedAge || '',
      height: storedHeight || '',
      weight: storedWeight || '',
    });
  }, []);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: profile.email,
        }),
      });
  
      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('loc');
        localStorage.removeItem('age');
        localStorage.removeItem('height');
        localStorage.removeItem('weight');
        setUsername('');
        window.location.href = '/login'; 
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while trying to delete the account.");
    }
  };
  
  

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: profile.name,
          loc: profile.loc,
          age: profile.age,
          height: profile.height,
          weight: profile.weight,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Profile updated successfully!');
        setIsEditing(false);
        localStorage.setItem('username', profile.name);
        localStorage.setItem('email', profile.email);
        localStorage.setItem('loc', profile.loc);
        localStorage.setItem('age', profile.age);
        localStorage.setItem('height', profile.height);
        localStorage.setItem('weight', profile.weight);

        console.log('Updated localStorage:', {
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email'),
          loc: localStorage.getItem('loc'),
          age: localStorage.getItem('age'),
          height: localStorage.getItem('height'),
          weight: localStorage.getItem('weight'),
        });

      } else {
        alert(data.message || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div id="topbar">
        <h1 id="title_company">Fitness Logger</h1>
        <h2 id="about-us"><a href="/about_us">About us</a></h2>
      </div>

      <div id="profile-section">
        <h2 style={{ position: 'relative', left: '60px' }}>Profile</h2>
        <div id="profile-content">
          <img src={`${process.env.PUBLIC_URL}/img2.jpg`} alt="Profile" id="profile-photo" />
          <div id="user-details">
            {isEditing ? (
              <div id="edit-mode">
                <div className="input-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="loc">Location:</label>
                  <input
                    type="text"
                    id="loc" 
                    value={profile.loc}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    value={profile.age}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="height">Height (cm):</label>
                  <input
                    type="number"
                    id="height"
                    value={profile.height}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="weight">Weight (kg):</label>
                  <input
                    type="number"
                    id="weight"
                    value={profile.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="edit-button" type="button" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="edit-button" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <div id="view-mode">
                <h3>{profile.name}</h3>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Location:</strong> {profile.loc}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Height:</strong> {profile.height} cm</p>
                <p><strong>Weight:</strong> {profile.weight} kg</p>
                <button className="edit-button" onClick={toggleEditMode}>Edit Profile</button>
                <button className="edit-button" onClick={deleteAccount}>Delete Account</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
