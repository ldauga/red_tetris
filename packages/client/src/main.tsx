import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

import "./index.css";
import Home from "./Home";

const root = ReactDOM.createRoot(document.getElementById("root")!);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

root.render(<App />);

export default App;