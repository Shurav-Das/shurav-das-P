import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Protfolio.css";

const Portfolio = () => {
  // State Management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [selectedTrophy, setSelectedTrophy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [progressAnimations, setProgressAnimations] = useState({
    html: false,
    js: false,
    php: false,
    node: false
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Refs
  const skillsRef = useRef(null);
  const heroRef = useRef(null);

  // Navigation Data
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "certifications", label: "Certifications" },
    { id: "trophies", label: "Trophies" },
    { id: "contact", label: "Contact" }
  ];

  // Portfolio Data
  const portfolioItems = [
    {
      id: 1,
      title: "Shastho Surukha",
      description: "A dynamic healthcare information portal offering expert insights, service updates, and digital health innovations from the Shastho Surukha system.",
      category: "webdev",
      image: "/protfolio/dbms.png",
      tags: ["HTML", "CSS", "PHP", "MYSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "OVHIJAN – Your Global Path",
      description: "OVHIJAN is an AI-powered platform that helps students and professionals study, work, and settle abroad through personalized recommendations, success prediction, visa guidance, scholarship matching, and career opportunities—all in one place.",
      category: "webdev",
      image: "/protfolio/ovijan.jpg",
      tags: ["React", "Laravel", "MYSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Class Orbit",
      description: "A full-featured web-based Class Management System designed to help teachers and institutions efficiently manage classes, students, assignments, attendance, and grades. Includes an intuitive dashboard, student portal, and admin panel with real-time updates.",
      category: "webdev",
      image: "/protfolio/classorbit.jpg",
      tags: ["HTML", "CSS", "PHP", "MYSQL"],
      liveUrl: "#",
      githubUrl: "#"
    },

    {
      id: 4,
      title: "Plantify",
      description: "Plantify is an IoT-powered smart plant care system that monitors temperature, humidity, soil moisture, and other environmental conditions in real time. It also features an AI model that identifies plant leaf diseases from images and provides instant diagnosis, treatment recommendations, and plant care guidance to help users maintain healthy crops.",
      category: "ml",
      image: "/protfolio/plantify.jpeg",
      tags: ["ESP32", "ESP32CAM", "MQTT", "PHP", "MySQL", "JavaScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Shastho Surukha UI/UX",
      description: "A dynamic healthcare information portal offering expert insights, service updates, and digital health innovations from the Shastho Surukha system.",
      category: "uiux",
      image: "/protfolio/shastho_surukha_app.jpg",
      tags: ["FIGMA"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "PlateMate",
      description: "Fights food waste in Bangladesh by GPS-linking donors (homes/restaurants) to recipients (families/NGOs) for real-time donations or 50% off surprise bags.",
      category: "webdev",
      image: "/protfolio/platemate.png",
      tags: ["React Native", "Firebase", "Maps"],
      liveUrl: "#",
      githubUrl: "#"
    }



  ];

  // Certifications Data
const certifications = [
//   {
//   id: 1,
//   title: "Champion – UIU DBMS Project Show",
//   issuer: "United International University (UIU)",
//   description: "Achieved 1st place (Champion) at the UIU DBMS Project Show for developing an innovative database-driven software solution, demonstrating excellence in database design, implementation, and problem-solving.",
//   image: "../src/protfolio/ahv2.jpg",
//   date: "2024",
//   credentialId: "Champion",
//   skills: ["Database Design", "MySQL", "PHP", "Problem Solving", "Teamwork"]
// },
{
  id: 1,
  title: "Champion – UIU DBMS Project Show",
  issuer: "United International University (UIU)",
  description: "Achieved 1st place (Champion) at the UIU DBMS Project Show for developing an innovative database-driven software solution, demonstrating excellence in database design, implementation, and problem-solving.",
  image: "/protfolio/dbms_cr.jpg",
  date: "2024",
  credentialId: "Champion",
  skills: ["Database Design", "MySQL", "PHP", "Problem Solving", "Teamwork"]
},
{
  id: 2,
  title: "2nd Runner-up – MIST Inventious 4.1",
  issuer: "MIST Innovation Club, Military Institute of Science and Technology (MIST)",
  description: "Secured 2nd Runner-up at MIST Inventious 4.1 for presenting an innovative technology project, recognized for creativity, technical excellence, and real-world impact.",
  image: "/protfolio/mist_cr.jpg", // Replace with your certificate image
  date: "2025",
  credentialId: "2nd Runner-up",
  skills: ["Innovation", "Project Development", "Presentation", "Problem Solving", "Teamwork"]
}
];

  // Trophies/Awards Data
  const trophies = [
    {
      id: 1,
      title: "MIST INVENTIOUS 4.1 Award",
      description: "Team Phoenix the Firebird earned the prestigious Second Runner-up position in the Project Showcasing category at MIST INVENTIOUS 4.1, the national event hosted by the MIST Innovation Club. This milestone underscores our team's relentless dedication, collaborative ethos, and innovative drive.",
      image: "/protfolio/mist.jpg",
      category: "Second Runner-up",
      event: "MIST INVENTIOUS 4.1",
      date: "2025",
      organization: "MIST Innovation Club"
    },
    {
      id: 2,
      title: "UIU CSE Project Show 2025 — Champions",
      description: "Team Phoenix the Firebird secured the Champion position at the UIU CSE Project Show 2025, outperforming 140+ exceptional teams. This recognizes our Shastho Surukha project, a smart healthcare problem-solving system, reflecting teamwork, dedication, and mentorship guidance.",
      image: "/protfolio/dbms_cmp.png",
      category: "Champion",
      event: "UIU CSE Project Show 2025",
      date: "2024",
      organization: "United International University"
    },
    {
      id: 3,
      title: "Honored by VC — MIST INVENTIOUS 4.1",
      description: "Fatema Yesmin Maroya and I, as Team Phoenix the Firebird, secured the Second Runner-up position in the Project Showcasing category at MIST INVENTIOUS 4.1, reflecting our dedication, teamwork, and commitment to innovation. Special thanks to our Honorable Vice Chancellor, Professor Dr. Md. Abul Kashem Mia, and United International University for their support.",
      image: "/protfolio/mist_1.jpg",
      category: "Honor",
      event: "MIST INVENTIOUS 4.1",
      date: "2025",
      organization: "United International University"
    },

  ];

  // Skills Data
  const skills = [
    {
      name: "HTML & CSS",
      percentage: 90,
      description: "Building responsive, accessible web interfaces with modern styling techniques."
    },
    {
      name: "JavaScript",
      percentage: 85,
      description: "Crafting dynamic, interactive applications with efficient client-side logic."
    },
    {
      name: "PHP",
      percentage: 80,
      description: "Developing robust server-side applications and dynamic web solutions."
    },
    {
      name: "Node.js",
      percentage: 75,
      description: "Creating scalable, high-performance backend systems with JavaScript."
    }
  ];

  // Services Data
  const services = [
    {
      title: "Web Development",
      description: "Building responsive, high-performance websites tailored to your business goals.",
      features: ["React", "Node.js", "PHP", "MongoDB"]
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and visually stunning interfaces for seamless user experiences.",
      features: ["Figma", "Prototyping", "User Research", "Design Systems"]
    },
    {
      title: "Tech Consulting",
      description: "Offering strategic insights to optimize your digital strategy and workflows.",
      features: ["Strategy", "Architecture", "Optimization", "Innovation"]
    }
  ];

  // Mouse tracking for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize Particles.js
  useEffect(() => {
    const loadParticles = () => {
      if (window.particlesJS && document.getElementById('particles-js')) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#10B981'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.4,
              random: false
            },
            size: {
              value: 3,
              random: true
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#10B981',
              opacity: 0.3,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        });
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.async = true;
    script.onload = loadParticles;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Initialize AOS
  useEffect(() => {
    const loadAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1200,
          once: true,
          offset: 100
        });
      }
    };

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    script.async = true;
    script.onload = loadAOS;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const sections = navItems.map(item => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgressAnimations({
              html: true,
              js: true,
              php: true,
              node: true
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsCertModalOpen(false);
        setIsTrophyModalOpen(false);
        document.body.style.overflow = "auto";
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Handlers
  const handlePortfolioClick = (item) => {
    setSelectedPortfolio(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCertificationClick = (item) => {
    setSelectedCertification(item);
    setIsCertModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleTrophyClick = (item) => {
    setSelectedTrophy(item);
    setIsTrophyModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsCertModalOpen(false);
    setIsTrophyModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Thank you for subscribing!");
    e.target.email.value = "";
  };

  const getFilteredPortfolio = () => {
    if (activeFilter === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  };

  const getCategoryLabel = (category) => {
    const map = {
      webdev: "Web Development",
      uiux: "UI/UX Design",
      applications: "Applications",
      ml: "Machine Learning",
      mobile: "Mobile Apps",
      hardware: "Hardware Project"
    };
    return map[category] || category;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Icon Renderer - Only for icons that are actually needed
  const renderIcon = (name, className = "w-5 h-5") => {
    const iconMap = {
      download: (
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      ),
      eye: (
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
      'arrow-right': (
        <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
      ),
      calendar: (
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      ),
      building: (
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      ),
      'external-link': (
        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      ),
      'credit-card': (
        <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      ),
      send: (
        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      ),
      facebook: (
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      ),
      github: (
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      ),
      linkedin: (
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      ),
      twitter: (
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      ),
      mail: (
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      phone: (
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
      'map-pin': (
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      ),
      instagram: (
        <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4zm5-3a1 1 0 100 2 1 1 0 000-2z" />
      )
    };

    const strokeProps = {
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: "0 0 24 24"
    };

    return (
      <svg className={className} {...strokeProps}>
        {iconMap[name] || <path d="M12 2v20M2 12h20" />}
      </svg>
    );
  };

  return (
    <div className={`portfolio-container ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Custom Cursor */}
      <div
        className={`custom-cursor ${cursorVariant}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />

      {/* Navigation - Clean, no icons */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
              <svg className="brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#10B981" }} />
                    <stop offset="100%" style={{ stopColor: "#059669" }} />
                  </linearGradient>
                </defs>
                <path d="M12 2L3.5 7.5V16.5L12 22L20.5 16.5V7.5L12 2Z" fill="none" stroke="url(#gradient)" strokeWidth="1.5" />
                <path d="M7 16C7 18.5 9.5 19 12 19C14.5 19 17 18.5 17 16C17 14.5 15.5 14 12 14C8.5 14 7 13.5 7 12C7 9.5 9.5 9 12 9C14.5 9 17 9.5 17 12" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="brand-name">SHDX</span>
            </a>
          </div>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <div className="dark-mode-toggle-wrapper">
              <input
                type="checkbox"
                id="darkModeToggle"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="sr-only"
              />
              <label htmlFor="darkModeToggle" className="toggle">
                <span className="toggle-button">
                  <span className="crater crater-1"></span>
                  <span className="crater crater-2"></span>
                  <span className="crater crater-3"></span>
                  <span className="crater crater-4"></span>
                  <span className="crater crater-5"></span>
                  <span className="crater crater-6"></span>
                  <span className="crater crater-7"></span>
                </span>
                <span className="star star-1"></span>
                <span className="star star-2"></span>
                <span className="star star-3"></span>
                <span className="star star-4"></span>
                <span className="star star-5"></span>
                <span className="star star-6"></span>
                <span className="star star-7"></span>
                <span className="star star-8"></span>
              </label>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-inner">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - No icons here, just clean text */}
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-glow glow-1"></div>
          <div className="hero-glow glow-2"></div>
          <div id="particles-js" className="hero-particles-container"></div>
        </div>
        <div className="hero-content" data-aos="fade-up">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Open to Opportunities
          </div>
          <h1 className="hero-title">
            <span className="hero-name">Shurav Das</span>
            <span className="hero-subtitle">Innovative Web Developer</span>
          </h1>
          <p className="hero-description">
            BSc CSE Student at United International University<br />
            Building impactful solutions through technology
          </p>
          <div className="hero-actions">
            <a
              href="#portfolio"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); scrollToSection("portfolio"); }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Get In Touch
            </a>
          </div>
          <div className="hero-stats" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">7+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Trophies</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* About Section - No icons in headings */}
      <section id="about" className="section about-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">About Me</span>
            <h2 className="section-title">Who I Am</h2>
            <div className="section-divider"></div>
          </div>

          <div className="about-grid">
            <div className="about-image-wrapper" data-aos="fade-right" data-aos-delay="100">
              <div className="about-image-container">
                <img
                  src="/protfolio/profile.png"
                  alt="Shurav Das"
                  className="about-image"
                />
                <div className="about-image-overlay">
                  <div className="overlay-content">
                    <span className="overlay-text">Shurav Das</span>
                    <span className="overlay-subtext">Web Developer</span>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=61567636157017" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                  {renderIcon("facebook", "w-5 h-5")}
                </a>
                <a href="https://github.com/Shurav-Das" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  {renderIcon("github", "w-5 h-5")}
                </a>
                <a href="https://www.linkedin.com/in/shurav-das-b7837126b/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  {renderIcon("linkedin", "w-5 h-5")}
                </a>
                <a href="https://www.instagram.com/shuravdas2211/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                  {renderIcon("instagram", "w-5 h-5")}
                </a>
                <a href="mailto:your.email@example.com" className="social-link" aria-label="Email">
                  {renderIcon("mail", "w-5 h-5")}
                </a>
              </div>
            </div>

            <div className="about-content" data-aos="fade-left" data-aos-delay="200">
              <p className="about-text">
                I'm Shurav Das, a passionate web developer and BSc Computer Science student at United International University.
                With a strong foundation in HTML, CSS, JavaScript, PHP, and Java, I'm dedicated to building innovative applications
                that solve real-world problems. My journey in technology is driven by curiosity and a commitment to excellence.
              </p>

              <div className="about-info-grid">
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">25</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Nationality</span>
                  <span className="info-value">Bangladeshi</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Education</span>
                  <span className="info-value">BSc CSE (2022-Present)</span>
                </div>
                <div className="info-item">
                  <span className="info-label">University</span>
                  <span className="info-value">United International University</span>
                </div>
              </div>

              <div className="about-education">
                <h3 className="education-title">Education</h3>
                <div className="education-item">
                  <div className="education-content">
                    <h4 className="education-degree">BSc in Computer Science and Engineering</h4>
                    <p className="education-institution">United International University | 2022 – Present</p>
                    <p className="education-description">
                      Advanced technical skills with coursework in OOP (Java), Data Structures & Algorithms, AI, and Database Systems.
                    </p>
                  </div>
                </div>

                {showMoreContent && (
                  <>
                    <div className="education-item">
                      <div className="education-content">
                        <h4 className="education-degree">Higher Secondary Certificate (HSC)</h4>
                        <p className="education-institution">Dr. Mahbubur Rahman Mollah College | 2018 – 2020</p>
                        <p className="education-description">Achieved A+ (GPA 5.00), developing strong analytical skills.</p>
                      </div>
                    </div>
                    <div className="education-item">
                      <div className="education-content">
                        <h4 className="education-degree">Secondary School Certificate (SSC)</h4>
                        <p className="education-institution">A.K. High School & College | 2018</p>
                        <p className="education-description">Earned A+ (GPA 5.00) with a Science focus.</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="about-actions">
                  <a href="/protfolio/mycv.pdf" download="Shurav_Das_CV.pdf" className="btn-primary">
                    {renderIcon("download", "w-5 h-5 inline mr-2")}
                    Download CV
                  </a>
                  <button onClick={() => setShowMoreContent(!showMoreContent)} className="btn-outline">
                    {showMoreContent ? "See Less" : "See More"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Clean headings */}
      <section id="skills" ref={skillsRef} className="section skills-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">Expertise</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-divider"></div>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => {
              const animationKey = ["html", "js", "php", "node"][index];
              const isAnimated = progressAnimations[animationKey];
              return (
                <div key={index} className="skill-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <span className="skill-percentage">{isAnimated ? `${skill.percentage}%` : "0%"}</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      style={{
                        width: isAnimated ? `${skill.percentage}%` : "0%"
                      }}
                    ></div>
                  </div>
                  <p className="skill-description">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">What I Do</span>
            <h2 className="section-title">My Services</h2>
            <div className="section-divider"></div>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section portfolio-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">Portfolio</span>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider"></div>
          </div>

          <div className="portfolio-filters">
            {[
              { id: "all", label: "All Projects" },
              { id: "webdev", label: "Web Development" },
              { id: "uiux", label: "UI/UX Design" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "applications", label: "Applications" },
              { id: "ml", label: "Machine Learning" },
              { id: "hardware", label: "Hardware" }
            ].map((filter) => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {getFilteredPortfolio().map((item, index) => (
              <div
                key={item.id}
                className="portfolio-card"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                onClick={() => handlePortfolioClick(item)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="portfolio-image">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <span className="overlay-icon">{renderIcon("eye", "w-6 h-6")}</span>
                      <span className="overlay-text">View Project</span>
                    </div>
                  </div>
                  <div className="portfolio-tag">{getCategoryLabel(item.category)}</div>
                </div>
                <div className="portfolio-info">
                  <h3 className="portfolio-title">{item.title}</h3>
                  <p className="portfolio-description">{item.description}</p>
                  <div className="portfolio-tags">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section certifications-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">Credentials</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-divider"></div>
          </div>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="certification-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                onClick={() => handleCertificationClick(cert)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="certification-image-wrapper">
                  <img
                    src={cert.image || "https://via.placeholder.com/400x300/059669/ffffff?text=Certification"}
                    alt={cert.title}
                    className="certification-image"
                  />
                </div>
                <div className="certification-info">
                  <h3 className="certification-title">{cert.title}</h3>
                  <p className="certification-issuer">{cert.issuer}</p>
                  <p className="certification-date">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trophies Section */}
      <section id="trophies" className="section trophies-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">Achievements</span>
            <h2 className="section-title">Trophies & Awards</h2>
            <div className="section-divider"></div>
          </div>

          <div className="trophies-grid">
            {trophies.map((trophy, index) => (
              <div
                key={trophy.id}
                className="trophy-card"
                data-aos="flip-up"
                data-aos-delay={index * 100}
                onClick={() => handleTrophyClick(trophy)}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="trophy-image">
                  <img src={trophy.image || "https://via.placeholder.com/400x200/059669/ffffff?text=Trophy"} alt={trophy.title} />

                </div>
                <div className="trophy-info">
                  <h3 className="trophy-title">{trophy.title}</h3>
                  <p className="trophy-event">{trophy.event}</p>
                  <div className="trophy-meta">
                    <span className="trophy-date">
                      {renderIcon("calendar", "w-4 h-4 inline mr-1")}
                      {trophy.date}
                    </span>
                    <span className="trophy-org">
                      {renderIcon("building", "w-4 h-4 inline mr-1")}
                      {trophy.organization}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section" data-aos="fade-up">
        <div className="section-container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-badge">Get In Touch</span>
            <h2 className="section-title">Contact Me</h2>
            <div className="section-divider"></div>
          </div>

          <div className="contact-grid">
            <div className="contact-info" data-aos="fade-right" data-aos-delay="100">
              <div className="contact-info-card">
                <div className="contact-icon-wrapper">
                  {renderIcon("mail", "w-6 h-6")}
                </div>
                <div className="contact-info-content">
                  <h4>Email</h4>
                  <p>sdas223087@bscse.uiu.ac.bd</p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon-wrapper">
                  {renderIcon("phone", "w-6 h-6")}
                </div>
                <div className="contact-info-content">
                  <h4>Phone</h4>
                  <p>+880 1325-152991</p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon-wrapper">
                  {renderIcon("map-pin", "w-6 h-6")}
                </div>
                <div className="contact-info-content">
                  <h4>Location</h4>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="contact-social">
                <h4>Follow Me</h4>
                <div className="social-links">
                  <a href="https://www.facebook.com/profile.php?id=61567636157017" className="social-link">{renderIcon("facebook", "w-5 h-5")}</a>
                  <a href="https://github.com/Shurav-Das" className="social-link">{renderIcon("github", "w-5 h-5")}</a>
                  <a href="https://www.linkedin.com/in/shurav-das-b7837126b/" className="social-link">{renderIcon("linkedin", "w-5 h-5")}</a>
                  <a href="https://www.instagram.com/shuravdas2211/" className="social-link">{renderIcon("instagram", "w-5 h-5")}</a>
                </div>
              </div>
            </div>

            <form className="contact-form" data-aos="fade-left" data-aos-delay="200" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your message here..." required></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                {renderIcon("send", "w-5 h-5 inline mr-2")}
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-aos="fade-up">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-wrapper">
                <svg className="brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3.5 7.5V16.5L12 22L20.5 16.5V7.5L12 2Z" fill="none" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M7 16C7 18.5 9.5 19 12 19C14.5 19 17 18.5 17 16C17 14.5 15.5 14 12 14C8.5 14 7 13.5 7 12C7 9.5 9.5 9 12 9C14.5 9 17 9.5 17 12" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="brand-name">SHDX</span>
              </div>
              <p className="brand-description">
                Building innovative digital solutions with passion and precision.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-heading">Quick Links</h4>
              <ul>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4 className="footer-heading">Stay Updated</h4>
              <p>Subscribe for the latest updates and projects.</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input type="email" name="email" placeholder="Enter your email" required />
                <button type="submit">
                  {renderIcon("arrow-right", "w-4 h-4")}
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Shurav Das. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <span className="divider">|</span>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      {isModalOpen && selectedPortfolio && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedPortfolio.image} alt={selectedPortfolio.title} />
              </div>
              <div className="modal-info">
                <span className="modal-category">{getCategoryLabel(selectedPortfolio.category)}</span>
                <h2 className="modal-title">{selectedPortfolio.title}</h2>
                <p className="modal-description">{selectedPortfolio.description}</p>
                <div className="modal-tags">
                  {selectedPortfolio.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="modal-actions">
                  <a href={selectedPortfolio.liveUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
                    {renderIcon("external-link", "w-4 h-4 inline mr-2")}
                    Live Demo
                  </a>
                  <a href={selectedPortfolio.githubUrl} className="btn-outline" target="_blank" rel="noopener noreferrer">
                    {renderIcon("github", "w-4 h-4 inline mr-2")}
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {isCertModalOpen && selectedCertification && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedCertification.image || "https://via.placeholder.com/400x300/059669/ffffff?text=Certification"} alt={selectedCertification.title} />
              </div>
              <div className="modal-info">
                <span className="modal-category">Certification</span>
                <h2 className="modal-title">{selectedCertification.title}</h2>
                <p className="modal-issuer">{selectedCertification.issuer}</p>
                <p className="modal-description">{selectedCertification.description}</p>
                <div className="modal-meta">
                  <span className="meta-item">
                    {renderIcon("calendar", "w-4 h-4 inline mr-2")}
                    {selectedCertification.date}
                  </span>
                  <span className="meta-item">
                    {renderIcon("credit-card", "w-4 h-4 inline mr-2")}
                    {selectedCertification.credentialId}
                  </span>
                </div>
                <div className="modal-tags">
                  {selectedCertification.skills.map((skill, idx) => (
                    <span key={idx} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trophy Modal */}
      {isTrophyModalOpen && selectedTrophy && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedTrophy.image || "https://via.placeholder.com/400x300/059669/ffffff?text=Trophy"} alt={selectedTrophy.title} />
              </div>
              <div className="modal-info">
                <span className="modal-category">{selectedTrophy.category}</span>
                <h2 className="modal-title">{selectedTrophy.title}</h2>
                <p className="modal-description">{selectedTrophy.description}</p>
                <div className="modal-meta">
                  <span className="meta-item">
                    {renderIcon("calendar", "w-4 h-4 inline mr-2")}
                    {selectedTrophy.date}
                  </span>
                  <span className="meta-item">
                    {renderIcon("building", "w-4 h-4 inline mr-2")}
                    {selectedTrophy.organization}
                  </span>
                </div>
                <div className="modal-tags">
                  <span className="tag">{selectedTrophy.event}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;