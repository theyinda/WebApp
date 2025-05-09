import toast from "react-hot-toast";

const Message = {
    ErrorResponseUndefined: "An error occurred",
    UserNotConfirmedException: "UserNotConfirmedException",
    EmailVerificationError: "An error occurred while verifying email",
};

export const ErrorHandler = (error?: { message?: string; details?: string; custom?: boolean }) => {
    if (error) {
        if (error.message)
            return toast.error(error.message, {
                style: {
                    background: "Red",
                    color: "#fff",
                },
            });
        if (error.custom) return toast.error(Message.ErrorResponseUndefined);
        if (error.details) return toast.error(error.details);
    } else {
        return toast.error(Message.ErrorResponseUndefined);
    }
};

export const SuccessHandler = (msg?: { message: string; details?: string }) => {
    if (msg) {
        toast.success(msg.message);
        if (msg.details) return toast.success(msg.details);
    } else {
        return toast.success("Successful");
    }
};

export const LoadingHandler = (msg?: { message: string; details?: string }) => {
    if (msg) {
        toast.loading(msg.message, { duration: 5000 });
        if (msg.details) return toast.loading(msg.details);
    } else {
        return toast.loading("Processing");
    }
};

export const DismissHandler = () => {
    toast.dismiss();
};
