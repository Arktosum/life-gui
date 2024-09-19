import { Bounce, toast } from "react-toastify";

export function showToast(text: string, type: "SUCCESS" | "ERROR") {
    if (type == 'SUCCESS') {
        toast.success(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }
    else if (type == 'ERROR') {
        toast.error(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

}