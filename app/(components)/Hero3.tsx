"use client";

import Image from "next/image";
import React from "react";
import { AppContext } from "../LayoutClientSide";
import { AppContextObject } from "..";

export default function Hero3() {
    const appContext = React.useContext<AppContextObject>(AppContext);
    const { appState } = appContext;
    const { fonts } = appState;

    /**
     * Render component
     */
    return (
        <React.Fragment>
            <section className="h-[600px] sl:h-[700px] items-center justify-center relative bg-black -mt-[71px]">
                <div className="container">
                    <div className="flex flex-col gap-4 items-start relative z-[50] pr-[50px]">
                        <div className={fonts?.airstream.className + " text-2xl lg:text-[30px] leading-[1]"}>Try to keep up</div>
                        <h1
                            className="text-[40px] sm:text-[50px] lg:text-[60px] leading-[1] max-w-[400px]"
                            style={{
                                textTransform: "none",
                                fontWeight: 100,
                            }}
                        >
                            Active wear
                            <br /> for the road
                        </h1>

                        <div className="flex-div mt-4">
                            <a
                                href="/products"
                                className="button font-bold dark"
                            >
                                Shop Now
                            </a>
                            <a
                                href="/products"
                                className="button font-bold outlined"
                            >
                                Join the club
                            </a>
                        </div>
                    </div>
                </div>

                <img
                    src="/images/side-view-athletic-woman-jumping.webp"
                    alt=""
                    className="background"
                    id="homepage-hero-image"
                />
            </section>

            <section className="p-0 flex-col lg:flex-row">
                <a
                    href="/Men"
                    className="w-full lg:w-1/2 h-[600px] bg-slate-100 relative p-10 items-start justify-start flex text-slate-900 overflow-hidden"
                >
                    <img
                        src="/images/scare-young-african-american-bodybuilder-training-grey-studio-background-muscular-single-male-model-sportwear-with-weight-concept-sport-bodybuilding-healthy-lifestyle.webp"
                        alt=""
                        className="background"
                        style={{
                            objectPosition: "center top",
                        }}
                    />
                    <div className="relative text-slate-800">
                        <h2 className="relative z-10">Men</h2>
                    </div>
                </a>
                <a
                    href="/Women"
                    className="w-full lg:w-1/2 h-[600px] bg-slate-100 relative p-10 items-start justify-end flex text-slate-900 overflow-hidden"
                >
                    <img
                        src="/images/beautiful-young-african-woman-sports-clothing-holding-bottle-with-water-while-sitting-sports-t.webp"
                        alt=""
                        className="background contrast-[110%]"
                        style={{
                            objectPosition: "center top",
                        }}
                    />
                    <div className="relative text-slate-800">
                        <h2 className="relative z-10">Women</h2>
                    </div>
                </a>
            </section>
        </React.Fragment>
    );
}
