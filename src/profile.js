import React, { useState, useEffect } from 'react';
import './profile.css'; // Ensure to create this CSS file with your styles

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'Bengaluru, India',
    age: 28,
    height: 177,
    weight: 73,
    profilePicture: `${process.env.PUBLIC_URL}/img1.jpg`,
  });

  // Debugging: Check state change after each render
  useEffect(() => {
    console.log("isEditing state:", isEditing);
  }, [isEditing]);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: e.target.result,
      }));
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("Updated Profile:", profile);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <div id="topbar">
        <h1 id="title_company">Fitness Logger</h1>
        <h2 id="about-us"><a href="about_us.html">About us</a></h2>
      </div>

      <div id="profile-section">
        <h2 style={{ position: 'relative', left: '60px' }}>Profile</h2>
        <div id="profile-content">
          <img src={profile.profilePicture} alt="Profile" id="profile-photo" />
          <div id="user-details">
            {isEditing ? (
              <div id="edit-mode">
                <div className="input-group">
                  <label htmlFor="profile-picture">Profile Picture:</label>
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="location">Location:</label>
                  <input
                    type="text"
                    id="location"
                    value={profile.location}
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
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Height:</strong> {profile.height} cm</p>
                <p><strong>Weight:</strong> {profile.weight} Kg</p>
                <button className="edit-button" type="button" onClick={toggleEditMode}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
