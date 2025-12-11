import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./css/Category.css"; // make sure this path is correct

export default function Category() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSubs, setSelectedSubs] = useState(new Set());
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${category}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching category products:", err);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  // Build subcategory list from data (e.g., tshirts, footwear, hoodies)
  const subcategories = Array.from(
    new Set(products.map((p) => (p.category || "").toLowerCase()))
  ).filter(Boolean);

  // Filtering
  let filtered = products.filter((p) =>
    `${p.title} ${p.desc}`.toLowerCase().includes(search.toLowerCase())
  );
  if (selectedSubs.size > 0) {
    filtered = filtered.filter((p) => selectedSubs.has((p.category || "").toLowerCase()));
  }

  // Sorting (assumes price string like "₹1599")
  const parsePrice = (str) => {
    const n = Number((str || "").toString().replace(/[^0-9]/g, ""));
    return isNaN(n) ? 0 : n;
  };
  if (sortBy === "priceLow") filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  if (sortBy === "priceHigh") filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  if (sortBy === "nameAsc") filtered.sort((a, b) => a.title.localeCompare(b.title));
  if (sortBy === "nameDesc") filtered.sort((a, b) => b.title.localeCompare(a.title));

  const toggleSub = (sub) => {
    const next = new Set(selectedSubs);
    if (next.has(sub)) next.delete(sub); else next.add(sub);
    setSelectedSubs(next);
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="breadcrumb">Home / {category}</div>
        <h2 className="category-title">{category} Collection</h2>
        <div className="results-count">{filtered.length} items</div>
      </div>

      <div className="category-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-block">
            <input
              className="search-input"
              type="text"
              placeholder="Search for Categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="sidebar-block">
            <div className="sidebar-title">CATEGORIES</div>
            <div className="checkbox-list">
              {subcategories.length === 0 ? (
                <div className="muted">No filters</div>
              ) : (
                subcategories.map((sub) => (
                  <label key={sub} className="check-item">
                    <input
                      type="checkbox"
                      checked={selectedSubs.has(sub)}
                      onChange={() => toggleSub(sub)}
                    />
                    <span className="label-text">{sub.replace(/-/g, " ")}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Main area */}
        <main className="main-area">
          <div className="toolbar">
            <div className="left" />
            <div className="right">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Select Sorting Options</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAsc">Name: A to Z</option>
                <option value="nameDesc">Name: Z to A</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {filtered.length === 0 ? (
              <p className="no-products">No products available in this category.</p>
            ) : (
              filtered.map((item) => (
                <div className="product-card" key={item.id}>
                  <Link to={`/category/${category}/${item.id}`}>
                    <div className="product-image">
                      <img src={item.img} alt={item.title} />
                    </div>
                  </Link>
                  <div className="product-info">
                    <h3 className="product-name">{item.title}</h3>
                    <p className="product-desc">{item.desc}</p>
                    <h4 className="product-price">{item.price}</h4>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
