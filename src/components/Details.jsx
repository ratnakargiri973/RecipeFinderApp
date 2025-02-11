import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMealDetails() {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeal(response.data.meals ? response.data.meals[0] : null);
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMealDetails();
  }, [id]);

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backButton}>
        ⬅ Back to Home
      </Link>

      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : meal ? (
        <div style={styles.card}>
          <h2 style={styles.title}>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} style={styles.image} />

          <div style={styles.details}>
            <h4>
              <strong>Category:</strong> {meal.strCategory}
            </h4>
            <h4>
              <strong>Area:</strong> {meal.strArea}
            </h4>
          </div>

          <h3 style={styles.sectionTitle}>Ingredients:</h3>
          <ul style={styles.ingredientList}>
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((num) => ({
                ingredient: meal[`strIngredient${num}`],
                measure: meal[`strMeasure${num}`],
              }))
              .filter((item) => item.ingredient && item.ingredient.trim() !== "")
              .map((item, index) => (
                <li key={index} style={styles.ingredientItem}>
                  <span style={styles.ingredientText}>
                    {item.measure} {item.ingredient}
                  </span>
                </li>
              ))}
          </ul>

          <h3 style={styles.sectionTitle}>Instructions:</h3>
          <p style={styles.instructions}>{meal.strInstructions}</p>
        </div>
      ) : (
        <p style={styles.errorText}>Meal not found.</p>
      )}
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  backButton: {
    display: "inline-block",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#ff5733",
    padding: "10px 20px",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#333",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  details: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "15px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#444",
  },
  ingredientList: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
    display: "inline-block",
  },
  ingredientItem: {
    fontSize: "18px",
    padding: "5px 0",
    borderBottom: "1px solid #ddd",
  },
  ingredientText: {
    fontWeight: "bold",
    color: "#333",
  },
  instructions: {
    textAlign: "justify",
    maxWidth: "600px",
    margin: "10px auto",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
  },
  errorText: {
    fontSize: "20px",
    color: "red",
    fontWeight: "bold",
  },
};

export default Details;
