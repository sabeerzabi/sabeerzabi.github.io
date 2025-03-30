export default function Footer() {
  return (
    <footer className="brand-bg-dark text-white py-8">
      {/* Bottom Section */}
      <div className="text-center">
        <p className="text-white-500">
          &copy; {new Date().getFullYear()} Sabeer C A.
        </p>
      </div>
    </footer>
  );
}
