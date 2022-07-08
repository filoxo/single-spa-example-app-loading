import React from "react";
import { navigateToUrl } from "single-spa";

const Link = (props) => {
  const handleNavigation = (e) => {
    e.preventDefault();
    // using navigateToUrl avoids needing a routing library
    // See also: https://single-spa.js.org/docs/api/#navigatetourl
    navigateToUrl(e.target.href);
  };
  return <a {...props} onClick={handleNavigation} />;
};

export default function Root() {
  return (
    <nav className="container">
      <ul>
        <li>
          <strong>@example</strong>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/1">App 1</Link>
        </li>
        <li>
          <Link href="/2">App 2</Link>
        </li>
      </ul>
    </nav>
  );
}
