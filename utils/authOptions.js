import connectDb from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      // connect database
      await connectDb();
      // check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // if not, add user to database
      if (!userExists) {
        // truncate user name if too long
        const username = profile.name.slice(0, 25);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // return true to allow sign in
      return true;
    },
    // modify the session object
    async session({ session }) {
      // get user from database
      const user = await User.findOne({ email: session.user.email });
      // assign the user id to the session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
