import { House } from "lucide-react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let navigate = useNavigate();
  return (
    <header>
      <div onClick={() => navigate("/")}>Walley</div>
      <nav aria-label="global page nav">
        <ul>
          <li>
            <Button
              variant="navigation"
              aria-label="navigate home button"
              onClick={() => navigate("/")}
            >
              <House size={16} aria-label="house: home" role="img" />
            </Button>
          </li>
          <li>
            <Button
              variant="navigation"
              aria-label="navigate to transactions button"
              onClick={() => navigate("/")}
            >
              Transactions
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
