"use client";

import React from "react";

export default function AvailableSections() {
    /**
     * Render component
     */
    return (
        <section className="my-10">
            <div className="container flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 flex flex-col items-stretch gap-[20px]">
                    <div className="p-6 h-auto lg:h-[300px] w-full lg:w-auto bg-[#ECEFF1]">
                        <h2 className="leading-[1.1]">Popular Categories</h2>
                        <span className="opacity-70">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, doloribus.</span>
                        <button className="mt-4">Shop All Products</button>
                    </div>
                    <a
                        href="/"
                        className="bg-[lightgray] p-0 h-[500px] relative overflow-hidden items-end justify-start"
                    >
                        <img
                            src="/images/full-length-portrait-attractive-healthy-fit-confident-african-sportswoman-exercising-with-dumbbells-isolated-white-wall.jpg"
                            alt=""
                            className="background object-cover object-right -right-[100px] left-auto"
                            style={{
                                left: "auto",
                                width: "180%",
                                objectPosition: "120px -150px",
                            }}
                        />
                        <div className="relative z-10 px-3 py-2 bg-[white] w-full">
                            <span className="text-[black]/60 text-base">Accessories and equipment</span>
                            <div className="text-[black] text-xl">#25,000</div>
                        </div>
                    </a>
                </div>
                <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                    <div className="flex flex-col items-stretch gap-[20px]">
                        <a
                            href="/men"
                            className="bg-[lightgray] p-0 h-[500px] relative overflow-hidden items-end justify-start"
                        >
                            <img
                                src="/images/portrait-handsome-young-black-man-with-shaved-head-hands-hips-grey-background-muscular-african-male-model-looking-away.jpg"
                                alt=""
                                className="background object-cover object-right right-0"
                            />
                            <div className="relative z-10 px-3 py-2 bg-[white] w-full">
                                <span className="text-[black]/60 text-base">Accessories and equipment</span>
                                <div className="text-[black] text-xl">#25,000</div>
                            </div>
                        </a>
                        <a
                            href="/"
                            className="bg-[lightgray] p-0 h-[300px] relative overflow-hidden items-end justify-start"
                        >
                            <img
                                src="/images/smiley-woman-posing-outdoors-activewear.jpg"
                                alt=""
                                className="background object-cover object-right right-0"
                                style={{
                                    width: "120%",
                                    objectPosition: "center -70px",
                                }}
                            />
                            <div className="relative z-10 px-3 py-2 bg-[white] w-full">
                                <span className="text-[black]/60 text-base">Accessories and equipment</span>
                                <div className="text-[black] text-xl">#25,000</div>
                            </div>
                        </a>
                    </div>

                    <div className="flex flex-col items-stretch gap-[20px]">
                        <a
                            href="/"
                            className="bg-[lightgray] p-0 h-[300px] relative overflow-hidden items-end justify-start"
                        >
                            <img
                                src="/images/front-view-sporty-beautiful-woman.jpg"
                                alt=""
                                className="background object-cover object-right right-0"
                            />
                            <div className="relative z-10 px-3 py-2 bg-[white] w-full">
                                <span className="text-[black]/60 text-base">Accessories and equipment</span>
                                <div className="text-[black] text-xl">#25,000</div>
                            </div>
                        </a>
                        <a
                            href="/"
                            className="bg-[lightgray] p-0 h-[500px] relative overflow-hidden items-end justify-start"
                        >
                            <img
                                src="/images/side-view-athletic-man-posing-with-basketball.jpg"
                                alt=""
                                className="background object-cover right-0"
                                style={{
                                    width: "150%",
                                }}
                            />

                            <div className="relative z-10 px-3 py-2 bg-[white] w-full">
                                <span className="text-[black]/60 text-base">Accessories and equipment</span>
                                <div className="text-[black] text-xl">#25,000</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
