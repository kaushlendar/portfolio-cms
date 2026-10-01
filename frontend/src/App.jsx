import "./App.css";

import { useEffect, useState } from "react";

import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";

function App() {
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [projects, setProjects] = useState([]);
    const [services, setServices] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [settings, setSettings] = useState(null);
    const [contactMessage, setContactMessage] = useState("");

    useEffect(() => {
        // ================= PROJECTS =================

        fetch("http://localhost:5000/api/projects")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setProjects(data.projects || []);
                }
            })
            .catch((error) => {
                console.error("Projects error:", error);
            });

        // ================= SKILLS =================

        fetch("http://localhost:5000/api/skills")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSkills(data.skills || []);
                }
            })
            .catch((error) => {
                console.error("Skills error:", error);
            });

        // ================= SERVICES =================

        fetch("http://localhost:5000/api/services")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setServices(data.services || []);
                }
            })
            .catch((error) => {
                console.error("Services error:", error);
            });

        // ================= EXPERIENCE =================

        fetch("http://localhost:5000/api/experience")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setExperiences(data.experiences || []);
                }
            })
            .catch((error) => {
                console.error("Experience error:", error);
            });

        // ================= BLOGS =================

        fetch("http://localhost:5000/api/blogs/published")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBlogs(data.blogs || []);
                }
            })
            .catch((error) => {
                console.error("Blogs error:", error);
            });

        // ================= BLOG DETAILS =================

        const blogSlug = window.location.pathname.startsWith("/blog/")
            ? window.location.pathname.split("/blog/")[1]
            : null;

        if (blogSlug) {
            fetch(
                `http://localhost:5000/api/blogs/slug/${blogSlug}`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setSelectedBlog(data.blog);
                    }
                })
                .catch((error) => {
                    console.error(
                        "Blog details error:",
                        error
                    );
                });
        }

        // ================= SETTINGS =================

        fetch("http://localhost:5000/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSettings(data.settings);
                }
            })
            .catch((error) => {
                console.error(
                    "Settings error:",
                    error
                );
            });
    }, []);

    // ================= CONTACT SUBMIT =================

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        setContactMessage("Sending...");

        try {
            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(contactForm)
                }
            );

            const data = await response.json();

            if (data.success) {
                setContactMessage(
                    "Message sent successfully!"
                );

                setContactForm({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                setContactMessage(
                    data.message ||
                        "Failed to send message"
                );
            }
        } catch (error) {
            console.error(
                "Contact error:",
                error
            );

            setContactMessage(
                "Server error. Please try again."
            );
        }
    };

    // Temporary Settings check
    console.log(
        "Portfolio Settings:",
        settings
    );

    /* ================= ADMIN ================= */

    if (window.location.pathname === "/admin") {
        const token = localStorage.getItem("token");

        if (!token) {
            return <AdminLogin />;
        }

        return <AdminDashboard />;
    }

    /* ================= BLOG DETAILS ================= */

    if (
        window.location.pathname.startsWith("/blog/")
    ) {
        if (!selectedBlog) {
            return (
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        color: "#374151"
                    }}
                >
                    Loading blog...
                </div>
            );
        }

        return (
            <div className="portfolio">
                <nav className="navbar">
                    <div className="nav-container">
                        <div className="logo">
                            Kaushlendar
                        </div>

                        <div className="nav-links">
                            <a href="/">
                                Home
                            </a>

                            <a href="/#about">
                                About
                            </a>

                            <a href="/#projects">
                                Projects
                            </a>

                            <a href="/#skills">
                                Skills
                            </a>

                            <a href="/#experience">
                                Experience
                            </a>

                            <a href="/#blog">
                                Blog
                            </a>

                            <a href="/#contact">
                                Contact
                            </a>
                        </div>
                    </div>
                </nav>

                <main
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "120px 20px 80px"
                    }}
                >
                    <article>
                        <div
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            <span className="blog-category">
                                {selectedBlog.category}
                            </span>
                        </div>

                        <h1
                            style={{
                                fontSize: "48px",
                                lineHeight: "1.2",
                                marginBottom: "20px",
                                color: "#111827"
                            }}
                        >
                            {selectedBlog.title}
                        </h1>

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                marginBottom: "30px",
                                color: "#6b7280",
                                fontSize: "14px"
                            }}
                        >
                            <span>
                                By{" "}
                                {selectedBlog.author ||
                                    "Admin"}
                            </span>

                            {selectedBlog.publishedAt && (
                                <span>
                                    {new Date(
                                        selectedBlog.publishedAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                        }
                                    )}
                                </span>
                            )}
                        </div>

                        {selectedBlog.coverImage && (
                            <img
                                src={
                                    selectedBlog.coverImage
                                }
                                alt={
                                    selectedBlog.title
                                }
                                style={{
                                    width: "100%",
                                    maxHeight: "500px",
                                    objectFit: "cover",
                                    borderRadius: "16px",
                                    marginBottom: "35px"
                                }}
                            />
                        )}

                        {selectedBlog.excerpt && (
                            <p
                                style={{
                                    fontSize: "20px",
                                    lineHeight: "1.7",
                                    color: "#4b5563",
                                    marginBottom: "30px",
                                    fontWeight: "500"
                                }}
                            >
                                {selectedBlog.excerpt}
                            </p>
                        )}

                        {selectedBlog.tags &&
                            selectedBlog.tags.length > 0 && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "8px",
                                        marginBottom: "35px"
                                    }}
                                >
                                    {selectedBlog.tags.map(
                                        (tag, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    background:
                                                        "#f3f4f6",
                                                    color:
                                                        "#374151",
                                                    padding:
                                                        "6px 10px",
                                                    borderRadius:
                                                        "6px",
                                                    fontSize:
                                                        "12px"
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        )
                                    )}
                                </div>
                            )}

                        <div
                            style={{
                                fontSize: "17px",
                                lineHeight: "1.9",
                                color: "#374151",
                                whiteSpace: "pre-wrap"
                            }}
                        >
                            {selectedBlog.content}
                        </div>

                        <div
                            style={{
                                marginTop: "50px"
                            }}
                        >
                            <a
                                href="/#blog"
                                className="btn secondary-btn"
                            >
                                ← Back to Blog
                            </a>
                        </div>
                    </article>
                </main>

                <footer className="footer">
                    <div className="footer-content">
                        <h3>
                            Kaushlendar Kumar
                        </h3>

                        <p>
                            Full Stack Developer •
                            BCA Graduate • MCA Student
                        </p>

                        <p className="copyright">
                            © 2026 Kaushlendar Kumar.
                            All Rights Reserved.
                        </p>
                    </div>
                </footer>
            </div>
        );
    }

    /* ================= MAIN PORTFOLIO ================= */

    return (
        <div className="portfolio">

            {/* ================= NAVBAR ================= */}

            <nav className="navbar">
                <div className="nav-container">

                    <div className="logo">
                        Kaushlendar
                    </div>

                    <div className="nav-links">

                        <a href="#home">
                            Home
                        </a>

                        <a href="#about">
                            About
                        </a>

                        <a href="#projects">
                            Projects
                        </a>

                        <a href="#skills">
                            Skills
                        </a>

                        <a href="#experience">
                            Experience
                        </a>

                        <a href="#blog">
                            Blog
                        </a>

                        <a href="#contact">
                            Contact
                        </a>

                    </div>
                </div>
            </nav>

            {/* ================= HOME ================= */}

            <section
                id="home"
                className="hero"
            >
                <div className="hero-content">

                    <div className="hero-text">

                        <p className="hero-small">
                            Hello, I'm
                        </p>
                            <h1>
                                {settings?.siteTitle || "Kaushlendar Kumar"}
                            </h1>

                            <h2>
                                {settings?.heroTitle || "Full Stack Developer"}
                            </h2>

                            <p className="hero-subtitle">
                                {settings?.tagline || "BCA Graduate • MCA Student"}
                            </p>
                        <p className="hero-description">
                            I create modern, responsive and
                            user-friendly web applications using
                            React, Node.js, Python and other
                            modern technologies.
                        </p>

                        <div className="hero-buttons">

                            <a
                                href="#projects"
                                className="btn primary-btn"
                            >
                                View Projects
                            </a>

                            <a
                                href="#contact"
                                className="btn secondary-btn"
                            >
                                Contact Me
                            </a>
                            {settings?.resumeUrl && (
    <a
        href={
            settings.resumeUrl.startsWith("http")
                ? settings.resumeUrl
                : `http://localhost:5000${settings.resumeUrl}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="btn secondary-btn"
    >
        View Resume
    </a>
)}

                        </div>
                    </div>

                    <div className="hero-image">

<img
    src={
        settings?.profileImage
            ? settings.profileImage.startsWith("http")
                ? settings.profileImage
                : `http://localhost:5000${settings.profileImage}`
            : "http://localhost:5000/uploads/1790315198191-586469568.jpg"
    }
    alt={settings?.siteTitle || "Kaushlendar Kumar"}
/>

                    </div>
                </div>
            </section>

{/* ================= ABOUT ================= */}

<section
    id="about"
    className="about"
>
    <div className="section-header">

        <p>
            ABOUT ME
        </p>

        <h2>
            Who I Am
        </h2>

    </div>

    <div className="about-content">

        <div className="about-text">

            <h3>
                I'm {settings?.siteTitle || "Kaushlendar Kumar"}
            </h3>

            <p>
                {settings?.aboutText ||
                    "I am a passionate Full Stack Developer and MCA Student from Bihar, India. I enjoy building modern and user-friendly web applications."}
            </p>

        </div>

        <div className="about-details">

            <div>
                <strong>
                    Education
                </strong>

                <span>
                    {settings?.tagline || "BCA Graduate • MCA Student"}
                </span>
            </div>

            <div>
                <strong>
                    Location
                </strong>

                <span>
                    {settings?.location || "Bihar, India"}
                </span>
            </div>

            <div>
                <strong>
                    Role
                </strong>

                <span>
                    {settings?.heroTitle || "Full Stack Developer"}
                </span>
            </div>

            <div>
                <strong>
                    Email
                </strong>

                <span>
                    {settings?.email ||
                        "kaushlendar9508594279@gmail.com"}
                </span>
            </div>

        </div>

    </div>

</section>

{/* ================= PROJECTS ================= */}

<section
    id="projects"
    className="about"
>
    <div className="section-header">

        <p>MY WORK</p>

        <h2>Projects</h2>

    </div>

    <div className="projects-grid">

        {projects.length === 0 ? (

            <p>No projects available.</p>

        ) : (

            projects.map((project) => (

                <div
                    className="project-card"
                    key={project._id}
                >

                    <div className="project-content">

                        {/* Project Image */}

                        {project.image && (

                            <div className="project-image">

                                <img
                                    src={
                                        project.image.startsWith("http")
                                            ? project.image
                                            : `http://localhost:5000${project.image}`
                                    }
                                    alt={project.title}
                                />

                            </div>

                        )}

                        {/* Project Title */}

                        <h3>
                            {project.title}
                        </h3>

                        {/* Project Description */}

                        <p>
                            {project.description}
                        </p>

                        {/* Technologies */}

                        {project.technologies &&
                            project.technologies.length > 0 && (

                                <div className="project-tech">

                                    {project.technologies.map(
                                        (tech, index) => (

                                            <span key={index}>
                                                {tech}
                                            </span>

                                        )
                                    )}

                                </div>

                            )}

                        {/* Project Buttons */}

                        {(project.liveUrl ||
                            project.githubUrl) && (

                            <div className="project-buttons">

                                {project.liveUrl && (

                                    <a
                                        href={project.liveUrl}
                                        className="btn primary-btn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Live Demo
                                    </a>

                                )}

                                {project.githubUrl && (

                                    <a
                                        href={project.githubUrl}
                                        className="btn secondary-btn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </a>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            ))

        )}

    </div>

</section>

 {/* ================= SKILLS ================= */}

<section
    id="skills"
    className="about"
>
    <div className="section-header">

        <p>
            MY EXPERTISE
        </p>

        <h2>
            Skills
        </h2>

    </div>

    <div className="skills-grid">

        {skills.length > 0 ? (

            Object.entries(
                skills.reduce((groups, skill) => {

                    if (!groups[skill.category]) {
                        groups[skill.category] = [];
                    }

                    groups[skill.category].push(skill);

                    return groups;

                }, {})
            ).map(([category, categorySkills]) => (

                <div
                    className="skill-card"
                    key={category}
                >

                    <h3>
                        {category}
                    </h3>

                    <div className="skill-list">

                        {categorySkills.map((skill) => (

                            <div
                                className="skill-item"
                                key={skill._id}
                            >

                                <span>
                                    {skill.name}
                                </span>

                                {skill.level > 0 && (

                                    <span className="skill-level">
                                        {skill.level}%
                                    </span>

                                )}

                            </div>

                        ))}

                    </div>

                </div>

            ))

        ) : (

            <p>
                No skills available.
            </p>

        )}

    </div>

</section>

{/* ================= SERVICES ================= */}

<section
    id="services"
    className="about"
>
    <div className="section-header">

        <p>
            WHAT I DO
        </p>

        <h2>
            Services
        </h2>

    </div>

    <div className="services-grid">

        {services.length === 0 ? (

            <p>
                No services available.
            </p>

        ) : (

            services.map((service) => (

                <div
                    className="service-card"
                    key={service._id}
                >

                    <div className="service-content">

                        {service.icon && (
                            <div className="service-icon">
                                {service.icon}
                            </div>
                        )}

                        <h3>
                            {service.title}
                        </h3>

                        <p>
                            {service.description}
                        </p>

                    </div>

                </div>

            ))

        )}

    </div>

</section>

            {/* ================= EXPERIENCE ================= */}

            <section
                id="experience"
                className="about"
            >

                <div className="section-header">

                    <p>
                        MY JOURNEY
                    </p>

                    <h2>
                        Experience
                    </h2>

                </div>

                <div className="experience-grid">

                    {experiences.length === 0 ? (

                        <p>
                            No experience available.
                        </p>

                    ) : (

                        experiences.map(
                            (experience) => (

                                <div
                                    className="experience-card"
                                    key={experience._id}
                                >

                                    <div className="experience-header">

                                        <div>

                                            <h3>
                                                {
                                                    experience.jobTitle
                                                }
                                            </h3>

                                            <p className="company-name">
                                                {
                                                    experience.company
                                                }
                                            </p>

                                        </div>

                                        <span className="experience-duration">

                                            {experience.startDate}
                                            {" – "}
                                            {experience.endDate}

                                        </span>

                                    </div>

                                    {experience.location && (

                                        <p className="experience-location">
                                            📍{" "}
                                            {experience.location}
                                        </p>

                                    )}

                                    {experience.employmentType && (

                                        <p className="experience-type">
                                            {
                                                experience.employmentType
                                            }
                                        </p>

                                    )}

                                    {experience.description && (

                                        <p className="experience-description">
                                            {
                                                experience.description
                                            }
                                        </p>

                                    )}

                                    {experience.technologies &&
                                        experience.technologies.length > 0 && (

                                            <div className="experience-skills">

                                                {experience.technologies.map(
                                                    (
                                                        technology,
                                                        index
                                                    ) => (

                                                        <span key={index}>
                                                            {technology}
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        )}

                                </div>

                            )
                        )

                    )}

                </div>

            </section>

{/* ================= BLOG ================= */}

<section
    id="blog"
    className="about"
>
    <div className="section-header">

        <p>
            MY ARTICLES
        </p>

        <h2>
            Blog
        </h2>

    </div>

    <div className="blog-grid">

        {blogs.length === 0 ? (

            <p>
                No blogs available.
            </p>

        ) : (

            blogs.map((blog) => (

                <article
                    className="blog-card"
                    key={blog._id}
                >

                    {/* Blog Cover Image */}

                    {blog.coverImage && (

                        <img
                            src={
                                blog.coverImage.startsWith("http")
                                    ? blog.coverImage
                                    : `http://localhost:5000${blog.coverImage}`
                            }
                            alt={blog.title}
                            className="blog-card-image"
                        />

                    )}

                    <div className="blog-content">

                        {/* Category */}

                        {blog.category && (

                            <span className="blog-category">
                                {blog.category}
                            </span>

                        )}

                        {/* Title */}

                        <h3>
                            {blog.title}
                        </h3>

                        {/* Excerpt */}

                        <p>
                            {blog.excerpt}
                        </p>

                        {/* Tags */}

                        {blog.tags &&
                            blog.tags.length > 0 && (

                                <div className="blog-card-tags">

                                    {blog.tags.map(
                                        (tag, index) => (

                                            <span
                                                key={index}
                                            >
                                                {tag}
                                            </span>

                                        )
                                    )}

                                </div>

                            )}

                        {/* Footer */}

                        <div className="blog-card-footer">

                            <span>
                                By{" "}
                                {blog.author || "Admin"}
                            </span>

                            <a
                                href={`/blog/${blog.slug}`}
                                className="blog-link"
                            >
                                Read More →
                            </a>

                        </div>

                    </div>

                </article>

            ))

        )}

    </div>

</section>
{/* ================= CONTACT ================= */}

<section
    id="contact"
    className="about"
>
    <div className="section-header">

        <p>
            GET IN TOUCH
        </p>

        <h2>
            Contact Me
        </h2>

    </div>

    <div className="contact-content">

        {/* Contact Information */}

        <div className="contact-info">

            <h3>
                Let's Work Together
            </h3>

            <p>
                I am open to opportunities,
                internships and projects.
                Feel free to contact me for
                any professional opportunity.
            </p>

            <div className="contact-item">

                <strong>
                    Email
                </strong>

                <span>
                    {settings?.email ||
                        "kaushlendar9508594279@gmail.com"}
                </span>

            </div>

            <div className="contact-item">

                <strong>
                    Location
                </strong>

                <span>
                    {settings?.location ||
                        "Bihar, India"}
                </span>

            </div>

            {settings?.phone && (

                <div className="contact-item">

                    <strong>
                        Phone
                    </strong>

                    <span>
                        {settings.phone}
                    </span>

                </div>

            )}

        </div>

        {/* Contact Form */}

        <form
            className="contact-form"
            onSubmit={handleContactSubmit}
        >

            <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) =>
                    setContactForm({
                        ...contactForm,
                        name: e.target.value
                    })
                }
                required
            />

            <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) =>
                    setContactForm({
                        ...contactForm,
                        email: e.target.value
                    })
                }
                required
            />

            <input
                type="text"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(e) =>
                    setContactForm({
                        ...contactForm,
                        subject: e.target.value
                    })
                }
                required
            />

            <textarea
                placeholder="Your Message"
                rows="6"
                value={contactForm.message}
                onChange={(e) =>
                    setContactForm({
                        ...contactForm,
                        message: e.target.value
                    })
                }
                required
            />

            <button
                type="submit"
                className="btn primary-btn"
            >
                Send Message
            </button>

            {contactMessage && (

                <p className="contact-message">
                    {contactMessage}
                </p>

            )}

        </form>

    </div>

</section>
{/* ================= FOOTER ================= */}

<footer className="footer">

    <div className="footer-content">

        {/* Name */}

        <h3>
            {settings?.siteTitle || "Kaushlendar Kumar"}
        </h3>

        {/* Role + Tagline */}

        <p>
            {settings?.heroTitle || "Full Stack Developer"} •{" "}
            {settings?.tagline || "BCA Graduate • MCA Student"}
        </p>

        {/* Footer Navigation */}

        <div className="footer-links">

            <a href="#home">
                Home
            </a>

            <a href="#about">
                About
            </a>

            <a href="#projects">
                Projects
            </a>

            <a href="#skills">
                Skills
            </a>

            <a href="#blog">
                Blog
            </a>

            <a href="#contact">
                Contact
            </a>

        </div>

        {/* Social Links */}

        <div className="social-links">

            {settings?.githubUrl && (

                <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>

            )}

            {settings?.linkedinUrl && (

                <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>

            )}

            {settings?.instagramUrl && (

                <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Instagram
                </a>

            )}

        </div>

        {/* Copyright */}

        <p className="copyright">

            © {new Date().getFullYear()}{" "}

            {settings?.siteTitle || "Kaushlendar Kumar"}.

            All Rights Reserved.

        </p>

    </div>

</footer>

</div>
);

}

export default App;