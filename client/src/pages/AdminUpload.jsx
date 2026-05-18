import { useState } from "react";
import axios from "axios";


const AdminUpload = () => {

    const [title, setTitle] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("mainCategory", mainCategory);
        formData.append("subCategory", subCategory);
        formData.append("image", image);

        try {

            await axios.post(
                "http://localhost:5000/api/catalogue/upload",
                formData
            );

            alert("Uploaded Successfully");

            e.target.reset();

            setTitle("");
            setMainCategory("");
            setSubCategory("");
            setImage(null);

        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className="admin-wrapper">

            <div className="admin-card">

                <h2>Upload Design</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <select
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                    >
                        <option value="">Select Main Category</option>
                        <option value="Blouse Designs">Blouse Designs</option>
                        <option value="Chudi Designs">Chudi Designs</option>
                    </select>

                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                    >
                        <option value="">Select Sub Category</option>

                        {mainCategory === "Blouse Designs" && (
                            <>
                                <option value="Blouse Back Neck Designs">
                                    Blouse Back Neck Designs
                                </option>
                                <option value="Blouse Hand Designs">
                                    Blouse Hand Designs
                                </option>
                            </>
                        )}

                        {mainCategory === "Chudi Designs" && (
                            <>
                                <option value="Chudi Neck Designs">
                                    Chudi Neck Designs
                                </option>
                                <option value="Chudi Hand Designs">
                                    Chudi Hand Designs
                                </option>
                            </>
                        )}
                    </select>

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    {image && (
                        <p className="file-name">
                            Selected: {image.name}
                        </p>
                    )}

                    <button type="submit">
                        Upload Design
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AdminUpload;