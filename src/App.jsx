import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Loading from "src/components/Loading";
import { RequestStatus } from "src/constant";
import MainRoutes from "src/routes/MainRoutes";
import "./App.css";

function App() {
  const { requestStatus } = useSelector((state) => state.setting);
  return (
    <BrowserRouter>
      <div className="App">
        {requestStatus === RequestStatus.PENDING && <Loading />}
        <MainRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
