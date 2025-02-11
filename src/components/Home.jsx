import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Home({ handleCount }) {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [singleCategory, setSingleCategory] = useState("");
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishList(savedWishlist);
    handleCount(savedWishlist.length);
  }, [handleCount]);

  useEffect(() => {
    handleCount(wishList.length);
  }, [wishList, handleCount]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const categoryNames = response.data.categories.map((cat) => cat.strCategory);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      try {
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
        if (singleCategory) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${singleCategory}`;
        }
        const response = await axios.get(url);
        setMeals(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
      setLoading(false);
    }
    fetchMeals();
  }, [singleCategory]);

  async function searchMeals(searchTerm) {
    setSearchVal(searchTerm);
    if (searchTerm.trim() === "") {
      setSingleCategory("");
      return;
    }
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error("Error searching meals:", error);
    }
  }

  function handleWishList(meal) {
    let updatedWishlist = [...wishList];

    if (wishList.some((item) => item.idMeal === meal.idMeal)) {
      updatedWishlist = updatedWishlist.filter((item) => item.idMeal !== meal.idMeal);
    } else {
      updatedWishlist.push(meal);
    }

    setWishList(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  return (
    <div style={styles.container}>
      {/* Title */}
      <div style={styles.header}>
        <h2>Search Your Loved Recipe</h2>
        <FaHeart style={styles.heartIcon} />
      </div>

      {/* Search and Filter */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name or ingredient"
          value={searchVal}
          onChange={(e) => searchMeals(e.target.value)}
          style={styles.input}
        />

        <select
          value={singleCategory}
          onChange={(e) => setSingleCategory(e.target.value)}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Meals Display */}
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : meals.length === 0 ? (
        <p style={styles.noMealsText}>No meals found.</p>
      ) : (
        <div style={styles.mealGrid}>
          {meals.map((meal) => (
            <div key={meal.idMeal} style={styles.mealCard}>
              <Link to={`/details/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.mealImage} />
              </Link>
              <h3 style={styles.mealTitle}>{meal.strMeal}</h3>

              <div style={styles.wishlistContainer}>
                <FaHeart
                  size={24}
                  style={{
                    color: wishList.some((item) => item.idMeal === meal.idMeal) ? "red" : "gray",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => handleWishList(meal)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Responsive Styles
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  heartIcon: {
    color: "red",
    fontSize: "2rem",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "300px",
    padding: "10px",
    borderRadius: "20px",
    outline: "none",
    border: "1px solid gray",
    fontSize: "16px",
  },
  select: {
    padding: "10px 20px",
    borderRadius: "20px",
    outline: "none",
    border: "1px solid gray",
    fontSize: "16px",
  },
  loadingText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  },
  noMealsText: {
    fontSize: "20px",
    color: "red",
    fontWeight: "bold",
  },
  mealGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    paddingTop: "20px",
  },
  mealCard: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    borderRadius: "10px",
    transition: "0.3s",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  mealImage: {
    width: "100%",
    borderRadius: "10px",
    transition: "0.3s",
  },
  mealTitle: {
    fontSize: "18px",
    margin: "10px 0",
  },
  wishlistContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};

export default Home;
