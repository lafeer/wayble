import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: (credentials) => {
        if (credentials.username && credentials.password) {
          return { id: credentials.username, name: credentials.username } as User;
        }
        return null;
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
});
