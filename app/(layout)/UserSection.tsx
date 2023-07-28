"use client";

import React from "react";
import Image from "next/image";

import GeneralPopover from "../../components/GeneralPopover";
import LoginForm from "../../components/LoginForm";
import { AppContext } from "../LayoutClientSide";

export default function UserSection() {
    const appContextObject = React.useContext(AppContext);

    const { user } = appContextObject;

    /**
     * Render component
     */
    return (
        <GeneralPopover
            trigger={
                <div className="flex items-center gap-2 cursor-pointer">
                    <img
                        src={user?.logged_in_status ? user.image_thumbnail : "/images/profile-user.svg"}
                        alt=""
                        width={user?.logged_in_status ? 35 : 30}
                        height={user?.logged_in_status ? 35 : 30}
                        className="flex items-center rounded-full object-cover"
                    />
                </div>
            }
        >
            <div className="flex items-stretch w-full">
                {user?.logged_in_status ? (
                    <div className="flex flex-col items-stretch p-6 w-full">
                        <div className="flex items-start gap-4">
                            <img
                                src={user.image_thumbnail}
                                alt=""
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                            />

                            <div className=" flex flex-col items-start gap-0">
                                <span className="text-sm">Welcome</span>
                                <span className="text-lg font-semibold">
                                    {user.first_name} {user.last_name}
                                </span>
                            </div>
                        </div>

                        <hr className="w-full opacity-40 my-4" />

                        <div className="flex flex-col items-start gap-4">
                            <a
                                href="/admin"
                                className=""
                            >
                                <span>Your Account</span>
                            </a>
                            <a
                                href="/admin/liked-items"
                                className=""
                            >
                                <span>Favorites</span>
                            </a>
                            <a
                                href="/logout"
                                className=""
                            >
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-stretch p-6 w-full">
                        <span className="text-sm">Welcome Back</span>
                        <h3 className="title mb-4">Login to your account</h3>
                        <LoginForm />
                        <span className="text-sm my-4">Don't have an account?</span>
                        <a
                            href="/create-account"
                            className="button outlined"
                        >
                            Register
                        </a>
                    </div>
                )}
            </div>
        </GeneralPopover>
    );
}
