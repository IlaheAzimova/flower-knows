import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" // səhifə açılan kimi dərhal yuxarıda olması üçün
        });
    }, [pathname]);

    return null;
}