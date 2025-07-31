const Hero = () => {
  const phrases = ["Senior at Princeton University"];
  const blurbs = [
    "I'm a research engineer interested in training large models to reason about the world.",
  ];
  return (
    <div className="flex flex-col justify-start items-start">
      <h1
        className="font-bold text-gray-900 dark:text-gray-100 mb-2 opacity-0 animate-fadeIn"
        style={{
          fontSize: "45px",
          animationDelay: "0ms",
          animationFillMode: "forwards",
        }}
      >
        Tharun Kumar
      </h1>
      <div
        className="font-regular transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
        style={{
          fontSize: "22px",
          animationDelay: "200ms",
          animationFillMode: "forwards",
        }}
      >
        <span className="relative">
          <span className="">{phrases[0]}</span>
        </span>
      </div>
      <div
        className="mt-4 text-gray-600 dark:text-gray-400 transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
        style={{
          fontSize: "18px",
          animationDelay: "400ms",
          animationFillMode: "forwards",
        }}
      >
        <span className="relative">
          <span className="">{blurbs[0]}</span>
        </span>
      </div>
      <a
        href="/blog"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-gray-100 px-4 py-2 text-sm font-medium text-white dark:text-gray-900 shadow transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 opacity-0 animate-fadeIn"
        style={{
          animationDelay: "600ms",
          animationFillMode: "forwards",
        }}
      >
        Check out my blog!
      </a>
    </div>
  );
};

export default Hero;
