import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studyhookdb");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 5 * 24 * 60 * 60
    }
  },
  plugins: [jwt()],
});
