// ====================
// Import
// ====================
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Banner from "./components/Banner";
import Preview from "./components/Preview";
import Detail from "./components/Detail";

// ====================
// Functions
// ====================
function App() {
  const [items, setItems] = useState([]);
  const [showBanner, setShowBanner] = useState(false);
  const labels = ["red", "blue", "green", "yellow", "pink", "orange"];
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const url = "http://localhost:3000/api/images";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      const enriched = json.map((i, idx) => ({ ...i, label: labels[idx] }));
      setItems(enriched);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleClick(i) {
    if (i.is_premium) {
      setShowBanner(true);
    } else {
      navigate(`/detail/${i.label}/${i.id}`);
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <div className="main">
            {showBanner && (
              <Banner onClick={() => setShowBanner(false)} />
            )}

            {items.map((i) => (
              <Preview
                key={i.id}
                item={i}
                onClick={() => handleClick(i)}
              />
            ))}
          </div>
        } />

        <Route path="/detail/:label/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;