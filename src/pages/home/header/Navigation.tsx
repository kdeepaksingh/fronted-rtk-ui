const Navigation = () => {
  <div className="min-h-screen flex flex-col font-sans">
    <header className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white">
      <div className="text-2xl font-bold">EmpManage</div>
      <nav className="space-x-6 hidden md:block">
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </nav>
      <div>
        <a
          href="/login"
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          Login
        </a>
      </div>
    </header>
  </div>;
};

export default Navigation;
