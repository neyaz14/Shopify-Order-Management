import { useMutation, useQuery } from '@apollo/client';


import { useForm } from 'react-hook-form';
import { ADD_STORE } from '../../Graphql/Mutation/userStoreMutation';
import { GET_STORES_FULL_DATA, GET_USERS_ID } from '../../Graphql/Query/userStoreQuery';
import { useContext } from 'react';
import AuthContext from '../../Providers/AuthContext';


const ModalStoreData = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useContext(AuthContext)
  const { data: allUsers, loading: loadingUser, error: errorUser } = useQuery(GET_USERS_ID)
  const [addStore, { loading, error }] = useMutation(ADD_STORE, {
    update(cache, { data: { addStore } }) {
      const { stores } = cache.readQuery({ query: GET_STORES_FULL_DATA });
      cache.writeQuery({
        query: GET_STORES_FULL_DATA,
        data: { stores: [...stores, addStore] }
      });
    },
    onCompleted: () => {
      reset(); // from reset 
      alert('Store added successfully!');
    }
  });

  if (loading) return <span className='text-3xl p-8 text-blue-400 loading-infinity loading-xl'>Submitting store data...</span>;
  if (loadingUser) return <span className='text-3xl p-8 text-blue-400 loading-infinity loading-xl'>Submitting store data...</span>;


  // ! -----------------

  console.log(allUsers.users)
  const [logedInUser] = allUsers.users.filter(u => u.email === user.email)
  console.log(logedInUser.id)

















  const onSubmit = async (data) => {

    try {
      await addStore({
        variables: {
          storeName: data.storeName,
          storeUrl: data.storeUrl,
          accessToken: data.accessToken,
          apiVersion: data.apiVersion,
          permissions: data.permissions,
          user: logedInUser.id // নিশ্চিত হও যে এই ID ফর্ম থেকে পাচ্ছো
        }
      });
      reset()
    } catch (err) {
      console.error('Error adding store:', err);
    }
  };




  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


        {/* Store name */}
        <div>
          <label className="label">
            <span className="label-text text-base-content">Shopify Name</span>
          </label>
          <input
            type="text"
            placeholder="yourstore name"
            {...register("storeName", { required: "Store name is required" })}
            className="input input-bordered w-full"
          />
          {errors.storeName && (
            <p className="text-error text-sm">{errors.storeName.message}</p>
          )}
        </div>





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