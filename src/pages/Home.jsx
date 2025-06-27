import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "#FAF7F2",
        padding: 20,
        borderRadius: 8,
        textAlign: "center",
        fontFamily: "'Roboto Condensed', sans-serif",
        color: "#292929",
        boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
      }}
    >
      <h1
        style={{
          fontFamily: "'Satisfy', cursive",
          fontSize: "3rem",
          marginBottom: 12,
          userSelect: "none",
        }}
      >
        Teknolojik Yemekler
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: 24 }}>
        KOD ACIKTIRIR, PİZZA DOYURUR.
      </p>
      <button
        onClick={() => history.push("/order")}
        style={{
          backgroundColor: "#FDC913",
          border: "none",
          padding: "12px 24px",
          borderRadius: 8,
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          color: "#292929",
          boxShadow: "0 2px 4px rgb(0 0 0 / 0.1)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#e1b50f")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#FDC913")}
      >
        Sipariş Ver
      </button>
    </div>
  );
}
