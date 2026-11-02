// Server-only admin auth: username/password + signed HMAC session cookie.
// Fails closed: if ADMIN_USERNAME, ADMIN_PASSWORD or ADMIN_SESSION_SECRET is unset, login is refused.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'neverland_admin';
const TTL_SECONDS = 60 * 60 * 8;

function adminUser() { return process.env.ADMIN_USERNAME || ''; }
function adminPass() { return process.env.ADMIN_PASSWORD || ''; }
function secret() { return process.env.ADMIN_SESSION_SECRET || ''; }

function safeEqual(a: string, b: string) {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function checkCredentials(username: string, password: string) {
  if (!adminUser() || !adminPass()) return false;
  return safeEqual(username, adminUser()) && safeEqual(password, adminPass());
}

export function createToken(username: string) {
  if (!secret()) return '';
  const payload = `${username}|${Math.floor(Date.now() / 1000) + TTL_SECONDS}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;
}

export function verifyToken(token?: string) {
  if (!token || !secret() || !adminUser()) return false;
  const [body, sig] = token.split('.');
  if (!body || !sig) return false;
  const payload = Buffer.from(body, 'base64url').toString();
  if (!safeEqual(sig, sign(payload))) return false;
  const [user, exp] = payload.split('|');
  return user === adminUser() && Number(exp) * 1000 > Date.now();
}


export async function isAdmin() {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.COOKIE_SECURE === 'true',
  path: '/',
  maxAge: TTL_SECONDS,
};
