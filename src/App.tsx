import { Suspense } from "react";
import Loader from "./components/Loader";
import ScrollTop from "./components/ScrollTop";
import ThemeCustomization from "./layout/themes";
import Routes from "./routes";

function App() {
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>
      </ScrollTop>
    </ThemeCustomization>
  );
}

export default App;
