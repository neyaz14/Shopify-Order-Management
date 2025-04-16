const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')


const UserModel = require('../Models/userSchema.js')
const StoreModel = require('../Models/storeSchema.js')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        displayName: { type: GraphQLString },
        email: { type: GraphQLString },
        storeIDs: {
            type: new GraphQLList(StoreInfoType),
            async resolve(parent, args) {
                return await StoreModel.find({ _id: { $in: parent.storeIDs } });
            }
        }
    })
});

const StoreInfoType = new GraphQLObjectType({
    name: 'StoreInfo',
    fields: () => ({
        id: { type: GraphQLID },
        storeName: { type: GraphQLString },
        accessToken: { type: GraphQLString },
        apiVersion: { type: GraphQLString },
        storeUrl: { type: GraphQLString },
        permissions: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return UserModel.findById(parent.user);
            }
        }
    })
});

module.exports = { UserType, StoreInfoType }