const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')

const { UserType, StoreInfoType } = require('../GraphqlSchema/UserStoreSchema')

const UserModel = require('../Models/userSchema.js')
const StoreModel = require('../Models/storeSchema.js')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a new user
        addUser: {
            type: UserType,
            args: {
                displayName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                // storeIDs: { type: new GraphQLList(GraphQLID) }, // optional input
            },
            async resolve(parent, args) {
                const newUser = new UserModel({
                    displayName: args.displayName,
                    email: args.email,
                    
                });
                return newUser.save();
            }
        },

        // Add a new store
        addStore: {
            type: StoreInfoType,
            args: {
                storeName: { type: new GraphQLNonNull(GraphQLString) },
                storeUrl: { type: new GraphQLNonNull(GraphQLString) },
                accessToken: { type: new GraphQLNonNull(GraphQLString) },
                apiVersion: { type: new GraphQLNonNull(GraphQLString) },
                permissions: { type: new GraphQLNonNull(GraphQLString) },
                user: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const newStore = new StoreModel({
                    storeName: args.storeName,
                    storeUrl: args.storeUrl,
                    accessToken: args.accessToken,
                    apiVersion: args.apiVersion,
                    permissions: args.permissions,
                    user: args.user
                });

                // Add this store's ID to the user's storeIDs array
                const savedStore = await newStore.save();
                await UserModel.findByIdAndUpdate(
                     args.user,
                    { $push: { storeIDs: savedStore._id } },
                    { new: true }
                );
                return savedStore;
            }
        },

        // Delete a user
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return UserModel.findByIdAndDelete(args.id);
            }
        },

        // Delete a store
        deleteStore: {
            type: StoreInfoType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const store = await StoreModel.findByIdAndDelete(args.id);
                if (store) {
                    await UserModel.findByIdAndUpdate(
                        store.user,
                        { $pull: { storeIDs: store._id } }
                    );
                }
                return store;
            }
        }
    }
});



module.exports = mutation;