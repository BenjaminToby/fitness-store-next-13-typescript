import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
    children: React.ReactNode;
    trigger?: React.ReactNode;
    title?: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GeneralModal({ children, trigger, title, open, setOpen }: Props) {
    return (
        <Dialog.Root open={open}>
            {trigger && <Dialog.Trigger className="flex items-center gap-1">{trigger}</Dialog.Trigger>}
            <Dialog.Portal>
                <Dialog.Overlay
                    className="DialogOverlay flex items-center justify-center"
                    onClick={(e) => {
                        if (setOpen) setOpen(false);
                    }}
                />
                <Dialog.Content className="DialogContentAppear">
                    {/* <Dialog.Title
                        className="DialogTitle text-2xl"
                        asChild
                    >
                        {title || "Modal Title"}
                    </Dialog.Title> */}

                    <div className="h-[50px]">{title}</div>

                    {children}

                    <Dialog.Close
                        asChild
                        onClick={(e) => {
                            if (setOpen) setOpen(false);
                        }}
                    >
                        <button
                            className="ghost absolute top-4 right-4 bg-[transparent] p-0"
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
