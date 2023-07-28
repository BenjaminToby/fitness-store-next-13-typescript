"use client";

import React from "react";

import UserSection from "./UserSection";
import CartSection from "./CartSection";
import CurrencySection from "./CurrencySection";
import GeneralDrawer from "../../components/GeneralDrawer";
import MenCategoryList from "./categories-lists/MenCategoryList";
import GearCategoryList from "./categories-lists/GearCategoryList";

export default function MobileNav() {
    /**
     * Render component
     */
    return (
        <div className="flex items-center gap-4 dark-links-wrapper">
            <div className="flex items-center gap-6">
                <UserSection />
                <CartSection />
            </div>

            <GeneralDrawer
                trigger={
                    <img
                        src="/images/menu.svg"
                        alt="Menu Icon"
                        width={28}
                        height={28}
                    />
                }
                title={
                    <div className="flex items-center justify-start">
                        <CurrencySection />
                    </div>
                }
            >
                <div className="dark-links-wrapper flex-div col w-full">
                    <hr />
                    <a href="/Men">
                        <h4 className="text-lg">Shop Men</h4>
                    </a>
                    <MenCategoryList />
                    <hr />
                    <a href="/Women">
                        <h4 className="text-lg">Shop Women</h4>
                    </a>
                    <MenCategoryList />
                    <hr />
                    <a href="/Products">
                        <h4 className="text-lg">Shop Gear</h4>
                    </a>
                    <GearCategoryList />
                    <hr />

                    <a href="/Deals">Deals</a>
                    <a href="/Deals">Contact Us</a>
                </div>
            </GeneralDrawer>
        </div>
    );
}
