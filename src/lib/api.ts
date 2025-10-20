import { getApiEndpoint } from './api-config';

export type ApiUser = { id: string; fullName: string; email: string; role: string; isActive: boolean; };
export type AuthResponse = {
  data: any; accessToken: string; user: ApiUser 
};

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await res.json() : (await res.text());
  if (!res.ok) {
    const payload: any = typeof data === "string" ? { message: data } : (data || {});
    const err = new Error(payload?.message || "İstek başarısız");
    (err as any).code = payload?.code;
    (err as any).details = payload?.details;
    throw err;
  }
  return data as T;
}

export async function apiSignIn(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(getApiEndpoint('/users/login'), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<AuthResponse>(res);
}

export async function apiSignUp(fullName: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(getApiEndpoint('/users/register'), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });
  return handleResponse<AuthResponse>(res);
}


