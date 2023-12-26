import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

type Props = {
    children: React.ReactNode;
    trigger: React.ReactNode;
    closeButton?: boolean;
};

export default function GeneralHoverCard({ children, trigger, closeButton }: Props) {
    return (
        <HoverCard.Root openDelay={100}>
            <HoverCard.Trigger>{trigger}</HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="HoverCardContent"
                    sideOffset={5}
                    data-side="top"
                >
                    {children}
                    <HoverCard.Arrow className="HoverCardArrow" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}
