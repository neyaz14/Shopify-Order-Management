import axios from 'axios';

import { useForm } from 'react-hook-form';
const ModalStoreData = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();











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
          if (response.data.data.saveShopifyData.success) {
            console.log('Shopify data saved successfully!');
           
            reset();
          } else {
            console.error('Error saving Shopify data');
          }
        } catch (error) {
          console.error('Error saving Shopify data:', error);
        }
      };





    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Shopify Store URL</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register('shopifyStoreUrl', { required: true })}
                    />
                    {errors.shopifyStoreUrl && (
                        <p className="text-red-500 text-sm">Shopify Store URL is required</p>
                    )}
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Access Token</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register('accessToken', { required: true })}
                    />
                    {errors.accessToken && (
                        <p className="text-red-500 text-sm">Access Token is required</p>
                    )}
                </div>
                
            </form>
        </div>
    );
};

export default ModalStoreData;