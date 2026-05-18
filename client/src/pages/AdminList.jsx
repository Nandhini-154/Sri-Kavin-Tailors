import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const AdminList = () => {

    const [items, setItems] = useState([]);

    // EDIT STATES

    const [editItem, setEditItem] = useState(null);

    const [title, setTitle] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [image, setImage] = useState(null);

    // FETCH DATA

    const fetchData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/catalogue"
            );

            setItems(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    // DELETE

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm("Delete this design?");

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:5000/api/catalogue/${id}`
            );

            alert("Deleted Successfully");

            fetchData();

        } catch (err) {

            console.log(err);
        }
    };

    // UPDATE

    const handleUpdate = async () => {

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("mainCategory", mainCategory);
            formData.append("subCategory", subCategory);

            if (image) {

                formData.append("image", image);
            }

            await axios.put(
                `http://localhost:5000/api/catalogue/${editItem._id}`,
                formData
            );

            alert("Updated Successfully");

            setEditItem(null);

            fetchData();

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div className="admin-list-container">

            <h2>Manage Designs</h2>

            <div className="grid">

                {items.map((item) => (

                    <div className="card" key={item._id}>

                        <img
                            src={item.image}
                            alt={item.title}
                        />

                        <h3>{item.title}</h3>

                        <p>{item.modelId}</p>

                        <div className="btn-container">

                            {/* EDIT */}

                            <button
                                className="edit-btn"
                                onClick={() => {

                                    setEditItem(item);

                                    setTitle(item.title);
                                    setMainCategory(item.mainCategory);
                                    setSubCategory(item.subCategory);

                                }}
                            >
                                <FaEdit />
                            </button>

                            {/* DELETE */}

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(item._id)
                                }
                            >
                                <FaTrash />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {/* EDIT MODAL */}

            {
                editItem && (

                    <div className="edit-modal">

                        <div className="edit-card">

                            <h2>Edit Design</h2>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                            <select
                                value={mainCategory}
                                onChange={(e) =>
                                    setMainCategory(e.target.value)
                                }
                            >
                                <option value="Blouse Designs">
                                    Blouse Designs
                                </option>

                                <option value="Chudi Designs">
                                    Chudi Designs
                                </option>
                            </select>

                            <select
                                value={subCategory}
                                onChange={(e) =>
                                    setSubCategory(e.target.value)
                                }
                            >

                                {/* BLOUSE */}

                                {
                                    mainCategory === "Blouse Designs" && (
                                        <>
                                            <option value="Blouse Back Neck Designs">
                                                Blouse Back Neck Designs
                                            </option>

                                            <option value="Blouse Hand Designs">
                                                Blouse Hand Designs
                                            </option>
                                        </>
                                    )
                                }

                                {/* CHUDI */}

                                {
                                    mainCategory === "Chudi Designs" && (
                                        <>
                                            <option value="Chudi Neck Designs">
                                                Chudi Neck Designs
                                            </option>

                                            <option value="Chudi Hand Designs">
                                                Chudi Hand Designs
                                            </option>
                                        </>
                                    )
                                }

                            </select>

                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                            />

                            <div className="edit-actions">

                                <button onClick={handleUpdate}>
                                    Save
                                </button>

                                <button
                                    className="cancel-btn"
                                    onClick={() =>
                                        setEditItem(null)
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
};

export default AdminList;