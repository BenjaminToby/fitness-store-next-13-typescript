import { AppContextObject } from "../..";
import { CartItem } from "../../(layout)/CartSection";
import parsePriceFromCurrency from "../../../utils/frontend/parsePriceFromCurrency";

export default function CartItemsSection({ cart, appContext }: { cart?: CartItem[] | null; appContext: AppContextObject }): JSX.Element {
    const { appState } = appContext;

    return (
        <div className="flex-div col">
            <div className="flex-div justify-between w-full mb-4">
                <h2 className="text-base">Your Cart Items</h2>

                <div className="flex-div justify-start">
                    {cart && cart[0] && (
                        <a
                            href="/checkout"
                            className="button smaller"
                        >
                            Checkout
                        </a>
                    )}
                    <a
                        href="/products"
                        className="button outlined smaller"
                    >
                        Shop more items
                    </a>
                </div>
            </div>
            <div className="flex-div">
                {cart && cart[0] ? (
                    cart.map((cartItem, index) => {
                        return (
                            <div
                                key={index}
                                className="flex-div"
                            >
                                <div className="flex-div">
                                    <img
                                        src={cartItem.product.image_primary_thumbnail}
                                        alt={cartItem.product.title}
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover"
                                    />

                                    <div className="flex-div col gap-0">
                                        <span className="max-w-[150px] text-ellipsis whitespace-nowrap overflow-hidden text-sm">{cartItem.product.title}</span>
                                        <div className="flex-div">
                                            <span>
                                                {parsePriceFromCurrency({
                                                    SITE_DATA: appContext.SITE_DATA,
                                                    currency: cartItem.product.currency || "USD",
                                                    price: cartItem.product.price || 0,
                                                    currencyObject: appState.currency,
                                                })}
                                            </span>
                                            <span className="opacity-20">|</span>
                                            <span>{cartItem.qty}</span>
                                            <span className="opacity-20">|</span>
                                            <span>{cartItem.size}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>
                        <div className="text-sm text-[black]/40">You have no items in your cart yet</div>
                    </div>
                )}
            </div>
        </div>
    );
}
