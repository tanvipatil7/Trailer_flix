import SearchIcon from "@mui/icons-material/Search";

function Navbar({ onSearchToggle }) {
  return (
    <div className="navbar">
      <img
        className="navbar__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
      />

      <div className="navbar__right">
        <SearchIcon
  className="navbar__searchIcon"
  onClick={onSearchToggle}
  sx={{ fontSize: 50 }}
/>

        <img
          className="navbar__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Avatar"
        />
      </div>
    </div>
  );
}

export default Navbar;
