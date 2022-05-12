import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import { getToken } from "next-auth/jwt"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  // adapter: PrismaAdapter(prisma),


  // callbacks: {
  //   async jwt( token, user, profile ) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (user?.username) {
  //       token.username = user.username
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     session.username = token.username;
  //     return session
  //   }
  // },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
})
