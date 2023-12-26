"use client";

import React from "react";

export default function LoadingBlock() {
    return (
        <div className="w-full h-full absolute z-50 bg-[white]/90 flex items-center justify-center top-0 left-0">
            <div className="loading-block scale-75"></div>
        </div>
    );
}
