import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'ngrok-skip-browser-warning': 'skip-browser-warning',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || 'Login failed');
        }

        const foundUser = result.data;

        return {
          id: foundUser.id,
          name: foundUser.name,
          email: credentials.email,
          type: foundUser.type,
          phone: foundUser.phone,
          image: foundUser.avatar,
          token: foundUser.token,
          roles: foundUser.roles,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // Session max age of 24 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      // Add the user details to the token on login
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.type = user.type;
        token.phone = user.phone;
        token.accessToken = user.token;
        token.roles = user.roles;
      }

      // If there's an access token, validate it
      if (token.accessToken) {
        const validationResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/dashboard/check-token`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              Accept: 'appliication/json',
            },
          }
        );

        const validationResult = await validationResponse.json();

        // If the token is invalid, remove the token from the session
        if (!validationResponse.ok || !validationResult.status) {
          token = null;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.type = token.type;
        session.user.phone = token.phone;
        session.accessToken = token.accessToken;
        session.roles = token.roles;
      } else {
        // If the token is invalid, log out the user
        session = null;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};
