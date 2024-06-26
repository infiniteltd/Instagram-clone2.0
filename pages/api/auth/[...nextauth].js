import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],

    secret: process.env.SECRET,

    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.username = session.user.name.split(" ").join("").toLocaleLowerCase();

            session.user.uid = token.sub;
            return session;
        },
    }
};
export default NextAuth(authOptions);