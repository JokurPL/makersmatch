import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import Adapters from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],

  callbacks: {
    signIn: async (profile, account) => {
      if (account?.provider === 'github') {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `token ${account.accessToken}`
          }
        });
        const emails = await res.json();
        if (!emails || emails.length === 0) {
          return;
        }
        const sortedEmails = emails.sort((a, b) => b.primary - a.primary);
        profile.email = sortedEmails[0].email;
      }
    }
  },

  adapter: Adapters.Prisma.Adapter({ prisma })
});
