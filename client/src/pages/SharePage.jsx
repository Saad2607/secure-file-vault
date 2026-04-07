import { useParams } from "react-router-dom";

function SharePage() {
    const { id } = useParams();

    return (
        <div className="h-screen flex items-center justify-center text-white bg-black">
            <iframe
                src={`https://secure-file-vault-btqm.onrender.com/api/files/file/${id}`}
                className="w-[90%] h-[90%]"
                title="shared-file"
            />
        </div>
    );
}

export default SharePage;