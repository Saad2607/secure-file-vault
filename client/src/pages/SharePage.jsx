import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function SharePage() {
    const { id } = useParams();
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            const res = await API.get(`/files/${id}`);
            setFile(res.data);
        };
        fetchFile();
    }, [id]);

    if (!file) return <p>Loading...</p>;

    return (
        <div className="h-screen flex justify-center items-center">
            {file.fileUrl.endsWith(".pdf") ? (
                <iframe src={file.fileUrl} className="w-full h-full" />
            ) : (
                <img src={file.fileUrl} alt="" />
            )}
        </div>
    );
}

export default SharePage;