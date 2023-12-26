try {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
        if (window.location.pathname.startsWith(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });
} catch (error) {}
