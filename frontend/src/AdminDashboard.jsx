import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const API_URL = "https://portfolio-cms-backend-03gt.onrender.com";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [projects, setProjects] = useState([]);

    const [skills, setSkills] = useState([]);
    const [showSkillForm, setShowSkillForm] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState(null);

    const [skillName, setSkillName] = useState("");
    const [skillCategory, setSkillCategory] = useState("Other");
    const [skillLevel, setSkillLevel] = useState(0);
    const [skillIcon, setSkillIcon] = useState("");
    const [skillOrder, setSkillOrder] = useState(0);

    const [skillLoading, setSkillLoading] = useState(false);
    const [skillDeleteLoading, setSkillDeleteLoading] = useState(false);

    const [experiences, setExperiences] = useState([]);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [editingExperienceId, setEditingExperienceId] = useState(null);

    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [employmentType, setEmploymentType] = useState("Full Time");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("Present");
    const [experienceDescription, setExperienceDescription] = useState("");
    const [experienceTechnologies, setExperienceTechnologies] = useState("");
    const [experienceOrder, setExperienceOrder] = useState(0);

    const [experienceLoading, setExperienceLoading] = useState(false);
    const [experienceDeleteLoading, setExperienceDeleteLoading] = useState(false);

    const [services, setServices] = useState([]);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [editingServiceId, setEditingServiceId] = useState(null);

    const [serviceTitle, setServiceTitle] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceIcon, setServiceIcon] = useState("");
    const [serviceTechnologies, setServiceTechnologies] = useState("");
    const [serviceFeatured, setServiceFeatured] = useState(false);
    const [serviceOrder, setServiceOrder] = useState(0);

    const [serviceLoading, setServiceLoading] = useState(false);
    const [serviceDeleteLoading, setServiceDeleteLoading] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingBlogId, setEditingBlogId] = useState(null);

    const [blogTitle, setBlogTitle] = useState("");
    const [blogSlug, setBlogSlug] = useState("");
    const [blogExcerpt, setBlogExcerpt] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogCoverImage, setBlogCoverImage] = useState("");
    const [blogCategory, setBlogCategory] = useState("General");
    const [blogTags, setBlogTags] = useState("");
    const [blogPublished, setBlogPublished] = useState(false);
    const [blogAuthor, setBlogAuthor] = useState("");
    const [blogOrder, setBlogOrder] = useState(0);

    const [blogLoading, setBlogLoading] = useState(false);
    const [blogDeleteLoading, setBlogDeleteLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const [image, setImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const token = localStorage.getItem("token");

    const [contacts, setContacts] = useState([]);
    const [contactLoading, setContactLoading] = useState(false);

    const [settings, setSettings] = useState(null);
    const [settingsLoading, setSettingsLoading] = useState(false);

    const [settingsForm, setSettingsForm] = useState({
        siteTitle: "",
        tagline: "",
        heroTitle: "",
        location: "",
        email: "",
        phone: "",
        aboutText: "",
        profileImage: "",
        resumeUrl: "",
        githubUrl: "",
        linkedinUrl: "",
        instagramUrl: ""
    });

    /* =========================
       DASHBOARD
    ========================= */

    const loadDashboard = async () => {
        try {
            const statsResponse = await fetch(
                `${API_URL}/api/dashboard/stats`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const statsData = await statsResponse.json();

            if (statsData.success) {
                setStats(statsData.stats);
            }

            const projectsResponse = await fetch(
                `${API_URL}/api/projects`
            );

            const projectsData = await projectsResponse.json();

            if (projectsData.success) {
                setProjects(projectsData.projects || []);
            }
        } catch (error) {
            console.error("Dashboard error:", error);
        }
    };

    /* =========================
       SKILLS
    ========================= */

    const loadSkills = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/skills`
            );

            const data = await response.json();

            if (data.success) {
                setSkills(data.skills || []);
            }
        } catch (error) {
            console.error("Skills error:", error);
        }
    };

    const clearSkillForm = () => {
        setEditingSkillId(null);
        setSkillName("");
        setSkillCategory("Other");
        setSkillLevel(0);
        setSkillIcon("");
        setSkillOrder(0);
    };

    const addSkill = async () => {
        if (!skillName.trim()) {
            alert("Please enter skill name");
            return;
        }

        setSkillLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/skills`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: skillName,
                        category: skillCategory,
                        level: Number(skillLevel),
                        icon: skillIcon,
                        order: Number(skillOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Skill added successfully");

                clearSkillForm();
                setShowSkillForm(false);

                loadSkills();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to add skill"
                );
            }
        } catch (error) {
            console.error("Add skill error:", error);
            alert("Server error");
        } finally {
            setSkillLoading(false);
        }
    };

    const startEditSkill = (skill) => {
        setEditingSkillId(skill._id);
        setSkillName(skill.name || "");
        setSkillCategory(skill.category || "Other");
        setSkillLevel(skill.level || 0);
        setSkillIcon(skill.icon || "");
        setSkillOrder(skill.order || 0);

        setShowSkillForm(true);
    };

    const updateSkill = async () => {
        if (!skillName.trim()) {
            alert("Please enter skill name");
            return;
        }

        setSkillLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/skills/${editingSkillId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: skillName,
                        category: skillCategory,
                        level: Number(skillLevel),
                        icon: skillIcon,
                        order: Number(skillOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Skill updated successfully");

                clearSkillForm();
                setShowSkillForm(false);

                loadSkills();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to update skill"
                );
            }
        } catch (error) {
            console.error("Update skill error:", error);
            alert("Server error");
        } finally {
            setSkillLoading(false);
        }
    };

    const deleteSkill = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmDelete) {
            return;
        }

        setSkillDeleteLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/skills/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Skill deleted successfully");

                loadSkills();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to delete skill"
                );
            }
        } catch (error) {
            console.error("Delete skill error:", error);
            alert("Server error");
        } finally {
            setSkillDeleteLoading(false);
        }
    };

    /* =========================
       EXPERIENCE
    ========================= */

    const loadExperiences = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/experience`
            );

            const data = await response.json();

            if (data.success) {
                setExperiences(data.experiences || []);
            }
        } catch (error) {
            console.error("Experiences error:", error);
        }
    };

    const clearExperienceForm = () => {
        setEditingExperienceId(null);
        setJobTitle("");
        setCompany("");
        setLocation("");
        setEmploymentType("Full Time");
        setStartDate("");
        setEndDate("Present");
        setExperienceDescription("");
        setExperienceTechnologies("");
        setExperienceOrder(0);
    };

    const addExperience = async () => {
        if (!jobTitle.trim()) {
            alert("Please enter job title");
            return;
        }

        if (!company.trim()) {
            alert("Please enter company name");
            return;
        }

        if (!startDate.trim()) {
            alert("Please enter start date");
            return;
        }

        setExperienceLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/experience`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        jobTitle,
                        company,
                        location,
                        employmentType,
                        startDate,
                        endDate,
                        description: experienceDescription,
                        technologies: experienceTechnologies
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        order: Number(experienceOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Experience added successfully");

                clearExperienceForm();
                setShowExperienceForm(false);

                loadExperiences();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to add experience"
                );
            }
        } catch (error) {
            console.error(
                "Add experience error:",
                error
            );

            alert("Server error");
        } finally {
            setExperienceLoading(false);
        }
    };

    const startEditExperience = (experience) => {
        setEditingExperienceId(experience._id);

        setJobTitle(experience.jobTitle || "");
        setCompany(experience.company || "");
        setLocation(experience.location || "");

        setEmploymentType(
            experience.employmentType || "Full Time"
        );

        setStartDate(experience.startDate || "");
        setEndDate(experience.endDate || "Present");

        setExperienceDescription(
            experience.description || ""
        );

        setExperienceTechnologies(
            (experience.technologies || []).join(", ")
        );

        setExperienceOrder(
            experience.order || 0
        );

        setShowExperienceForm(true);
    };

    const updateExperience = async () => {
        if (!jobTitle.trim()) {
            alert("Please enter job title");
            return;
        }

        if (!company.trim()) {
            alert("Please enter company name");
            return;
        }

        if (!startDate.trim()) {
            alert("Please enter start date");
            return;
        }

        setExperienceLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/experience/${editingExperienceId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        jobTitle,
                        company,
                        location,
                        employmentType,
                        startDate,
                        endDate,
                        description: experienceDescription,
                        technologies: experienceTechnologies
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        order: Number(experienceOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Experience updated successfully");

                clearExperienceForm();
                setShowExperienceForm(false);

                loadExperiences();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to update experience"
                );
            }
        } catch (error) {
            console.error(
                "Update experience error:",
                error
            );

            alert("Server error");
        } finally {
            setExperienceLoading(false);
        }
    };

    const deleteExperience = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmDelete) {
            return;
        }

        setExperienceDeleteLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/experience/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Experience deleted successfully");

                loadExperiences();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to delete experience"
                );
            }
        } catch (error) {
            console.error(
                "Delete experience error:",
                error
            );

            alert("Server error");
        } finally {
            setExperienceDeleteLoading(false);
        }
    };

    /* =========================
       SERVICES
    ========================= */

    const loadServices = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/services`
            );

            const data = await response.json();

            if (data.success) {
                setServices(data.services || []);
            }
        } catch (error) {
            console.error(
                "Services error:",
                error
            );
        }
    };

    const clearServiceForm = () => {
        setEditingServiceId(null);
        setServiceTitle("");
        setServiceDescription("");
        setServiceIcon("");
        setServiceTechnologies("");
        setServiceFeatured(false);
        setServiceOrder(0);
    };

    const addService = async () => {
        if (!serviceTitle.trim()) {
            alert("Please enter service title");
            return;
        }

        if (!serviceDescription.trim()) {
            alert("Please enter service description");
            return;
        }

        setServiceLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/services`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: serviceTitle,
                        description: serviceDescription,
                        icon: serviceIcon,
                        technologies: serviceTechnologies
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        featured: serviceFeatured,
                        order: Number(serviceOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Service added successfully");

                clearServiceForm();
                setShowServiceForm(false);

                loadServices();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to add service"
                );
            }
        } catch (error) {
            console.error(
                "Add service error:",
                error
            );

            alert("Server error");
        } finally {
            setServiceLoading(false);
        }
    };

    const startEditService = (service) => {
        setEditingServiceId(service._id);

        setServiceTitle(service.title || "");
        setServiceDescription(
            service.description || ""
        );

        setServiceIcon(service.icon || "");

        setServiceTechnologies(
            (service.technologies || []).join(", ")
        );

        setServiceFeatured(
            service.featured || false
        );

        setServiceOrder(
            service.order || 0
        );

        setShowServiceForm(true);
    };

    const updateService = async () => {
        if (!serviceTitle.trim()) {
            alert("Please enter service title");
            return;
        }

        if (!serviceDescription.trim()) {
            alert("Please enter service description");
            return;
        }

        setServiceLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/services/${editingServiceId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: serviceTitle,
                        description: serviceDescription,
                        icon: serviceIcon,
                        technologies: serviceTechnologies
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean),
                        featured: serviceFeatured,
                        order: Number(serviceOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Service updated successfully");

                clearServiceForm();
                setShowServiceForm(false);

                loadServices();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to update service"
                );
            }
        } catch (error) {
            console.error(
                "Update service error:",
                error
            );

            alert("Server error");
        } finally {
            setServiceLoading(false);
        }
    };

    const deleteService = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmDelete) {
            return;
        }

        setServiceDeleteLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/services/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Service deleted successfully");

                loadServices();
                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to delete service"
                );
            }
        } catch (error) {
            console.error(
                "Delete service error:",
                error
            );

            alert("Server error");
        } finally {
            setServiceDeleteLoading(false);
        }
    };

    /* =========================
       BLOGS
    ========================= */

    const loadBlogs = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/blogs`
            );

            const data = await response.json();

            if (data.success) {
                setBlogs(data.blogs || []);
            }
        } catch (error) {
            console.error(
                "Blogs error:",
                error
            );
        }
    };

    const clearBlogForm = () => {
        setBlogTitle("");
        setBlogSlug("");
        setBlogExcerpt("");
        setBlogContent("");
        setBlogCoverImage("");
        setBlogCategory("General");
        setBlogTags("");
        setBlogPublished(false);
        setBlogAuthor("");
        setBlogOrder(0);
        setEditingBlogId(null);
    };

    const addBlog = async () => {
        try {
            setBlogLoading(true);

            const response = await fetch(
                `${API_URL}/api/blogs`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: blogTitle,
                        slug: blogSlug,
                        excerpt: blogExcerpt,
                        content: blogContent,
                        coverImage: blogCoverImage,
                        category: blogCategory,
                        tags: blogTags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        published: blogPublished,
                        publishedAt: blogPublished
                            ? new Date()
                            : null,
                        author: blogAuthor,
                        order: Number(blogOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                await loadBlogs();

                clearBlogForm();
                setShowBlogForm(false);
            } else {
                alert(
                    data.message ||
                    "Failed to add blog"
                );
            }
        } catch (error) {
            console.error(
                "Add blog error:",
                error
            );

            alert("Server error");
        } finally {
            setBlogLoading(false);
        }
    };

    const startEditBlog = (blog) => {
        setEditingBlogId(blog._id);

        setBlogTitle(blog.title || "");
        setBlogSlug(blog.slug || "");
        setBlogExcerpt(blog.excerpt || "");
        setBlogContent(blog.content || "");
        setBlogCoverImage(blog.coverImage || "");
        setBlogCategory(blog.category || "General");

        setBlogTags(
            blog.tags
                ? blog.tags.join(", ")
                : ""
        );

        setBlogPublished(
            blog.published || false
        );

        setBlogAuthor(
            blog.author || ""
        );

        setBlogOrder(
            blog.order || 0
        );

        setShowBlogForm(true);
    };

    const updateBlog = async () => {
        try {
            setBlogLoading(true);

            const response = await fetch(
                `${API_URL}/api/blogs/${editingBlogId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: blogTitle,
                        slug: blogSlug,
                        excerpt: blogExcerpt,
                        content: blogContent,
                        coverImage: blogCoverImage,
                        category: blogCategory,
                        tags: blogTags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean),
                        published: blogPublished,
                        publishedAt: blogPublished
                            ? new Date()
                            : null,
                        author: blogAuthor,
                        order: Number(blogOrder)
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                await loadBlogs();

                clearBlogForm();
                setShowBlogForm(false);
            } else {
                alert(
                    data.message ||
                    "Failed to update blog"
                );
            }
        } catch (error) {
            console.error(
                "Update blog error:",
                error
            );

            alert("Server error");
        } finally {
            setBlogLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setBlogDeleteLoading(true);

            const response = await fetch(
                `${API_URL}/api/blogs/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                await loadBlogs();
            } else {
                alert(
                    data.message ||
                    "Failed to delete blog"
                );
            }
        } catch (error) {
            console.error(
                "Delete blog error:",
                error
            );

            alert("Server error");
        } finally {
            setBlogDeleteLoading(false);
        }
    };

    /* =========================
       CONTACTS
    ========================= */

    const loadContacts = async () => {
        try {
            setContactLoading(true);

            const response = await fetch(
                `${API_URL}/api/contact`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setContacts(data.contacts || []);
            } else {
                alert(
                    data.message ||
                    "Failed to load contacts"
                );
            }
        } catch (error) {
            console.error(
                "Contacts error:",
                error
            );

            alert(
                "Server error while loading contacts"
            );
        } finally {
            setContactLoading(false);
        }
    };

    const updateContactStatus = async (id, status) => {
        try {
            const response = await fetch(
                `${API_URL}/api/contact/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        status
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                setContacts((prevContacts) =>
                    prevContacts.map((contact) =>
                        contact._id === id
                            ? {
                                ...contact,
                                status: data.contact.status
                            }
                            : contact
                    )
                );

                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to update contact status"
                );
            }
        } catch (error) {
            console.error(
                "Update contact status error:",
                error
            );

            alert(
                "Server error while updating contact"
            );
        }
    };

    const deleteContact = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/contact/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setContacts((prevContacts) =>
                    prevContacts.filter(
                        (contact) =>
                            contact._id !== id
                    )
                );

                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to delete contact"
                );
            }
        } catch (error) {
            console.error(
                "Delete contact error:",
                error
            );

            alert("Server error");
        }
    };

    /* =========================
       SETTINGS
    ========================= */

    const loadSettings = async () => {
        try {
            setSettingsLoading(true);

            const response = await fetch(
                `${API_URL}/api/settings`
            );

            const data = await response.json();

            if (data.success) {
                setSettings(data.settings);
                setSettingsForm(data.settings);
            } else {
                alert(
                    data.message ||
                    "Failed to load settings"
                );
            }
        } catch (error) {
            console.error(
                "Settings error:",
                error
            );

            alert(
                "Server error while loading settings"
            );
        } finally {
            setSettingsLoading(false);
        }
    };

    const updateSettings = async () => {
        try {
            setSettingsLoading(true);

            const response = await fetch(
                `${API_URL}/api/settings`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(settingsForm)
                }
            );

            const data = await response.json();

            if (data.success) {
                setSettings(data.settings);
                setSettingsForm(data.settings);

                alert(
                    "Settings updated successfully"
                );
            } else {
                alert(
                    data.message ||
                    "Failed to update settings"
                );
            }
        } catch (error) {
            console.error(
                "Update settings error:",
                error
            );

            alert(
                "Server error while updating settings"
            );
        } finally {
            setSettingsLoading(false);
        }
    };

    /* =========================
       PROJECTS
    ========================= */

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setTechnologies("");
        setLiveUrl("");
        setGithubUrl("");

        setImage("");
        setSelectedImage(null);
        setImagePreview("");

        setEditingProjectId(null);
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            return image;
        }

        setImageLoading(true);

        try {
            const formData = new FormData();

            formData.append(
                "file",
                selectedImage
            );

            const response = await fetch(
                `${API_URL}/api/upload`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            if (data.success) {
                setImage(data.file.url);

                return data.file.url;
            } else {
                alert(
                    data.message ||
                    "Image upload failed"
                );

                return null;
            }
        } catch (error) {
            console.error(
                "Image upload error:",
                error
            );

            alert("Image upload failed");

            return null;
        } finally {
            setImageLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert(
                "Please select an image file"
            );

            event.target.value = "";

            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert(
                "Image size must be less than 5MB"
            );

            event.target.value = "";

            return;
        }

        setSelectedImage(file);

        setImagePreview(
            URL.createObjectURL(file)
        );
    };

    const addProject = async () => {
        if (
            !title.trim() ||
            !description.trim()
        ) {
            alert(
                "Title and description are required"
            );

            return;
        }

        setLoading(true);

        try {
            let uploadedImage = image;

            if (selectedImage) {
                uploadedImage =
                    await uploadImage();

                if (uploadedImage === null) {
                    setLoading(false);
                    return;
                }
            }

            const response = await fetch(
                `${API_URL}/api/projects`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        description,

                        technologies:
                            technologies
                                .split(",")
                                .map(
                                    (item) =>
                                        item.trim()
                                )
                                .filter(Boolean),

                        liveUrl,
                        githubUrl,

                        image:
                            uploadedImage || ""
                    })
                }
            );

            const data =
                await response.json();

            if (data.success) {
                alert(
                    "Project added successfully"
                );

                clearForm();
                setShowForm(false);

                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to add project"
                );
            }
        } catch (error) {
            console.error(
                "Add project error:",
                error
            );

            alert("Server error");
        }

        setLoading(false);
    };

    const startEditProject = (project) => {
        setEditingProjectId(
            project._id
        );

        setTitle(
            project.title || ""
        );

        setDescription(
            project.description || ""
        );

        setTechnologies(
            project.technologies
                ? project.technologies.join(", ")
                : ""
        );

        setLiveUrl(
            project.liveUrl || ""
        );

        setGithubUrl(
            project.githubUrl || ""
        );

        setImage(
            project.image || ""
        );

        setSelectedImage(null);

        if (project.image) {
            setImagePreview(
                project.image.startsWith("http")
                    ? project.image
                    : `${API_URL}${project.image}`
            );
        } else {
            setImagePreview("");
        }

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const updateProject = async () => {
        if (
            !title.trim() ||
            !description.trim()
        ) {
            alert(
                "Title and description are required"
            );

            return;
        }

        setLoading(true);

        try {
            let updatedImage = image;

            if (selectedImage) {
                updatedImage =
                    await uploadImage();

                if (updatedImage === null) {
                    setLoading(false);
                    return;
                }
            }

            const response = await fetch(
                `${API_URL}/api/projects/${editingProjectId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        description,

                        technologies:
                            technologies
                                .split(",")
                                .map(
                                    (item) =>
                                        item.trim()
                                )
                                .filter(Boolean),

                        liveUrl,
                        githubUrl,

                        image:
                            updatedImage || ""
                    })
                }
            );

            const data =
                await response.json();

            if (data.success) {
                alert(
                    "Project updated successfully"
                );

                clearForm();
                setShowForm(false);

                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to update project"
                );
            }
        } catch (error) {
            console.error(
                "Update project error:",
                error
            );

            alert("Server error");
        }

        setLoading(false);
    };

    const cancelForm = () => {
        clearForm();
        setShowForm(false);
    };

    const deleteProject = async (
        projectId
    ) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this project?"
            );

        if (!confirmDelete) {
            return;
        }

        setDeleteLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/projects/${projectId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data =
                await response.json();

            if (data.success) {
                alert(
                    "Project deleted successfully"
                );

                setProjects(
                    (currentProjects) =>
                        currentProjects.filter(
                            (project) =>
                                project._id !==
                                projectId
                        )
                );

                loadDashboard();
            } else {
                alert(
                    data.message ||
                    "Failed to delete project"
                );
            }
        } catch (error) {
            console.error(
                "Delete project error:",
                error
            );

            alert("Server error");
        }

        setDeleteLoading(false);
    };

    /* =========================
       LOAD ALL DATA
    ========================= */

    useEffect(() => {
        loadDashboard();
        loadSkills();
        loadExperiences();
        loadServices();
        loadBlogs();
        loadContacts();
        loadSettings();
    }, []);

    if (!stats) {
        return (
            <div className="admin-loading">
                <h2>Loading Dashboard...</h2>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">

                <div className="admin-logo">
                    <h2>Portfolio CMS</h2>
                </div>

                <nav className="admin-menu">

                    <a href="#dashboard">
                        Dashboard
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

                    <a href="#blogs">
                        Blogs
                    </a>

                    <a href="#contacts">
                        Contacts
                    </a>

                    <a href="#settings">
                        Settings
                    </a>

                </nav>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem(
                            "token"
                        );

                        window.location.href =
                            "/";
                    }}
                >
                    Logout
                </button>

            </aside>

            <main className="admin-main">

                <div className="admin-topbar">

                    <div>
                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Manage your portfolio
                            content
                        </p>
                    </div>

                    <div className="admin-user">

                        <div className="admin-avatar">
                            K
                        </div>

                        <span>
                            Admin
                        </span>

                    </div>

                </div>

                {/* =========================
                    WELCOME
                ========================= */}

                <section
                    id="dashboard"
                    className="admin-welcome"
                >

                    <div>

                        <p className="admin-welcome-label">
                            Welcome back 👋
                        </p>

                        <h2>
                            Manage Your Portfolio
                        </h2>

                        <p>
                            Add, update and manage
                            your portfolio projects
                            from one place.
                        </p>

                    </div>

                    <button
                        className="add-project-btn"
                        onClick={() => {
                            if (showForm) {
                                cancelForm();
                            } else {
                                clearForm();
                                setShowForm(
                                    true
                                );
                            }
                        }}
                    >
                        {showForm
                            ? "Close Form"
                            : "+ Add Project"}
                    </button>

                </section>

                {/* =========================
                    STATS
                ========================= */}

                <section className="stats-grid">

                    <div className="stat-card">
                        <p>Projects</p>
                        <h2>
                            {stats.totalProjects}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <p>Skills</p>
                        <h2>
                            {stats.totalSkills}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <p>Experience</p>
                        <h2>
                            {stats.totalExperience}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <p>Services</p>
                        <h2>
                            {stats.totalServices}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <p>Blogs</p>
                        <h2>
                            {stats.totalBlogs}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <p>Contacts</p>
                        <h2>
                            {stats.totalContacts}
                        </h2>
                    </div>

                    <div className="stat-card">
                        <p>New Contacts</p>
                        <h2>
                            {stats.newContacts}
                        </h2>
                    </div>

                </section>

                {/* =========================
                    PROJECTS
                ========================= */}

                <section
                    id="projects"
                    className="admin-projects-section"
                >

                    <div className="section-title-row">

                        <div>

                            <p className="section-label">
                                PORTFOLIO
                            </p>

                            <h2>
                                Projects
                            </h2>

                        </div>

                        <button
                            className="add-project-btn"
                            onClick={() => {
                                if (showForm) {
                                    cancelForm();
                                } else {
                                    clearForm();
                                    setShowForm(
                                        true
                                    );
                                }
                            }}
                        >
                            {showForm
                                ? "Close Form"
                                : "+ Add Project"}
                        </button>

                    </div>

                    {showForm && (
                        <div className="project-form-card">

                            <h3>
                                {editingProjectId
                                    ? "Edit Project"
                                    : "Add New Project"}
                            </h3>

                            <div className="form-group">

                                <label>
                                    Project Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="Project title"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    placeholder="Project description"
                                    value={
                                        description
                                    }
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Technologies
                                </label>

                                <input
                                    type="text"
                                    placeholder="React, Node.js, MongoDB"
                                    value={
                                        technologies
                                    }
                                    onChange={(e) =>
                                        setTechnologies(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Live Demo URL
                                </label>

                                <input
                                    type="text"
                                    placeholder="https://example.com"
                                    value={
                                        liveUrl
                                    }
                                    onChange={(e) =>
                                        setLiveUrl(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    GitHub URL
                                </label>

                                <input
                                    type="text"
                                    placeholder="https://github.com/username/project"
                                    value={
                                        githubUrl
                                    }
                                    onChange={(e) =>
                                        setGithubUrl(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Project Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/jpg"
                                    onChange={
                                        handleImageChange
                                    }
                                />

                                <p className="image-help-text">
                                    JPG, PNG or WEBP •
                                    Maximum 5MB
                                </p>

                            </div>

                            {imagePreview && (
                                <div className="project-image-preview">

                                    <p>
                                        Image Preview
                                    </p>

                                    <img
                                        src={
                                            imagePreview
                                        }
                                        alt="Project Preview"
                                    />

                                </div>
                            )}

                            <div className="form-actions">

                                <button
                                    className="save-project-btn"
                                    onClick={
                                        editingProjectId
                                            ? updateProject
                                            : addProject
                                    }
                                    disabled={
                                        loading ||
                                        imageLoading
                                    }
                                >
                                    {imageLoading
                                        ? "Uploading Image..."
                                        : loading
                                            ? "Saving..."
                                            : editingProjectId
                                                ? "Update Project"
                                                : "Save Project"}
                                </button>

                                <button
                                    className="cancel-project-btn"
                                    onClick={
                                        cancelForm
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                    <div className="projects-admin-grid">

                        {projects.length === 0 ? (
                            <div className="empty-projects">

                                <h3>
                                    No projects found
                                </h3>

                                <p>
                                    Add your first
                                    portfolio project.
                                </p>

                            </div>
                        ) : (
                            projects.map(
                                (project) => (
                                    <div
                                        className="admin-project-card"
                                        key={
                                            project._id
                                        }
                                    >

                                        <div className="project-card-top">

                                            <span className="project-status">
                                                Project
                                            </span>

                                            <span className="project-number">
                                                #
                                                {
                                                    project.order ||
                                                    0
                                                }
                                            </span>

                                        </div>

                                        {project.image && (
                                            <img
                                                className="admin-project-image"
                                                src={
                                                    project.image.startsWith(
                                                        "http"
                                                    )
                                                        ? project.image
                                                        : `${API_URL}${project.image}`
                                                }
                                                alt={
                                                    project.title
                                                }
                                            />
                                        )}

                                        <h3>
                                            {
                                                project.title
                                            }
                                        </h3>

                                        <p>
                                            {
                                                project.description
                                            }
                                        </p>

                                        {project.technologies &&
                                            project
                                                .technologies
                                                .length >
                                            0 && (
                                                <div className="admin-tech-list">

                                                    {project.technologies.map(
                                                        (
                                                            tech,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                {
                                                                    tech
                                                                }
                                                            </span>
                                                        )
                                                    )}

                                                </div>
                                            )}

                                        <div className="project-card-actions">

                                            <button
                                                className="edit-project-btn"
                                                onClick={() =>
                                                    startEditProject(
                                                        project
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-project-btn"
                                                onClick={() =>
                                                    deleteProject(
                                                        project._id
                                                    )
                                                }
                                                disabled={
                                                    deleteLoading
                                                }
                                            >
                                                {deleteLoading
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

                {/* =========================
                    SKILLS
                ========================= */}

                <section
                    id="skills"
                    className="admin-section"
                >

                    <div className="admin-section-header">

                        <div>
                            <h2>
                                Skills
                            </h2>

                            <p>
                                Manage your portfolio
                                skills
                            </p>
                        </div>

                        <button
                            className="admin-primary-button"
                            onClick={() => {
                                clearSkillForm();
                                setShowSkillForm(
                                    true
                                );
                            }}
                        >
                            + Add Skill
                        </button>

                    </div>

                    {showSkillForm && (
                        <div className="admin-form-card">

                            <h3>
                                {editingSkillId
                                    ? "Edit Skill"
                                    : "Add New Skill"}
                            </h3>

                            <div className="admin-form-grid">

                                <input
                                    type="text"
                                    placeholder="Skill Name"
                                    value={
                                        skillName
                                    }
                                    onChange={(e) =>
                                        setSkillName(
                                            e.target.value
                                        )
                                    }
                                />

                                <select
                                    value={
                                        skillCategory
                                    }
                                    onChange={(e) =>
                                        setSkillCategory(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Frontend">
                                        Frontend
                                    </option>

                                    <option value="Backend">
                                        Backend
                                    </option>

                                    <option value="Database">
                                        Database
                                    </option>

                                    <option value="Programming">
                                        Programming
                                    </option>

                                    <option value="Tools">
                                        Tools
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>

                                <input
                                    type="number"
                                    placeholder="Skill Level"
                                    min="0"
                                    max="100"
                                    value={
                                        skillLevel
                                    }
                                    onChange={(e) =>
                                        setSkillLevel(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Icon (optional)"
                                    value={
                                        skillIcon
                                    }
                                    onChange={(e) =>
                                        setSkillIcon(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Order"
                                    value={
                                        skillOrder
                                    }
                                    onChange={(e) =>
                                        setSkillOrder(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="admin-form-actions">

                                <button
                                    className="admin-primary-button"
                                    onClick={
                                        editingSkillId
                                            ? updateSkill
                                            : addSkill
                                    }
                                    disabled={
                                        skillLoading
                                    }
                                >
                                    {skillLoading
                                        ? "Saving..."
                                        : editingSkillId
                                            ? "Update Skill"
                                            : "Add Skill"}
                                </button>

                                <button
                                    className="admin-secondary-button"
                                    onClick={() => {
                                        clearSkillForm();

                                        setShowSkillForm(
                                            false
                                        );
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                    <div className="skills-admin-grid">

                        {skills.length === 0 ? (
                            <p>
                                No skills added yet.
                            </p>
                        ) : (
                            skills.map(
                                (skill) => (
                                    <div
                                        className="skill-admin-card"
                                        key={
                                            skill._id
                                        }
                                    >

                                        <div>

                                            <h3>
                                                {
                                                    skill.name
                                                }
                                            </h3>

                                            <p>
                                                Category:{" "}
                                                {
                                                    skill.category
                                                }
                                            </p>

                                            <p>
                                                Level:{" "}
                                                {
                                                    skill.level
                                                }%
                                            </p>

                                        </div>

                                        <div className="skill-admin-actions">

                                            <button
                                                onClick={() =>
                                                    startEditSkill(
                                                        skill
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteSkill(
                                                        skill._id
                                                    )
                                                }
                                                disabled={
                                                    skillDeleteLoading
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

                {/* =========================
                    SERVICES
                ========================= */}

                <section
                    id="services"
                    className="admin-section"
                >

                    <div className="admin-section-header">

                        <div>
                            <h2>
                                Services
                            </h2>

                            <p>
                                Manage your portfolio
                                services
                            </p>
                        </div>

                        <button
                            className="admin-primary-button"
                            onClick={() => {
                                clearServiceForm();

                                setShowServiceForm(
                                    true
                                );
                            }}
                        >
                            + Add Service
                        </button>

                    </div>

                    {showServiceForm && (
                        <div className="admin-form-card">

                            <h3>
                                {editingServiceId
                                    ? "Edit Service"
                                    : "Add New Service"}
                            </h3>

                            <div className="admin-form-grid">

                                <input
                                    type="text"
                                    placeholder="Service Title"
                                    value={
                                        serviceTitle
                                    }
                                    onChange={(e) =>
                                        setServiceTitle(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Icon e.g. 💻"
                                    value={
                                        serviceIcon
                                    }
                                    onChange={(e) =>
                                        setServiceIcon(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Technologies: React, Node.js, MongoDB"
                                    value={
                                        serviceTechnologies
                                    }
                                    onChange={(e) =>
                                        setServiceTechnologies(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Order"
                                    min="0"
                                    value={
                                        serviceOrder
                                    }
                                    onChange={(e) =>
                                        setServiceOrder(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <textarea
                                placeholder="Service Description"
                                value={
                                    serviceDescription
                                }
                                onChange={(e) =>
                                    setServiceDescription(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    minHeight:
                                        "130px",
                                    marginTop:
                                        "15px",
                                    padding:
                                        "12px",
                                    border:
                                        "1px solid #d1d5db",
                                    borderRadius:
                                        "8px",
                                    resize:
                                        "vertical",
                                    fontFamily:
                                        "inherit",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <label
                                style={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    gap: "8px",
                                    marginTop:
                                        "15px",
                                    cursor:
                                        "pointer"
                                }}
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        serviceFeatured
                                    }
                                    onChange={(e) =>
                                        setServiceFeatured(
                                            e.target.checked
                                        )
                                    }
                                />

                                Featured Service

                            </label>

                            <div className="admin-form-actions">

                                <button
                                    className="admin-primary-button"
                                    onClick={
                                        editingServiceId
                                            ? updateService
                                            : addService
                                    }
                                    disabled={
                                        serviceLoading
                                    }
                                >
                                    {serviceLoading
                                        ? "Saving..."
                                        : editingServiceId
                                            ? "Update Service"
                                            : "Add Service"}
                                </button>

                                <button
                                    className="admin-secondary-button"
                                    onClick={() => {
                                        clearServiceForm();

                                        setShowServiceForm(
                                            false
                                        );
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                    <div className="service-admin-grid">

                        {services.length === 0 ? (
                            <div className="empty-services">

                                <h3>
                                    No services added
                                    yet
                                </h3>

                                <p>
                                    Click "+ Add
                                    Service" to add
                                    your services.
                                </p>

                            </div>
                        ) : (
                            services.map(
                                (service) => (
                                    <div
                                        className="service-admin-card"
                                        key={
                                            service._id
                                        }
                                    >

                                        <div className="service-card-header">

                                            <div className="service-icon">
                                                {
                                                    service.icon ||
                                                    "💻"
                                                }
                                            </div>

                                            <div>

                                                <h3>
                                                    {
                                                        service.title
                                                    }
                                                </h3>

                                                {service.featured && (
                                                    <span className="service-featured">
                                                        Featured
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                        <p className="service-description">
                                            {
                                                service.description
                                            }
                                        </p>

                                        {service.technologies &&
                                            service
                                                .technologies
                                                .length >
                                            0 && (
                                                <div className="service-tech-list">

                                                    {service.technologies.map(
                                                        (
                                                            technology,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                {
                                                                    technology
                                                                }
                                                            </span>
                                                        )
                                                    )}

                                                </div>
                                            )}

                                        <p className="service-order">
                                            Order:{" "}
                                            {
                                                service.order ||
                                                0
                                            }
                                        </p>

                                        <div className="service-admin-actions">

                                            <button
                                                className="edit-project-btn"
                                                onClick={() =>
                                                    startEditService(
                                                        service
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-project-btn"
                                                onClick={() =>
                                                    deleteService(
                                                        service._id
                                                    )
                                                }
                                                disabled={
                                                    serviceDeleteLoading
                                                }
                                            >
                                                {serviceDeleteLoading
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

                {/* =========================
                    EXPERIENCE
                ========================= */}

                <section
                    id="experience"
                    className="admin-section"
                >

                    <div className="admin-section-header">

                        <div>
                            <h2>
                                Experience
                            </h2>

                            <p>
                                Manage your work
                                experience
                            </p>
                        </div>

                        <button
                            className="admin-primary-button"
                            onClick={() => {
                                clearExperienceForm();

                                setShowExperienceForm(
                                    true
                                );
                            }}
                        >
                            + Add Experience
                        </button>

                    </div>

                    {showExperienceForm && (
                        <div className="admin-form-card">

                            <h3>
                                {editingExperienceId
                                    ? "Edit Experience"
                                    : "Add New Experience"}
                            </h3>

                            <div className="admin-form-grid">

                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    value={
                                        jobTitle
                                    }
                                    onChange={(e) =>
                                        setJobTitle(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={
                                        company
                                    }
                                    onChange={(e) =>
                                        setCompany(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={
                                        location
                                    }
                                    onChange={(e) =>
                                        setLocation(
                                            e.target.value
                                        )
                                    }
                                />

                                <select
                                    value={
                                        employmentType
                                    }
                                    onChange={(e) =>
                                        setEmploymentType(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Full Time">
                                        Full Time
                                    </option>

                                    <option value="Part Time">
                                        Part Time
                                    </option>

                                    <option value="Internship">
                                        Internship
                                    </option>

                                    <option value="Freelance">
                                        Freelance
                                    </option>

                                    <option value="Contract">
                                        Contract
                                    </option>

                                </select>

                                <input
                                    type="text"
                                    placeholder="Start Date e.g. Jan 2024"
                                    value={
                                        startDate
                                    }
                                    onChange={(e) =>
                                        setStartDate(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="End Date e.g. Apr 2026"
                                    value={
                                        endDate
                                    }
                                    onChange={(e) =>
                                        setEndDate(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Technologies: HTML, CSS, JavaScript"
                                    value={
                                        experienceTechnologies
                                    }
                                    onChange={(e) =>
                                        setExperienceTechnologies(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Order"
                                    value={
                                        experienceOrder
                                    }
                                    onChange={(e) =>
                                        setExperienceOrder(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <textarea
                                placeholder="Experience Description"
                                value={
                                    experienceDescription
                                }
                                onChange={(e) =>
                                    setExperienceDescription(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    minHeight:
                                        "130px",
                                    marginTop:
                                        "15px",
                                    padding:
                                        "12px",
                                    border:
                                        "1px solid #d1d5db",
                                    borderRadius:
                                        "8px",
                                    resize:
                                        "vertical",
                                    fontFamily:
                                        "inherit"
                                }}
                            />

                            <div className="admin-form-actions">

                                <button
                                    className="admin-primary-button"
                                    onClick={
                                        editingExperienceId
                                            ? updateExperience
                                            : addExperience
                                    }
                                    disabled={
                                        experienceLoading
                                    }
                                >
                                    {experienceLoading
                                        ? "Saving..."
                                        : editingExperienceId
                                            ? "Update Experience"
                                            : "Add Experience"}
                                </button>

                                <button
                                    className="admin-secondary-button"
                                    onClick={() => {
                                        clearExperienceForm();

                                        setShowExperienceForm(
                                            false
                                        );
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                    <div className="experience-admin-grid">

                        {experiences.length === 0 ? (
                            <div className="empty-experiences">

                                <h3>
                                    No experience
                                    added yet
                                </h3>

                                <p>
                                    Click "+ Add
                                    Experience" to
                                    add your work
                                    experience.
                                </p>

                            </div>
                        ) : (
                            experiences.map(
                                (experience) => (
                                    <div
                                        className="experience-admin-card"
                                        key={
                                            experience._id
                                        }
                                    >

                                        <div className="experience-card-header">

                                            <div>

                                                <h3>
                                                    {
                                                        experience.jobTitle
                                                    }
                                                </h3>

                                                <p className="experience-company">
                                                    {
                                                        experience.company
                                                    }
                                                </p>

                                            </div>

                                            <span className="experience-type">
                                                {
                                                    experience.employmentType
                                                }
                                            </span>

                                        </div>

                                        <p className="experience-location">
                                            📍{" "}
                                            {
                                                experience.location ||
                                                "Remote"
                                            }
                                        </p>

                                        <p className="experience-duration">
                                            {
                                                experience.startDate
                                            }

                                            {" - "}

                                            {
                                                experience.endDate ||
                                                "Present"
                                            }
                                        </p>

                                        {experience.description && (
                                            <p className="experience-description">
                                                {
                                                    experience.description
                                                }
                                            </p>
                                        )}

                                        {experience.technologies &&
                                            experience
                                                .technologies
                                                .length >
                                            0 && (
                                                <div className="experience-tech-list">

                                                    {experience.technologies.map(
                                                        (
                                                            technology,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={
                                                                    index
                                                                }
                                                            >
                                                                {
                                                                    technology
                                                                }
                                                            </span>
                                                        )
                                                    )}

                                                </div>
                                            )}

                                        <div className="experience-admin-actions">

                                            <button
                                                className="edit-project-btn"
                                                onClick={() =>
                                                    startEditExperience(
                                                        experience
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-project-btn"
                                                onClick={() =>
                                                    deleteExperience(
                                                        experience._id
                                                    )
                                                }
                                                disabled={
                                                    experienceDeleteLoading
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

                {/* =========================
                    BLOGS
                ========================= */}

                <section
                    id="blogs"
                    className="admin-section"
                >

                    <div className="admin-section-header">

                        <div>
                            <h2>
                                Blogs
                            </h2>

                            <p>
                                Manage your portfolio
                                blogs
                            </p>
                        </div>

                        <button
                            className="admin-primary-button"
                            onClick={() => {
                                clearBlogForm();

                                setShowBlogForm(
                                    true
                                );
                            }}
                        >
                            + Add Blog
                        </button>

                    </div>

                    {showBlogForm && (
                        <div className="admin-form-card">

                            <h3>
                                {editingBlogId
                                    ? "Edit Blog"
                                    : "Add New Blog"}
                            </h3>

                            <div className="admin-form-grid">

                                <input
                                    type="text"
                                    placeholder="Blog Title"
                                    value={
                                        blogTitle
                                    }
                                    onChange={(e) =>
                                        setBlogTitle(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Slug e.g. react-for-beginners"
                                    value={
                                        blogSlug
                                    }
                                    onChange={(e) =>
                                        setBlogSlug(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={
                                        blogCategory
                                    }
                                    onChange={(e) =>
                                        setBlogCategory(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={
                                        blogAuthor
                                    }
                                    onChange={(e) =>
                                        setBlogAuthor(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Tags: React, JavaScript, Web Development"
                                    value={
                                        blogTags
                                    }
                                    onChange={(e) =>
                                        setBlogTags(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Cover Image URL (optional)"
                                    value={
                                        blogCoverImage
                                    }
                                    onChange={(e) =>
                                        setBlogCoverImage(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    type="number"
                                    placeholder="Order"
                                    min="0"
                                    value={
                                        blogOrder
                                    }
                                    onChange={(e) =>
                                        setBlogOrder(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <textarea
                                placeholder="Blog Excerpt"
                                value={
                                    blogExcerpt
                                }
                                onChange={(e) =>
                                    setBlogExcerpt(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    minHeight:
                                        "100px",
                                    marginTop:
                                        "15px",
                                    padding:
                                        "12px",
                                    border:
                                        "1px solid #d1d5db",
                                    borderRadius:
                                        "8px",
                                    resize:
                                        "vertical",
                                    fontFamily:
                                        "inherit",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <textarea
                                placeholder="Blog Content"
                                value={
                                    blogContent
                                }
                                onChange={(e) =>
                                    setBlogContent(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    minHeight:
                                        "220px",
                                    marginTop:
                                        "15px",
                                    padding:
                                        "12px",
                                    border:
                                        "1px solid #d1d5db",
                                    borderRadius:
                                        "8px",
                                    resize:
                                        "vertical",
                                    fontFamily:
                                        "inherit",
                                    boxSizing:
                                        "border-box"
                                }}
                            />

                            <label
                                style={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    gap: "8px",
                                    marginTop:
                                        "15px",
                                    cursor:
                                        "pointer"
                                }}
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        blogPublished
                                    }
                                    onChange={(e) =>
                                        setBlogPublished(
                                            e.target.checked
                                        )
                                    }
                                />

                                Publish Blog

                            </label>

                            <div className="admin-form-actions">

                                <button
                                    className="admin-primary-button"
                                    onClick={
                                        editingBlogId
                                            ? updateBlog
                                            : addBlog
                                    }
                                    disabled={
                                        blogLoading
                                    }
                                >
                                    {blogLoading
                                        ? "Saving..."
                                        : editingBlogId
                                            ? "Update Blog"
                                            : "Add Blog"}
                                </button>

                                <button
                                    className="admin-secondary-button"
                                    onClick={() => {
                                        clearBlogForm();

                                        setShowBlogForm(
                                            false
                                        );
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                    <div className="blog-admin-grid">

                        {blogs.length === 0 ? (
                            <div className="empty-blogs">

                                <h3>
                                    No blogs added
                                    yet
                                </h3>

                                <p>
                                    Click "+ Add Blog"
                                    to create your
                                    first blog.
                                </p>

                            </div>
                        ) : (
                            blogs.map(
                                (blog) => (
                                    <div
                                        className="blog-admin-card"
                                        key={
                                            blog._id
                                        }
                                    >

                                        {blog.coverImage && (
                                            <img
                                                src={
                                                    blog.coverImage.startsWith(
                                                        "http"
                                                    )
                                                        ? blog.coverImage
                                                        : `${API_URL}${blog.coverImage}`
                                                }
                                                alt={
                                                    blog.title
                                                }
                                                className="blog-cover-image"
                                            />
                                        )}

                                        <div className="blog-admin-content">

                                            <div className="blog-admin-header">

                                                <div>

                                                    <h3>
                                                        {
                                                            blog.title
                                                        }
                                                    </h3>

                                                    <span className="blog-category">
                                                        {
                                                            blog.category
                                                        }
                                                    </span>

                                                </div>

                                                <span
                                                    className={
                                                        blog.published
                                                            ? "blog-published"
                                                            : "blog-draft"
                                                    }
                                                >
                                                    {blog.published
                                                        ? "Published"
                                                        : "Draft"}
                                                </span>

                                            </div>

                                            {blog.excerpt && (
                                                <p className="blog-excerpt">
                                                    {
                                                        blog.excerpt
                                                    }
                                                </p>
                                            )}

                                            {blog.tags &&
                                                blog.tags
                                                    .length >
                                                0 && (
                                                    <div className="blog-tags">

                                                        {blog.tags.map(
                                                            (
                                                                tag,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        index
                                                                    }
                                                                >
                                                                    {
                                                                        tag
                                                                    }
                                                                </span>
                                                            )
                                                        )}

                                                    </div>
                                                )}

                                            <p className="blog-author">
                                                Author:{" "}
                                                {
                                                    blog.author ||
                                                    "Admin"
                                                }
                                            </p>

                                            <p className="blog-order">
                                                Order:{" "}
                                                {
                                                    blog.order ||
                                                    0
                                                }
                                            </p>

                                            <div className="blog-admin-actions">

                                                <button
                                                    className="edit-project-btn"
                                                    onClick={() =>
                                                        startEditBlog(
                                                            blog
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-project-btn"
                                                    onClick={() =>
                                                        deleteBlog(
                                                            blog._id
                                                        )
                                                    }
                                                    disabled={
                                                        blogDeleteLoading
                                                    }
                                                >
                                                    {blogDeleteLoading
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )
                        )}

                    </div>

                </section>

                {/* =========================
                    CONTACTS
                ========================= */}

                <section
                    id="contacts"
                    className="admin-section"
                >

                    <div className="section-header">

                        <div>

                            <h2>
                                Contacts
                            </h2>

                            <p>
                                Manage messages
                                received from your
                                portfolio.
                            </p>

                        </div>

                        <button
                            className="admin-btn"
                            onClick={
                                loadContacts
                            }
                            disabled={
                                contactLoading
                            }
                        >
                            {contactLoading
                                ? "Loading..."
                                : "Refresh"}
                        </button>

                    </div>

                    {contactLoading ? (
                        <div className="admin-empty">
                            Loading contacts...
                        </div>
                    ) : contacts.length ===
                        0 ? (
                        <div className="admin-empty">
                            No contact messages
                            found.
                        </div>
                    ) : (
                        <div className="contacts-list">

                            {contacts.map(
                                (contact) => (
                                    <div
                                        className="contact-card"
                                        key={
                                            contact._id
                                        }
                                    >

                                        <div className="contact-card-header">

                                            <div>

                                                <h3>
                                                    {
                                                        contact.name
                                                    }
                                                </h3>

                                                <p className="contact-email">
                                                    {
                                                        contact.email
                                                    }
                                                </p>

                                            </div>

                                            <span
                                                className={`contact-status ${contact.status}`}
                                            >
                                                {
                                                    contact.status
                                                }
                                            </span>

                                        </div>

                                        <div className="contact-details">

                                            <p>
                                                <strong>
                                                    Subject:
                                                </strong>{" "}
                                                {
                                                    contact.subject ||
                                                    "No subject"
                                                }
                                            </p>

                                            <p>
                                                <strong>
                                                    Message:
                                                </strong>
                                            </p>

                                            <p className="contact-message">
                                                {
                                                    contact.message
                                                }
                                            </p>

                                            <p className="contact-date">
                                                {new Date(
                                                    contact.createdAt
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                        <div className="contact-actions">

                                            {contact.status !==
                                                "read" && (
                                                    <button
                                                        className="admin-btn"
                                                        onClick={() =>
                                                            updateContactStatus(
                                                                contact._id,
                                                                "read"
                                                            )
                                                        }
                                                    >
                                                        Mark Read
                                                    </button>
                                                )}

                                            {contact.status !==
                                                "replied" && (
                                                    <button
                                                        className="admin-btn"
                                                        onClick={() =>
                                                            updateContactStatus(
                                                                contact._id,
                                                                "replied"
                                                            )
                                                        }
                                                    >
                                                        Mark Replied
                                                    </button>
                                                )}

                                            <button
                                                className="admin-btn danger"
                                                onClick={() =>
                                                    deleteContact(
                                                        contact._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </section>

                {/* =========================
                    SETTINGS
                ========================= */}

                <section
                    id="settings"
                    className="admin-section"
                >

                    <div className="section-header">

                        <div>

                            <h2>
                                Portfolio Settings
                            </h2>

                            <p>
                                Manage your portfolio
                                information
                            </p>

                        </div>

                    </div>

                    {settingsLoading ? (
                        <div className="admin-loading">
                            Loading settings...
                        </div>
                    ) : settingsForm ? (

                        <div className="settings-card">

                            <div className="form-grid">

                                <div className="form-group">

                                    <label>
                                        Site Title
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.siteTitle
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    siteTitle:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="Kaushlendar Kumar"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Tagline
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.tagline
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    tagline:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="BCA Graduate • MCA Student"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Hero Title
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.heroTitle
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    heroTitle:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="Full Stack Developer"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.location
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    location:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="Bihar, India"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={
                                            settingsForm.email
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    email:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="your@email.com"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.phone
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    phone:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="+91 XXXXX XXXXX"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Profile Image URL
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.profileImage
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    profileImage:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="/uploads/profile.jpg"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Resume URL
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.resumeUrl
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    resumeUrl:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="/uploads/resume.pdf"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        GitHub URL
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.githubUrl
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    githubUrl:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="https://github.com/username"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        LinkedIn URL
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.linkedinUrl
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    linkedinUrl:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="https://linkedin.com/in/username"
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Instagram URL
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settingsForm.instagramUrl
                                        }
                                        onChange={(e) =>
                                            setSettingsForm(
                                                {
                                                    ...settingsForm,
                                                    instagramUrl:
                                                        e.target
                                                            .value
                                                }
                                            )
                                        }
                                        placeholder="https://instagram.com/username"
                                    />

                                </div>

                            </div>

                            <div className="form-group full-width">

                                <label>
                                    About Text
                                </label>

                                <textarea
                                    rows="6"
                                    value={
                                        settingsForm.aboutText
                                    }
                                    onChange={(e) =>
                                        setSettingsForm(
                                            {
                                                ...settingsForm,
                                                aboutText:
                                                    e.target
                                                        .value
                                            }
                                        )
                                    }
                                    placeholder="Write something about yourself..."
                                />

                            </div>

                            <div className="settings-actions">

                                <button
                                    type="button"
                                    className="save-btn"
                                    onClick={
                                        updateSettings
                                    }
                                    disabled={
                                        settingsLoading
                                    }
                                >
                                    {settingsLoading
                                        ? "Saving..."
                                        : "Save Settings"}
                                </button>

                            </div>

                        </div>

                    ) : (
                        <p>
                            No settings available.
                        </p>
                    )}

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;