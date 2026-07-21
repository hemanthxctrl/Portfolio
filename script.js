document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation via IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Optional: Interactive Blobs
    // Make blobs follow cursor slightly for a parallax effect
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        if (blob1) blob1.style.transform = `translate(${x}px, ${y}px)`;
        if (blob2) blob2.style.transform = `translate(${-x}px, ${-y}px)`;
    });
});
