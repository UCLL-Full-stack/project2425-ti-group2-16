import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('loggedInUser');
            router.push('/');
        };
    }, []);

    return null;
};

export default Logout;