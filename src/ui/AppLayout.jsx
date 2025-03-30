import Header from "../components/Header";
import Footer from "../components/Footer";
import MoveToTop from "../components/MoveToTop";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <MoveToTop />
      <Footer />
    </>
  );
}

export default AppLayout;
