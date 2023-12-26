"use client";

import React from "react";
import dsqlClient from "datasquirel/client";
import LoginForm from "../../components/LoginForm";
import LoadingBlock from "../../components/LoadingBlock";
import updateCartOnUserAuth from "../../utils/frontend/updateCartOnUserAuth";
import fetchApi from "../../utils/frontend/fetchApi";
import googleLogin from "../../utils/frontend/googleLogin";

export default function Main() {
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
        <React.Fragment>
            <section className="pt-10">
                <div className="container flex-col items-start mb-10">
                    <div className="max-w-lg w-full flex flex-col items-start gap-6">
                        {loading && <LoadingBlock />}

                        <h1 className="text-4xl">Login to your account</h1>
                        <LoginForm />

                        <div className="w-full flex items-center justify-center">
                            <span>
                                Don't have an account?{" "}
                                <a
                                    href="/create-account"
                                    className="inline"
                                >
                                    Create an Account
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <img
                src="/images/basketball-player-sitting-ball-studio-neon-background-professional-male-baller-sportswear-playing-sport-game-tall-sportsman.webp"
                alt=""
                className="fixed w-[50vw] h-screen object-cover top-0 right-0 -z-10"
            />
        </React.Fragment>
    );
}
