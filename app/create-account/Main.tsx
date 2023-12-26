"use client";

import React from "react";
import dsqlClient from "datasquirel/client";
import fetchApi from "../../utils/frontend/fetchApi";
import LoadingBlock from "../../components/LoadingBlock";
import { CartItem } from "../(layout)/CartSection";
import updateCartOnUserAuth from "../../utils/frontend/updateCartOnUserAuth";
import googleLogin from "../../utils/frontend/googleLogin";

export default function Main() {
    const [loading, setLoading] = React.useState(false);
    const [gender, setGender] = React.useState("Male");
    const [image, setImage] = React.useState<any>(gender?.match(/^male/i) ? "/images/image-placeholder-male.png" : "/images/image-placeholder-female.png");

    React.useEffect(() => {
        if (typeof image === "string") {
            setImage(gender?.match(/^male/i) ? "/images/image-placeholder-male.png" : "/images/image-placeholder-female.png");
        }
    }, [gender]);

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
                    <div className="max-w-none xl:max-w-lg w-full flex flex-col items-start gap-6">
                        <h1 className="text-4xl">Create a new Account</h1>
                        <form
                            className="w-full"
                            onSubmit={(e) => {
                                setLoading(true);

                                e.preventDefault();
                                const formElement: HTMLFormElement = e.target as HTMLFormElement;

                                const first_name = formElement.first_name.value;
                                const last_name = formElement.last_name.value;
                                const email = formElement.email.value;
                                const password = formElement.password.value;
                                const confirm_password = formElement.confirm_password.value;

                                if (password != confirm_password) {
                                    alert("Passwords do not match");
                                    return;
                                }

                                let imageFinal = image;

                                if (imageFinal?.imageBase64) {
                                    delete imageFinal.imageBase64Full;
                                }

                                fetchApi("/api/user/add", {
                                    method: "post",
                                    body: {
                                        first_name,
                                        last_name,
                                        email,
                                        password,
                                        confirm_password,
                                        image: image,
                                        gender: gender,
                                    },
                                })
                                    .then(async (res: any) => {
                                        await updateCartOnUserAuth({ userId: res?.user?.id });

                                        if (res.success && res.user) {
                                            localStorage.setItem("csrf_k", res.user.csrf_k);
                                            localStorage.setItem("user", JSON.stringify(res.user));

                                            window.location.reload();
                                        } else {
                                            setTimeout(() => {
                                                setLoading(false);
                                            }, 1000);
                                        }
                                    })
                                    .catch((err: any) => {
                                        console.log(err.message);
                                        setTimeout(() => {
                                            setLoading(false);
                                        }, 1000);
                                    });
                            }}
                        >
                            {loading && <LoadingBlock />}

                            <div className="border border-solid border-[black]/20 bg-[black]/5 p-6">
                                <label
                                    htmlFor="gender"
                                    className="mb-2"
                                >
                                    Select Your Gender
                                </label>
                                <select
                                    name="gender"
                                    id="gender"
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                    }}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                id="first_name"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                id="last_name"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                id="email"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                name="confirm_password"
                                id="confirm_password"
                                required
                            />
                            <div
                                className="button outlined items-center justify-center flex gap-4 p-6"
                                style={{
                                    borderColor: "lightgray",
                                }}
                            >
                                {typeof image == "string" && (
                                    <img
                                        src={image}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                )}

                                {image?.imageBase64 && (
                                    <img
                                        src={image.imageBase64Full}
                                        alt=""
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-full"
                                    />
                                )}
                                <div>
                                    <span className="lowercase tracking-normal text-base text-[black]/50">Select an Image</span>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={async (e) => {
                                            if (!e.target.files || !e.target.files[0]) return;

                                            const targetFile = e.target.files[0];

                                            // @ts-ignore
                                            const parsedFile = await dsqlClient.media.imageInputFileToBase64({ imageInputFile: targetFile, maxWidth: 500 });
                                            // const parsedFile = await dsqlClient.media.imageInputToBase64(e.target);

                                            if (parsedFile?.imageBase64) {
                                                setImage(parsedFile);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <button type="submit">Create Account</button>
                        </form>

                        <div className="w-full flex items-center justify-center">OR</div>

                        <div
                            className="max-w-lg w-full"
                            ref={googleLoginRef}
                        >
                            Login With Google
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <span>
                                Have an account?{" "}
                                <a
                                    href="/login"
                                    className="inline"
                                >
                                    Sign In
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <img
                // src="/images/portrait-muscled-woman-training-with-barbell-isolated-purple-background-neon-light.jpg"
                // src="/images/young-african-american-woman-stretching-warming-up-outdoor.webp"
                src="/images/athletic-young-black-woman-sportswear-holding-fitness-mat-smartphone-grey-studio.webp"
                alt=""
                className="fixed w-[50vw] h-screen object-cover top-0 right-0 -z-10 hidden xl:flex contrast-[110%]"
                style={{
                    objectPosition: "right top",
                }}
            />
        </React.Fragment>
    );
}
