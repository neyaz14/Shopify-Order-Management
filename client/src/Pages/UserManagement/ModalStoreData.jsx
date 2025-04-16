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

        {/* Store URL */}
        <div>
          <label className="label">
            <span className="label-text text-base-content">Shopify Store URL</span>
          </label>
          <input
            type="text"
            placeholder="https://yourstore.myshopify.com"
            {...register("storeUrl", { required: "Store URL is required" })}
            className="input input-bordered w-full"
          />
          {errors.storeUrl && (
            <p className="text-error text-sm">{errors.storeUrl.message}</p>
          )}
        </div>

        {/* Admin API Access Token */}
        <div>
          <label className="label">
            <span className="label-text text-base-content">Admin API Access Token</span>
          </label>
          <input
            type="password"
            placeholder="shpat_***"
            {...register("accessToken", { required: "Access token is required" })}
            className="input input-bordered w-full"
          />
          {errors.accessToken && (
            <p className="text-error text-sm">{errors.accessToken.message}</p>
          )}
        </div>

        {/* API Version */}
        <div>
          <label className="label">
            <span className="label-text text-base-content">API Version (optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 2024-01"
            {...register("apiVersion")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Permissions List */}
        <div>
          <label className="label">
            <span className="label-text text-base-content">Permissions Granted</span>
          </label>
          <textarea
            placeholder="read_orders, write_orders, write_fulfillments..."
            {...register("permissions")}
            className="textarea textarea-bordered w-full"
            rows={3}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Submit Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalStoreData;