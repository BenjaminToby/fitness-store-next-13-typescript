import React from "react";
import * as Popover from "@radix-ui/react-popover";

type Props = {
    children: React.ReactNode;
    trigger: React.ReactNode;
    closeButton?: boolean;
};

export default function GeneralPopover({ children, trigger, closeButton }: Props) {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <div
                    className="IconButton"
                    aria-label="Update dimensions"
                >
                    {trigger}
                </div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="PopoverContent"
                    sideOffset={5}
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                    }}
                >
                    {children}
                    {closeButton && (
                        <Popover.Close
                            className="PopoverClose"
                            aria-label="Close"
                            asChild
                        >
                            <img
                                src="/images/close.svg"
                                alt="Close Icon"
                                width={20}
                                height={20}
                            />
                        </Popover.Close>
                    )}
                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
