// Small helpers for the site: header shadow on scroll + fade-in-on-scroll.
(function () {
    var doc = document;

    // Header gets a soft shadow once you scroll
    var header = doc.querySelector('.header');
    function onScroll() {
        if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Reveal elements as they scroll into view
    var items = [].slice.call(doc.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('in'); });
        return;
    }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
})();
