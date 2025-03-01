import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiCalendar,
  FiMapPin,
  FiExternalLink,
  FiArrowRight,
} from "react-icons/fi";

function App() {
  const currentYear = new Date().getFullYear();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Yashraj Pahwa | Software Engineer</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Full-stack developer and cloud architect building scalable solutions. Portfolio of Yashraj Pahwa - Open source contributor and technical lead."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div
        className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-inter antialiased transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Modern nav bar */}
        <nav className="bg-white shadow-sm py-4 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-80">
          <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
            <div className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              YP
            </div>
            <div className="flex space-x-6">
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Skills
              </a>
            </div>
          </div>
        </nav>

        {/* Header with subtle pattern */}
        <header className="bg-white py-16 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0 text-center md:text-left transform transition-all duration-500 translate-y-0 opacity-100">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Yashraj Singh Pahwa
                </h1>
                <p className="text-xl text-gray-600 font-medium mb-6">
                  Building Scalable Solutions
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                  <a
                    href="#projects"
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all transform hover:translate-y-[-2px]"
                  >
                    View Projects <FiArrowRight className="ml-2" />
                  </a>
                  <a
                    href="mailto:ypahwa_be24@thapar.edu"
                    className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-300 hover:border-blue-600 text-gray-700 font-medium hover:text-blue-600 transition-all transform hover:translate-y-[-2px]"
                  >
                    Contact Me <FiMail className="ml-2" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end space-y-4">
                <div className="flex items-center space-x-2 group">
                  <FiMail className="text-gray-500 group-hover:text-blue-600 transition-colors" />
                  <a
                    href="mailto:ypahwa_be24@thapar.edu"
                    className="hover:text-blue-600 transition-colors"
                  >
                    ypahwa_be24@thapar.edu
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://linkedin.com/in/yashrajpahwa"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <FiLinkedin className="mr-2 group-hover:scale-110 transition-transform" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/yashrajpahwa"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center px-4 py-2 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                  >
                    <FiGithub className="mr-2 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 pb-16 space-y-16">
          {/* About Section */}
          <section
            id="about"
            className="bg-white rounded-2xl p-8 shadow-lg transform transition-all hover:shadow-xl"
          >
            <div className="flex items-center mb-6">
              <span className="w-10 h-1 bg-blue-600 rounded-full mr-3"></span>
              <h2 className="text-2xl font-semibold">About Me</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              Full-stack developer and cloud architect with a passion for
              building scalable, maintainable systems. Specializing in
              product-focused solutions using modern technologies and ensuring
              excellent user experiences. Open source contributor and technical
              lead with a background in managing cross-functional teams.
            </p>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="bg-white rounded-2xl p-8 shadow-lg transform transition-all hover:shadow-xl"
          >
            <div className="flex items-center mb-8">
              <span className="w-10 h-1 bg-blue-600 rounded-full mr-3"></span>
              <h2 className="text-2xl font-semibold">Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2 relative hover:bg-blue-50 rounded-r-lg transition-colors">
                <div className="absolute -left-2.5 top-0 w-5 h-5 bg-white rounded-full border-4 border-blue-600"></div>
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Project Intern
                    </h3>
                    <p className="text-gray-600">
                      Thapar Institute of Engineering &amp; Technology
                    </p>
                  </div>
                  <div className="text-blue-600 font-medium text-sm flex items-center mt-1 md:mt-0 md:bg-blue-50 md:px-4 md:py-1 md:rounded-full">
                    <FiCalendar className="mr-2" /> Jan 2024 – Present
                  </div>
                </div>
                <ul className="mt-4 space-y-3 text-gray-600">
                  {[
                    "Led development of a centralized placement portal handling 10,000+ student profiles",
                    "Implemented Google Sign-In with Firebase Auth, reducing authentication time by 10%",
                    "Designed a serverless cloud architecture with real-time monitoring",
                    "Optimized frontend performance achieving 95+ Lighthouse score",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="text-blue-600 mr-3 mt-1 group-hover:scale-110 transition-transform">
                        ▹
                      </span>
                      <span className="group-hover:text-gray-800 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            className="bg-white rounded-2xl p-8 shadow-lg transform transition-all hover:shadow-xl"
          >
            <div className="flex items-center mb-8">
              <span className="w-10 h-1 bg-blue-600 rounded-full mr-3"></span>
              <h2 className="text-2xl font-semibold">Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm h-full hover:shadow-md transition-all transform group-hover:translate-y-[-5px]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Plexus – Placement Portal
                      </h3>
                      <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Oct'24 – Present
                      </span>
                    </div>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-600 p-1"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Streamlines placements for 10,000+ students by centralizing
                    profiles with role-based access and integrated job
                    applications.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["React", "Node", "Firebase", "AWS"].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium bg-white text-gray-600 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm h-full hover:shadow-md transition-all transform group-hover:translate-y-[-5px]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Thapar Timetable
                      </h3>
                      <span className="inline-block text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Aug'24 – Dec'24
                      </span>
                    </div>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-600 p-1"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Improved UX by enabling local saving of course names,
                    eliminating repetitive subject code references via DOM
                    manipulation.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["JavaScript", "Chrome API", "DOM", "LocalStorage"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium bg-white text-gray-600 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            className="bg-white rounded-2xl p-8 shadow-lg transform transition-all hover:shadow-xl"
          >
            <div className="flex items-center mb-8">
              <span className="w-10 h-1 bg-blue-600 rounded-full mr-3"></span>
              <h2 className="text-2xl font-semibold">Technical Skills</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  category: "Languages",
                  items: ["JavaScript", "C", "Go", "Python"],
                  icon: "💻",
                },
                {
                  category: "Frontend",
                  items: ["React", "Next.js", "Tailwind CSS"],
                  icon: "🎨",
                },
                {
                  category: "Backend",
                  items: ["Node.js", "Express", "GraphQL"],
                  icon: "⚙️",
                },
                {
                  category: "Cloud",
                  items: ["AWS", "Digital Ocean", "Cloudflare"],
                  icon: "☁️",
                },
                {
                  category: "Databases",
                  items: ["PostgreSQL", "MongoDB", "Redis"],
                  icon: "🗃️",
                },
                {
                  category: "DevOps",
                  items: ["Docker", "Git", "CI/CD"],
                  icon: "🔄",
                },
              ].map((group, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">{group.icon}</span>
                    {group.category}
                  </h3>
                  <div className="space-y-2">
                    {group.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer with subtle pattern */}
        <footer className="bg-white py-8 border-t border-gray-200 relative">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <div className="mb-4">
              <a
                href="#"
                className="inline-block font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
              >
                YP
              </a>
            </div>
            <div className="mb-4 flex justify-center space-x-6">
              <a
                href="https://linkedin.com/in/yashrajpahwa"
                className="text-gray-500 hover:text-blue-600"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://github.com/yashrajpahwa"
                className="text-gray-500 hover:text-blue-600"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="mailto:ypahwa_be24@thapar.edu"
                className="text-gray-500 hover:text-blue-600"
              >
                <FiMail size={20} />
              </a>
            </div>
            <p className="text-gray-500">
              © {currentYear} Yashraj Singh Pahwa. All rights reserved.
            </p>
          </div>
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
        </footer>
      </div>
    </>
  );
}

export default App;
