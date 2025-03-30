import AppLayout from "../ui/AppLayout";
import Home from "../components/sections/Home";
import About from "../components/sections/About";
import Services from "../components/sections/Services";

export default function Homepage() {
  return (
    <>
      <AppLayout>
        <Home />
        <About />
        <Services />
      </AppLayout>
    </>
  );
}
