import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import {ServiceProvider} from './components/context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <ServiceProvider>
      <App />
     </ServiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
