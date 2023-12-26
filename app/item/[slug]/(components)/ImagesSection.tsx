"use client";

import React from "react";
import { ProductImageObject } from "./HeroSection";
import { Product } from "../../../(components)/HomepageComponent";

export default function ImagesSection({ images, product }: { images: ProductImageObject[]; product?: Product }) {
    const [targetImage, setTargetImage] = React.useState<ProductImageObject | null>(images ? images[0] : null);

    return (
        <div className="flex items-start gap-[10px] lg:gap-[20px] w-full flex-col-reverse lg:flex-row">
            <div className="flex flex-row lg:flex-col items-stretch gap-[10px] image-thumbnail-wrapper">
                {images &&
                    images.map((image, index) => (
                        <img
                            src={image.url}
                            width={100}
                            height={150}
                            className={"object-cover image-thumbnail" + (image.order === targetImage?.order ? " active" : "")}
                            key={index}
                            onClick={() => {
                                setTargetImage(image);
                            }}
                        />
                    ))}
            </div>
            <div className="target-image-wrapper">
                <img
                    src={targetImage?.url}
                    alt=""
                    className="background"
                />
            </div>
        </div>
    );
}
