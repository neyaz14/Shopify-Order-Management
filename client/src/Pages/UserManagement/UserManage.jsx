// Suggested code may be subject to a license. Learn more: ~LicenseLog:2351279133.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1773789791.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1919983407.
// javascript
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UserManage = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/user/shopify', {
        query: `
          mutation {
            saveShopifyData(shopifyStoreUrl: "${data.shopifyStoreUrl}", accessToken: "${data.accessToken}") {
              success
              message
            }
          }
        `,
      });
      if(response.data.data.saveShopifyData.success) {
        console.log('Shopify data saved successfully!');
        setShowModal(false);
        reset();
      } else {
        console.error('Error saving Shopify data');
      }
      
    } catch (error) {
      console.error('Error saving Shopify data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Shopify Store
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Shopify Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Shopify Store URL</Form.Label>
              <Form.Control
                type="text"
                {...register('shopifyStoreUrl', { required: true })}
              />
              {errors.shopifyStoreUrl && <p>Shopify Store URL is required</p>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Access Token</Form.Label>
              <Form.Control
                type="text"
                {...register('accessToken', { required: true })}
              />
              {errors.accessToken && <p>Access Token is required</p>}
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManage;
