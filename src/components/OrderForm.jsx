import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const malzemeler = [
  "Peynir", "Sucuk", "Zeytin", "Mantar",
  "Mozarella", "Biber", "Soğan", "Domates",
  "Jambon", "Mısır"
];

const validationSchema = Yup.object().shape({
  isim: Yup.string().min(3, "En az 3 karakter").required("Zorunlu"),
  boyut: Yup.string().required("Zorunlu"),
  malzemeler: Yup.array().min(4, "Min 4 malzeme").max(10, "Max 10 malzeme"),
  özel: Yup.string()
});

export default function OrderForm() {
  const history = useHistory();

  const initialValues = {
    isim: "",
    boyut: "",
    malzemeler: [],
    özel: ""
  };

  const handleSubmit = (values, actions) => {
    axios.post("https://reqres.in/api/pizza", values)
      .then((res) => {
        console.log("Yanıt:", res.data);
        history.push("/success");
      })
      .catch(console.error)
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isValid, isSubmitting }) => (
        <Form>
          <label>İsim</label>
          <Field name="isim" />
          <ErrorMessage name="isim" component="div" className="error" />

          <label>Boyut</label>
          <label><Field type="radio" name="boyut" value="Küçük" /> Küçük</label>
          <label><Field type="radio" name="boyut" value="Orta" /> Orta</label>
          <label><Field type="radio" name="boyut" value="Büyük" /> Büyük</label>
          <ErrorMessage name="boyut" component="div" className="error" />

          <label>Malzemeler</label>
          {malzemeler.map((item) => (
            <label key={item}>
              <Field type="checkbox" name="malzemeler" value={item} /> {item}
            </label>
          ))}
          <ErrorMessage name="malzemeler" component="div" className="error" />

          <label>Özel Not</label>
          <Field as="textarea" name="özel" />

          <button type="submit" disabled={!isValid || isSubmitting}>Sipariş Ver</button>
        </Form>
      )}
    </Formik>
  );
}
