import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";

const ProductView = () => {

    const { id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {

        const fetchItem = async () => {

            try {

                const res = await axios.get(
                    `https://sri-kavin-tailors.onrender.com/api/catalogue/${id}`
                );

                setItem(res.data);

            } catch (err) {

                console.log(err);
            }
        };

        fetchItem();

    }, [id]);

    if (!item) {
        return <h2>Loading...</h2>;
    }

    // WHATSAPP SHARE

    const shareToWhatsApp = () => {

        const url = window.location.href;

        const message =
            `Check this design 🔥\nModel ID: ${item.modelId}\n${url}`;

        window.open(
            `https://wa.me/?text=${encodeURIComponent(message)}`,
            "_blank"
        );
    };

    return (

        <div className="product-container">

            <div className="product-card">

                <img
                    src={item.image}
                    alt={item.title}
                />

                <h2>{item.title}</h2>

                <p className="model-id">
                    Model ID: {item.modelId}
                </p>

                <p>{item.mainCategory}</p>

                <p>{item.subCategory}</p>

                {/* WHATSAPP BUTTON */}

                <button
                    className="product-whatsapp-btn"
                    onClick={shareToWhatsApp}
                >
                    <FaWhatsapp />
                </button>

            </div>

        </div>
    );
};

export default ProductView;
