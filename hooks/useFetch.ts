import { useEffect, useState } from "react";

const useFetch = (url: string) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const nextData = await response.json();
            setData(nextData);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetch;
