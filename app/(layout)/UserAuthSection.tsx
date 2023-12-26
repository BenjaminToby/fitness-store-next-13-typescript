"use client";

import React from "react";
import clientAuthUser from "../../utils/frontend/clientAuthUser";

export default function UserAuthSection({ user, setUser }: { user: any; setUser: any }) {
    if (!user) {
        clientAuthUser({
            setUser: setUser,
        });
    }

    /**
     * Render component
     */
    return <React.Fragment></React.Fragment>;
}
