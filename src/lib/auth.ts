"use client";

export type AuthUser = {
  fullName: string;
  email: string;
};

const TOKEN_KEY = "maglo_token";
const USER_KEY = "maglo_user";

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSession(accessToken: string, user: AuthUser): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(TOKEN_KEY, accessToken);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export async function fakeNetwork<T>(result: T, ms = 900): Promise<T> {
  await new Promise((r) => setTimeout(r, ms));
  return result;
}

import { apiSignIn, apiSignUp } from "./api";

export async function signIn(email: string, password: string): Promise<void> {
  const response = await apiSignIn(email, password);
  // Ensure persisted shape matches AuthUser
  setSession(response.data.accessToken, response.data.user);
}

export async function signUp(fullName: string, email: string, password: string): Promise<void> {
  const res: any = await apiSignUp(fullName, email, password);
  // API returns { success, message, data: { id, fullName, email } } without token
  const apiUser = res?.user ?? res?.data ?? {};
  if (!apiUser?.email) {
    // Nothing else to do; page will handle UI flow
    return;
  }
  // Do NOT set session here because there is no token on register.
  // The UI will switch to signin mode so the user can log in.
}


