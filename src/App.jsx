import "./App.css";
import NavBar from "./NavBar";
//newsAPI asks for premium subscription if we try to fetch news on hosted website (eg on netlify)
//for getting API calls after deploying on netlify, you can change the initial url of newsAPI with a premium ID in NavBar.jsx
//Note that this has to be done at both the places
function App() {
  return (
    <>
      <NavBar />
    </>
  );
}

export default App;
