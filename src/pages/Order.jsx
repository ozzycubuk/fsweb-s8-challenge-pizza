import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const malzemelerListesi = [
  "Peynir",
  "Mantar",
  "Sucuk",
  "Zeytin",
  "Domates",
  "Biber",
  "Soğan",
  "Jambon",
];

const boyutlar = ["Küçük", "Orta", "Büyük"];

export default function Order() {
  const history = useHistory();

  const [isim, setIsim] = useState("");
  const [boyut, setBoyut] = useState("");
  const [malzemeler, setMalzemeler] = useState([]);
  const [ozelNot, setOzelNot] = useState("");
  const [hata, setHata] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMalzemeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (malzemeler.length < 10) {
        setMalzemeler([...malzemeler, value]);
        setHata("");
      } else {
        setHata("En fazla 10 malzeme seçebilirsiniz.");
      }
    } else {
      setMalzemeler(malzemeler.filter((m) => m !== value));
      setHata("");
    }
  };

  const validateForm = () => {
    if (isim.trim().length < 3) {
      setHata("İsim en az 3 karakter olmalı.");
      return false;
    }
    if (!boyut) {
      setHata("Pizza boyutunu seçiniz.");
      return false;
    }
    if (malzemeler.length < 4) {
      setHata("En az 4 malzeme seçmelisiniz.");
      return false;
    }
    setHata("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      isim: isim.trim(),
      boyut,
      malzemeler,
      ozel: ozelNot.trim(),
    };

    setLoading(true);
    try {
      const res = await axios.post("https://reqres.in/api/pizza", payload);
      console.log("Sunucudan gelen yanıt:", res.data);
      // Yönlendirme başarılı sayfaya
      history.push("/success");
    } catch (error) {
      setHata("Sunucuya gönderim sırasında hata oluştu.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "#FAF7F2",
        padding: 20,
        borderRadius: 8,
        fontFamily: "'Roboto Condensed', sans-serif",
        color: "#292929",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Pizza Sipariş Formu</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontWeight: "bold", color: "#5F5F5F" }}>
          İsim (en az 3 karakter)
        </label>
        <input
          type="text"
          value={isim}
          onChange={(e) => setIsim(e.target.value)}
          disabled={loading}
          style={{ padding: 8, fontSize: 16, borderRadius: 4, border: "1px solid #5F5F5F" }}
        />

        <label style={{ fontWeight: "bold", color: "#5F5F5F" }}>Pizza Boyutu</label>
        <div>
          {boyutlar.map((b) => (
            <label key={b} style={{ marginRight: 12, color: "#292929" }}>
              <input
                type="radio"
                name="boyut"
                value={b}
                checked={boyut === b}
                onChange={() => setBoyut(b)}
                disabled={loading}
              />
              {` ${b}`}
            </label>
          ))}
        </div>

        <label style={{ fontWeight: "bold", color: "#5F5F5F", marginTop: 12 }}>
          Malzemeler (4-10 adet seçiniz)
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {malzemelerListesi.map((m) => (
            <label key={m} style={{ color: "#292929" }}>
              <input
                type="checkbox"
                value={m}
                checked={malzemeler.includes(m)}
                onChange={handleMalzemeChange}
                disabled={loading}
              />
              {` ${m}`}
            </label>
          ))}
        </div>

        <label style={{ fontWeight: "bold", color: "#5F5F5F", marginTop: 12 }}>Notlar</label>
        <textarea
          rows={3}
          value={ozelNot}
          onChange={(e) => setOzelNot(e.target.value)}
          disabled={loading}
          style={{ padding: 8, fontSize: 16, borderRadius: 4, border: "1px solid #5F5F5F" }}
        />

        {hata && (
          <p style={{ color: "#CE2829", fontWeight: "bold" }}>
            {hata}
          </p>
        )}

        <button
          type="submit"
          disabled={
            loading ||
            isim.trim().length < 3 ||
            !boyut ||
            malzemeler.length < 4 ||
            malzemeler.length > 10
          }
          style={{
            backgroundColor: "#FDC913",
            color: "#292929",
            padding: "12px",
            borderRadius: 6,
            border: "none",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: 20,
          }}
        >
          {loading ? "Gönderiliyor..." : "Sipariş Ver"}
        </button>
      </form>
    </div>
  );
}
