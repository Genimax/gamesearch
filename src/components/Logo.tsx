import classNameRender from "../functions/ClassNameRender";
import { useLogo } from "../hooks/logo";

const Logo: React.FC = () => {
  const { path, onLogoClick } = useLogo();

  return (
    <a
      href="/"
      onClick={onLogoClick}
      className={`logo-container${classNameRender(path, "-up")}`}
    >
      <img
        className={`logo-icon${classNameRender(path, "-up")}`}
        src="./logo1.svg"
        alt="logo"
      />
      <h4 className={`logo-text`}>gamechecks</h4>
    </a>
  );
};

export default Logo;
