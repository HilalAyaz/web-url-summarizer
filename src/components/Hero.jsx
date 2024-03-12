import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <header className="w-full flex items-center justify-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-40 h-14 object-contain " />
        <button
          type="button"
          onClick={() => window.open("https://hilalayaz-webdev.netlify.app/")}
          className="black_btn"
        >
          Check out My Portfolio
        </button>
      </nav>
      <h1 className="head_text">
        {" "}
        Dive into Discovery with <br className="max-md:hidden" />{" "}
        <span className="orange_gradient">MagiAI</span>
      </h1>
      <h2 className="desc">
        {" "}
        Enter a realm of wonder with MagiAI, the extraordinary tool that
        transforms lengthy web content into captivating summaries, revealing the
        essence of each page with unparalleled clarity and precision.
      </h2>
    </header>
  );
};

export default Hero;
