document.addEventListener('DOMContentLoaded', () => {
    // Highlight active nav link based on current URL
    const path = window.location.pathname;
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (path.includes(href) || (path === '/' && href === '/index.html')) {
            link.classList.add('active');
        }
    });

    // videos.html logic
    if (path.includes('videos.html')) {
        const yt_videos = [
            'CniOgbpLEd8', 'Vzf97_2pXbQ', 'Jt7Ryhyhnuo',
            'uscmIf_HFjs', 'XffAUETbFmg', 'qHvebJpfbXI',
            'BPNPc703ciE', 'WlzAQRmo_F0'
        ];

        const grid = document.querySelector('.video-grid');
        if (grid) {
            yt_videos.forEach(id => {
                const card = document.createElement('div');
                card.className = 'video-card';
                card.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${id}?rel=0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
                grid.appendChild(card);
            });
        }
    }
});
