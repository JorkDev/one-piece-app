import requests from "../utils/requests";

function Nav() {
  return (
    <nav>
      <div>
        {Object.values(requests).map(({ title, url }) => (
          <a key={title} href={url} target="_blank" rel="noopener noreferrer">
            <h2>{title}</h2>
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Nav;