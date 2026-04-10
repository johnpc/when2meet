import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Poll: a
    .model({
      title: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      responses: a.hasMany("Availability", "pollId"),
    })
    .authorization((allow) => [allow.guest()]),

  Availability: a
    .model({
      pollId: a.id().required(),
      poll: a.belongsTo("Poll", "pollId"),
      name: a.string().required(),
      weekends: a.string().array().required(),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});
