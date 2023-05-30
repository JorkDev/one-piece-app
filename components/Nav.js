import requests from "../utils/requests";

function Nav() {
  return (
    <nav>
      <div className="flex px-10 sm:px-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
        {Object.values(requests).map(({ title, url }) => (
          <a key={title} href={url} target="_blank" rel="noopener noreferrer">
            <h2 className="last:pr-5 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-blue-400">
              {title}
            </h2>
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Nav;