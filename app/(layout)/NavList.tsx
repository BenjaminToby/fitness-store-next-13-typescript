"use client";

import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import UserSection from "./UserSection";
import CartSection from "./CartSection";
import CurrencySection from "./CurrencySection";
import MenCategoryList from "./categories-lists/MenCategoryList";
import GearCategoryList from "./categories-lists/GearCategoryList";

export default function NavList() {
    /**
     * Render component
     */
    return (
        <NavigationMenu.Root className="NavigationMenuRoot flex items-center">
            <NavigationMenu.List className="NavigationMenuList flex items-center gap-10">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="NavigationMenuTrigger">
                        <a href="/Men">Men</a>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent p-0 w-screen">
                        <div className="flex items-stretch">
                            <img
                                src="/images/banner-min.webp"
                                alt=""
                                width={200}
                                height={300}
                                className="object-cover object-top"
                            />

                            <div className="flex flex-col items-start py-6 px-10">
                                <h4 className="text-lg">Shop Men</h4>
                                <div className="flex-div items-start gap-10 w-full">
                                    <MenCategoryList />
                                </div>
                            </div>
                        </div>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="NavigationMenuTrigger">
                        <a href="/Women">Women</a>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent p-0">
                        <div className="flex items-stretch">
                            <img
                                src="/images/photo-satisfied-dark-skinned-woman-stretches-hands-warms-up-before-fitness-training-wears-sport-clothes-has-good-flexibility-focused-aside-isolated-purple-wall-workout-concept.webp"
                                alt=""
                                width={200}
                                height={300}
                                className="object-cover contrast-[120%]"
                            />

                            <div className="flex flex-col items-start py-6 px-10">
                                <h4 className="text-lg">Shop Women</h4>
                                <div className="flex-div items-start gap-10 w-full">
                                    <MenCategoryList />
                                </div>
                            </div>
                        </div>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="NavigationMenuTrigger">
                        <a href="/Accessories">Gear</a>
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="NavigationMenuContent p-0">
                        <div className="flex items-stretch">
                            <img
                                // src="/images/perfectly-ordered-gym-equipment.jpg"
                                src="/images/active-woman-getting-ready-routine-fitness-workout-holding-yoga-mat-bottle-while-standing-against-pink-studio-background-portrait-fit-female-doing-exercise-training-sports.webp"
                                alt=""
                                width={200}
                                height={300}
                                className="object-cover"
                            />

                            <div className="flex flex-col items-start py-6 px-10">
                                <h4 className="text-lg">Shop Gear</h4>
                                <div className="flex-div items-start justify-start gap-10 w-full">
                                    <GearCategoryList />
                                </div>
                            </div>
                        </div>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Link
                        className="NavigationMenuLink"
                        href="/deals"
                    >
                        Deals
                    </NavigationMenu.Link>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                    <NavigationMenu.Link
                        className="NavigationMenuLink"
                        href="/deals"
                    >
                        Contact
                    </NavigationMenu.Link>
                </NavigationMenu.Item>

                <div className="flex items-center gap-4">
                    {/* <CurrencySection /> */}
                    <UserSection />
                    <CartSection />
                </div>
            </NavigationMenu.List>

            <div className="ViewportPosition">
                <NavigationMenu.Viewport className="NavigationMenuViewport" />
            </div>
        </NavigationMenu.Root>
    );
}
