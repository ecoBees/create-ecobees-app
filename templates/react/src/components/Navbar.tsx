import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full pt-3 bg-transparent">
      <ul className="flex justify-center w-full gap-4">
        <li>
          <Link to="/" className="text-white hover:underline hover:text-yellow-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/not-found" className="text-white hover:underline hover:text-yellow-600">
            Not Found
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-white hover:underline hover:text-yellow-600">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
