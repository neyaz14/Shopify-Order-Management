
import  { useState, useEffect } from 'react';

import axios from 'axios';
import ModalStoreData from './ModalStoreData';

const UserManage = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

 

  if (!userData) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p className="mb-2"><strong>Name:</strong> {userData.name}</p>
      <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
      <p className="mb-4"><strong>Role:</strong> {userData.role}</p>

      <button
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        Add Shopify Store
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Shopify Store</h3>
           <ModalStoreData></ModalStoreData>
           <div className="modal-action">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button
                        type="button"
                        className="btn"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManage;
