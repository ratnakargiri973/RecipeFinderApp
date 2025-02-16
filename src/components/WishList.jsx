import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

function WishList({ handleCount }) {
  const [wishListItems, setWishListItems] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishListItems(savedWishlist);
    handleCount(savedWishlist.length);
  }, [handleCount]);

  useEffect(() => {
    handleCount(wishListItems.length);
  }, [wishListItems, handleCount]);

  function removeFromWishList(idMeal) {
    const updatedWishlist = wishListItems.filter((meal) => meal.idMeal !== idMeal);
    setWishListItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    handleCount(updatedWishlist.length);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Wishlist</h2>

      {wishListItems.length === 0 ? (
        <p style={styles.emptyText}>Your wishlist is empty.</p>
      ) : (
        <div style={styles.mealGrid}>
          {wishListItems.map((meal) => (
            <div key={meal.idMeal} style={styles.mealCard}>
              <Link to={`/details/${meal.idMeal}`} style={styles.link}>
                <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.mealImage} />
              </Link>
              <h3 style={styles.mealTitle}>{meal.strMeal}</h3>

              <div style={styles.wishlistContainer}>
                <FaHeart
                  size={24}
                  style={styles.heartIcon}
                  onClick={() => removeFromWishList(meal.idMeal)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  emptyText: {
    fontSize: "20px",
    color: "gray",
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
    padding: "15px",
    textAlign: "center",
    borderRadius: "10px",
    transition: "0.3s",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
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
    justifyContent: "center",
    alignItems: "center",
  },
  heartIcon: {
    color: "red",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default WishList;
