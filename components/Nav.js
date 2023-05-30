import requests from "../utils/requests";

function Nav() {
  return (
    <nav>
      <div>
        {Object.values(requests).map(({ title }) => (
          <h2 key={title}>{title}</h2>
        ))}
      </div>
    </nav>
  );
}

export default Nav;