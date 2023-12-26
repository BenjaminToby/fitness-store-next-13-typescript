import { DSQL_ECOMMERCE_ORDER } from "../../checkout/OrderSummarySection";

export default function OrdersSection({ orders }: { orders: DSQL_ECOMMERCE_ORDER[] }): JSX.Element {
    return (
        <div className="flex-div col">
            <h2 className="text-base">Your Orders</h2>
            {orders[0] ? (
                orders.map((order) => {
                    return <div>Order</div>;
                })
            ) : (
                <div className="text-sm text-[black]/40">No Orders Made yet</div>
            )}
        </div>
    );
}
