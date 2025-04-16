const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')


const {UserType, StoreInfoType} = require('../GraphqlSchema/UserStoreSchema')


const UserModel = require('../Models/userSchema.js')
const StoreModel = require('../Models/storeSchema.js')

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return UserModel.findById(args.id);
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return UserModel.find();
        },
      },
      store: {
        type: StoreInfoType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return StoreModel.findById(args.id);
        },
      },
      stores: {
        type: new GraphQLList(StoreInfoType),
        resolve(parent, args) {
          return StoreModel.find();
        },
      },
    },
  });



module.exports = RootQuery