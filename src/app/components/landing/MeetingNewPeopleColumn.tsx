import Link from "next/link";

const MeetingNewPeopleColumn = () => {
  return (
    <div
      className="flex flex-col justify-start items-center pt-20 pb-20"
      id="meeting-new-people"
    >
      <div className="">
        <p
          className="font-light text-stone-600 dark:text-stone-400 opacity-0 animate-fadeIn"
          style={{
            fontSize: "18px",
            animationDelay: "100ms",
            animationFillMode: "forwards",
          }}
        >
          <span className="font-medium text-stone-900 dark:text-white">
            I love meeting new people.
          </span>{" "}
          {/* <br />
          <br /> */}
          Feel free to reach out if you have questions or just want to chat! I
          promise I don&apos;t bite :)
        </p>
        <Link
          href="mailto:tharun.tiruppal@gmail.com"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-stone-900 dark:bg-stone-100 px-4 py-2 text-sm font-medium text-white dark:text-stone-900 shadow transition-colors hover:bg-stone-800 dark:hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 dark:focus-visible:ring-stone-300 disabled:pointer-events-none disabled:opacity-50"
        >
          Email me
        </Link>
      </div>
    </div>
  );
};

export default MeetingNewPeopleColumn;
