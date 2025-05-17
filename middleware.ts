import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/',
    '/learn(.*)',
    '/leaderbord(.*)',
    '/quests(.*)',
    '/admin(.*)',
    '/shop(.*)',
    '/courses(.*)',
    '/dashboard(.*)',
    '/lesson(.*)',
    '/quests(.*)',
    '/api/(.*)',
  ],
};
