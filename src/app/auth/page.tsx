"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { isAuthenticated, signIn, signUp } from "@/lib/auth";
import { signIn as nextAuthSignIn } from "next-auth/react";

type Mode = "signin" | "signup";

function AuthForm() {
  const router = useRouter();
  const search = useSearchParams();
  const initialMode = (search.get("mode") as Mode) || "signin";
  const [mode, setMode] = useState<Mode>(initialMode);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverFieldErrors, setServerFieldErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    const next = new URLSearchParams(search?.toString());
    next.set("mode", mode);
    router.replace(`/auth?${next.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const errors = useMemo(() => {
    const next: { fullName?: string; email?: string; password?: string } = {};
    if (mode === "signup" && !fullName) next.fullName = "Ad soyad gereklidir";
    if (!email) next.email = "E-posta gereklidir";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Geçerli bir e-posta girin";
    if (!password) next.password = "Şifre gereklidir";
    else if (password.length < 8) next.password = "Şifre en az 8 karakter olmalı";
    return next;
  }, [mode, fullName, email, password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Lütfen form hatalarını düzeltin");
      return;
    }
    try {
      setIsSubmitting(true);
      setServerFieldErrors({});
      if (mode === "signin") {
        await signIn(email, password);
        toast.success("Giriş başarılı");
      } else {
        await signUp(fullName, email, password);
        toast.success("Kayıt başarılı. Lütfen giriş yapın.");
        setMode("signin");
        return; // stop here; user must sign in to get token
      }
      router.replace("/dashboard");
    } catch (err: any) {
      const message = err?.message || "İşlem başarısız. Tekrar deneyin.";
      toast.error(message);
      const details = err?.details;
      if (Array.isArray(details)) {
        const next: { [k: string]: string } = {};
        for (const d of details) {
          if (d?.field && d?.message) next[d.field] = d.message;
        }
        setServerFieldErrors(next);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative flex flex-col bg-white">
        <header className="absolute left-4 lg:left-[135px] top-4 lg:top-[40px] flex items-center z-10">
          <div className="flex items-center gap-[12px]">
            <Image src="/icons/maglo.svg" alt="Maglo" width={30} height={30} />
            <span className="text-lg font-bold">Maglo.</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center lg:items-start lg:justify-start relative px-4 lg:px-0">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 lg:space-y-[25px] lg:absolute lg:left-[135px] lg:top-[227.5px]">
            <div className="space-y-1 text-center lg:text-left">
              <h1 className="text-2xl lg:text-[30px] font-semibold">
                {mode === "signin" ? "Sign In" : "Create new account"}
              </h1>
              <p className="text-sm lg:text-[16px] opacity-80">Welcome back! Please enter your details</p>
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isSubmitting}
                className={`w-full h-12 lg:h-11 rounded-md border px-3 bg-background text-foreground outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 ${((fullName.length > 0 && errors.fullName) || serverFieldErrors.fullName) ? "border-red-500" : "border-[#F2F2F2]"}`}
                  placeholder="Mahfuzul Nabil"
                />
              {((fullName.length > 0 && errors.fullName) || serverFieldErrors.fullName) && (
                <p className="text-xs text-red-500">{serverFieldErrors.fullName || errors.fullName}</p>
              )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              className={`w-full h-12 lg:h-11 rounded-md border px-3 bg-background text-foreground outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 ${((email.length > 0 && errors.email) || serverFieldErrors.email) ? "border-red-500" : "border-[#F2F2F2]"}`}
                placeholder="example@gmail.com"
              />
            {((email.length > 0 && errors.email) || serverFieldErrors.email) && (
              <p className="text-xs text-red-500">{serverFieldErrors.email || errors.email}</p>
            )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              className={`w-full h-12 lg:h-11 rounded-md border px-3 bg-background text-foreground outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 ${((password.length > 0 && errors.password) || serverFieldErrors.password) ? "border-red-500" : "border-[#F2F2F2]"}`}
                placeholder="••••••"
              />
            {((password.length > 0 && errors.password) || serverFieldErrors.password) && (
              <p className="text-xs text-red-500">{serverFieldErrors.password || errors.password}</p>
            )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: "#C8EE44" }}
              className="w-full h-14 lg:h-12 rounded-[10px] font-semibold cursor-pointer text-base lg:text-sm"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-transparent" />
                  {mode === "signin" ? "Sign In..." : "Create Account..."}
                </span>
              ) : (
                mode === "signin" ? "Sign In" : "Create Account"
              )}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                nextAuthSignIn('google', { 
                  callbackUrl: '/dashboard',
                  redirect: true 
                });
              }}
              className="w-full cursor-pointer border border-[#F5F5F5] rounded-[10px] h-[50px] font-semibold flex items-center justify-center gap-3 text-[#78778B] text-[16px] lg:text-sm hover:bg-gray-50 transition-colors"
            >
              <Image src="/icons/google.svg" alt="Google" width={24} height={24} />
              {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
            </button>

            <p className="text-sm text-center opacity-80">
              {mode === "signin" ? (
                <span className="inline-flex items-center justify-center gap-[10px]">
                  <span>Don’t have an account?</span>
                  <a
                    className="relative font-medium"
                    href="/auth?mode=signup"
                    onClick={(e) => {
                      e.preventDefault();
                      setMode("signup");
                    }}
                  >
                    Sign up
                    <span className="absolute left-0 right-0 -bottom-2 h-[5px]" aria-hidden>
                      <Image src="/icons/vector11.svg" alt="underline" width={43} height={5} className="mx-auto block" />
                    </span>
                  </a>
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-[10px]">
                  <span>Already have an account?</span>
                  <a
                    className="relative font-medium"
                    href="/auth?mode=signin"
                    onClick={(e) => {
                      e.preventDefault();
                      setMode("signin");
                    }}
                  >
                    Sign in
                    <span className="absolute left-0 right-0 -bottom-2 h-[5px]" aria-hidden>
                      <Image src="/icons/vector11.svg" alt="underline" width={43} height={5} className="mx-auto block" />
                    </span>
                  </a>
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image src="/images/auth.png" alt="Auth" fill className="object-fill" />
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}
