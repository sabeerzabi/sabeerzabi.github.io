import AppLayout from "../ui/AppLayout";
import Home from "../components/sections/Home";
import About from "../components/sections/About";

export default function Homepage() {
  return (
    <>
      <AppLayout>
        <Home />
        <About />
      </AppLayout>
    </>
  );
}
