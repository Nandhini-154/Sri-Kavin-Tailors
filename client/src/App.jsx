import { Routes, Route } from "react-router-dom";

import AdminUpload from "./pages/AdminUpload";
import Catalogue from "./pages/Catalogue";
import ProductView from "./pages/ProductView";
import AdminList from "./pages/AdminList";

function App() {

    return (

        <>

            <Routes>

                <Route path="/" element={<Catalogue />} />

                <Route path="/admin" element={<AdminUpload />} />

                <Route path="/product/:id" element={<ProductView />} />

                <Route path="/manage" element={<AdminList />} />

            </Routes>

            <div className="footer">

                <p>
                    © 2026 Sri Kavin's Tailors. Some images used on this website are sourced from external resources. All respective copyrights belong to their original owners.
                </p>

            </div>

        </>

    );
}

export default App;
