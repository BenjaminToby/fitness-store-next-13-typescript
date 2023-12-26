import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
    children: React.ReactNode;
    trigger: React.ReactNode;
    title?: React.ReactNode;
};

export default function GeneralDrawer({ children, trigger, title }: Props) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="flex items-center gap-1">{trigger}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content
                    className="DialogContentSlideFromRight"
                    onOpenAutoFocus={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="flex flex-col items-start w-full h-full overflow-auto p-6 pb-10">
                        <Dialog.Title
                            className="DialogTitle text-2xl"
                            asChild
                        >
                            {title}
                        </Dialog.Title>
                        {children}
                    </div>

                    <Dialog.Close asChild>
                        <button
                            className="ghost absolute top-6 right-6 bg-[transparent] p-0"
                            aria-label="Close"
                        >
                            <img
                                src="/images/close.svg"
                                alt="Close Icon"
                                width={20}
                                height={20}
                            />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
