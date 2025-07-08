import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  const [siparisData, setSiparisData] = useState(null);
  const [hataMesaji, setHataMesaji] = useState("");

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        
        <Route
          path="/order"
          render={(props) => (
            <Order
              {...props}
              setSiparisData={setSiparisData}
              setHataMesaji={setHataMesaji}
            />
          )}
        />
        
        <Route
          path="/success"
          render={(props) => (
            <Success
              {...props}
              siparisData={siparisData}
              hataMesaji={hataMesaji}
              setHataMesaji={setHataMesaji}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
