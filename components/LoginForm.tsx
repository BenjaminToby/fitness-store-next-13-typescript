"use client";

import React from "react";
import dsqlClient from "datasquirel/client";
import fetchApi from "../utils/frontend/fetchApi";
import LoadingBlock from "./LoadingBlock";
import updateCartOnUserAuth from "../utils/frontend/updateCartOnUserAuth";
import googleLogin from "../utils/frontend/googleLogin";

export default function LoginForm() {
    const [loading, setLoading] = React.useState(false);
    const googleLoginRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

        dsqlClient.auth.google
            .getAccessToken({
                clientId: typeof googleClientId == "string" ? googleClientId : "",
                element: googleLoginRef.current ? googleLoginRef.current : document.createElement("div"),
                triggerPrompt: false,
            })
            .then(async (accessToken: any) => {
                await googleLogin({
                    accessToken: accessToken,
                    setLoading: setLoading,
                });
            });
    }, []);

    return (
        <div className="flex flex-col items-stretch gap-2 w-full relative">
            <div
                className="outlined"
                ref={googleLoginRef}
            >
                Google Login
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setLoading(true);

                    const form = e.target as HTMLFormElement;

                    fetchApi("/api/user/login", {
                        method: "POST",
                        body: {
                            email: form.email.value,
                            password: form.password.value,
                        },
                    }).then(async (res: any) => {
                        await updateCartOnUserAuth({ userId: res?.user?.id });

                        if (res?.success && res?.user) {
                            localStorage.setItem("csrf_k", res.user.csrf_k);
                            localStorage.setItem("user", JSON.stringify(res.user));
                            window.location.reload();
                        } else {
                            setTimeout(() => {
                                setLoading(false);
                            }, 2000);
                        }
                    });
                }}
            >
                {loading && <LoadingBlock />}
                <input
                    type="text"
                    autoComplete="email"
                    placeholder="Email Address"
                    name="email"
                    id="email"
                    required
                />
                <input
                    type="password"
                    autoComplete="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                />
                <button>Login</button>
            </form>
        </div>
    );
}
