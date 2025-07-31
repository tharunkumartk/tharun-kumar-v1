const Hero = () => {
  const phrases = ["Senior at Princeton University"];
  const blurbs = [
    "I'm a research engineer interested in training large models to reason about the world.",
  ];
  return (
    <div className="flex flex-col justify-start items-start">
      <h1
        className="font-bold text-gray-900 dark:text-gray-100 mb-2"
        style={{ fontSize: "45px" }}
      >
        Tharun Kumar
      </h1>
      <div
        className="font-regular transition-opacity duration-500 ease-in-out"
        style={{ fontSize: "22px" }}
      >
        <span className="relative">
          <span className="">{phrases[0]}</span>
        </span>
      </div>
      <div
        className="mt-4 text-gray-600 dark:text-gray-400 transition-opacity duration-500 ease-in-out"
        style={{ fontSize: "18px" }}
      >
        <span className="relative">
          <span className="">{blurbs[0]}</span>
        </span>
      </div>
    </div>
  );
};

export default Hero;
