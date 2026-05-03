import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSelect.css';

const defaultProfiles = [
  { id: 1, name: 'Me', color: '#e50914', emoji: '😎' },
  { id: 2, name: 'Kids', color: '#0071eb', emoji: '🧒' },
  { id: 3, name: 'Dad', color: '#e87c03', emoji: '👨' },
  { id: 4, name: 'Mom', color: '#54b9c5', emoji: '👩' },
];

function ProfileSelect() {
  const navigate = useNavigate();
  const [managing, setManaging] = useState(false);
  const [profiles, setProfiles] = useState(defaultProfiles);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  const handleProfileClick = (profile) => {
    if (managing) return;
    localStorage.setItem('activeProfile', JSON.stringify(profile));
    navigate('/');
  };

  const handleAddProfile = () => {
    if (!newName.trim()) return;
    const colors = ['#e50914', '#0071eb', '#e87c03', '#54b9c5', '#2ecc71'];
    const emojis = ['🙂', '😄', '🤩', '😊', '🎭'];
    const newProfile = {
      id: Date.now(),
      name: newName.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    };
    setProfiles([...profiles, newProfile]);
    setNewName('');
    setAdding(false);
  };

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  return (
    <div className="profile">
      <div className="profile__content">
        <img
          className="profile__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
        <h1 className="profile__heading">Who's watching?</h1>

        <div className="profile__grid">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="profile__card"
              onClick={() => handleProfileClick(profile)}
            >
              <div
                className="profile__avatar"
                style={{ backgroundColor: profile.color }}
              >
                <span className="profile__emoji">{profile.emoji}</span>
                {managing && (
                  <button
                    className="profile__delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProfile(profile.id);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="profile__name">{profile.name}</p>
            </div>
          ))}

          {profiles.length < 5 && (
            <div
              className="profile__card"
              onClick={() => setAdding(true)}
            >
              <div className="profile__avatar profile__avatar--add">
                <span className="profile__add__icon">+</span>
              </div>
              <p className="profile__name">Add Profile</p>
            </div>
          )}
        </div>

        {adding && (
          <div className="profile__add__form">
            <input
              type="text"
              placeholder="Profile name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="profile__input"
              autoFocus
            />
            <div className="profile__add__buttons">
              <button
                className="profile__btn profile__btn--save"
                onClick={handleAddProfile}
              >
                Save
              </button>
              <button
                className="profile__btn profile__btn--cancel"
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <button
          className="profile__manage"
          onClick={() => setManaging(!managing)}
        >
          {managing ? 'Done' : 'Manage Profiles'}
        </button>
      </div>
    </div>
  );
}

export default ProfileSelect;