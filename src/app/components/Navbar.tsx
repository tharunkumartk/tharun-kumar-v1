import Link from "next/link";

const Navbar = () => {
  const navItems = [
    { href: "#about", label: "about me" },
    { href: "#work", label: "work" },
    { href: "#projects", label: "projects" },
    { href: "#resume", label: "resume" },
    { href: "/blog", label: "blog" },
  ];

  return (
    <nav className="absolute top-5 right-5 z-50">
      <ul className="flex items-center space-x-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 text-sm font-medium px-3 py-2 rounded-md"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
