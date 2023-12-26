import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

type ToastProps = {
    trigger?: React.ReactNode | string;
    title: React.ReactNode | string;
    description: React.ReactNode | string;
    open?: boolean;
    duration?: number;
    icon?: string;
};

export default function GeneralToast(props: ToastProps) {
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
        if (props.open) {
            setOpen(true);
        }
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <Toast.Provider
            swipeDirection="right"
            duration={props?.duration || 5000}
        >
            <div
                className="Button large violet"
                onClick={() => {
                    setOpen(false);
                    window.clearTimeout(timerRef.current);

                    timerRef.current = window.setTimeout(() => {
                        setOpen(true);
                    }, 100);
                }}
            >
                {props.trigger}
            </div>

            <Toast.Root
                className="ToastRoot"
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title className="ToastTitle flex items-center gap-2">
                    {props.icon && (
                        <img
                            src={props.icon}
                            alt="Toast Icon"
                            width={20}
                            height={20}
                            style={{
                                minWidth: "25px",
                            }}
                        />
                    )}
                    <span className="text-lg text-[black]/50">{props.title}</span>
                </Toast.Title>
                <Toast.Description>
                    <span>{props.description}</span>
                </Toast.Description>
                <Toast.Action
                    className="ToastAction"
                    asChild
                    altText="Goto schedule to undo"
                >
                    <div>
                        <img
                            src="/images/close.svg"
                            width={15}
                            height={15}
                            alt=""
                        />
                    </div>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="ToastViewport" />
        </Toast.Provider>
    );
}
