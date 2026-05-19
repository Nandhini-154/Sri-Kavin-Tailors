import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/Tailors.png";

const Catalogue = () => {

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        axios.get("https://sri-kavin-tailors.onrender.com/api/catalogue")

            .then((res) => {

                setItems(res.data);
                setFilteredItems(res.data);

            })

            .catch((err) => {
                console.log(err);
            });

    }, []);

    // SEARCH

    const handleSearch = (value) => {

        setSearch(value);

        const filtered = items.filter((item) =>
            item.modelId.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredItems(filtered);
    };

    // FILTER

  const filterCategory = (category) => {

    if (category === "All") {

        setFilteredItems(items);

    }

    else {

        const filtered = items.filter(
            (item) =>
                item.mainCategory === category ||
                item.subCategory === category
        );

        setFilteredItems(filtered);
    }
};

    return (

        <div className="catalogue-container">

            {/* NAVBAR */}
<div className="navbar">

    <div className="logo-section">

      <img src={logo}  alt="logo" />

        <div>

            <h1>Sri Kavin's Tailors</h1>

            <p>Ladies | Gents | Kids</p>

        </div>

    </div>

</div>

            {/* SEARCH */}

            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search by Model ID"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />

            </div>

            {/* FILTER BUTTONS */}

<div className="filter-buttons">

    <button onClick={() => filterCategory("All")}>
        All
    </button>

    <button onClick={() => filterCategory("Blouse Designs")}>
        Blouse
    </button>

    <button onClick={() => filterCategory("Chudi Designs")}>
        Chudi
    </button>

    <button onClick={() => filterCategory("Blouse Hand Designs")}>
        Blouse Hand
    </button>

    <button onClick={() => filterCategory("Blouse Back Neck Designs")}>
        Blouse Back Neck
    </button>

    <button onClick={() => filterCategory("Chudi Hand Designs")}>
        Chudi Hand
    </button>

    <button onClick={() => filterCategory("Chudi Neck Designs")}>
        Chudi Neck
    </button>

</div>

            {/* GRID */}

            <div className="grid">

                {filteredItems.map((item) => (

                    <div className="card" key={item._id}>

                        <img
                            src={item.image}
                            alt={item.title}
                        />

                        <h3>{item.title}</h3>

                        <p>{item.modelId}</p>

                        <div className="btn-container">

                            {/* VIEW BUTTON */}

                            <button
                                className="view-btn"
                                onClick={() =>
                                    navigate(`/product/${item._id}`)
                                }
                            >
                                View
                            </button>

                            {/* WHATSAPP BUTTON */}

                            <button
                                className="whatsapp-btn"
                                onClick={() => {

                                  const url =
`https://sri-kavins-tailors.netlify.app/product/${item._id}`;

                                    const message =
                                        `Check this design 🔥\nModel ID: ${item.modelId}\n${url}`;

                                    window.open(
                                        `https://wa.me/?text=${encodeURIComponent(message)}`,
                                        "_blank"
                                    );

                                }}
                            >
                                <FaWhatsapp />
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Catalogue;
