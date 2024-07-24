import React, { createContext, useRef } from "react";
import ToastManager from "./ToastManager";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const toastRef = useRef();

    return (
        <ToastContext.Provider value={toastRef}>
            {children}
            <ToastManager ref={toastRef} />
        </ToastContext.Provider>
    )
}