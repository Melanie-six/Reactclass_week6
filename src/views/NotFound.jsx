import { useNavigate } from "react-router";
import { useEffect } from "react";

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 2000)
    }, []);
    return (<>
        <h1>NotFound pages</h1>
        <p>頁面不存在，將在 2 秒後跳轉至首頁</p>
        </>
    )
};
export default NotFound;