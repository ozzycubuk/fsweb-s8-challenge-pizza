import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "#FAF7F2",
        padding: 30,
        borderRadius: 10,
        textAlign: "center",
        fontFamily: "'Roboto Condensed', sans-serif",
        color: "#292929",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Satisfy', cursive",
          fontSize: "3rem",
          marginBottom: 20,
          color: "#FDC913",
        }}
      >
        Siparişiniz Onaylandı!
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: 30 }}>
        Siparişiniz başarıyla alınmıştır. En kısa sürede hazırlanacaktır.
      </p>

      <Link to="/">
        <button
          style={{
            backgroundColor: "#FDC913",
            border: "none",
            padding: "12px 25px",
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
          Anasayfaya Dön
        </button>
      </Link>
    </div>
  );
}
