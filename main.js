import { voiceOvers } from './audioData.js';

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

    // voiceover.html logic
    if (path.includes('voiceover.html')) {
        const container = document.querySelector('.audio-container');
        if (container) {
            voiceOvers.forEach(categoryObj => {
                // Create Category Section
                const section = document.createElement('section');
                section.className = 'audio-section';

                const title = document.createElement('h2');
                title.textContent = categoryObj.category;
                section.appendChild(title);

                const grid = document.createElement('div');
                grid.className = 'audio-grid';

                categoryObj.tracks.forEach(track => {
                    const card = document.createElement('div');
                    card.className = 'audio-card';

                    let imageHTML = '';
                    if (track.image) {
                        imageHTML = `<img src="/media/images/${encodeURIComponent(track.image)}" alt="${track.title} artwork" class="audio-thumbnail" />`;
                    } else {
                        imageHTML = `
                            <div class="audio-thumbnail default-thumbnail">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="22"></line>
                                </svg>
                            </div>
                        `;
                    }

                    card.innerHTML = `
                        ${imageHTML}
                        <div class="audio-content">
                            <h3>${track.title}</h3>
                            <audio controls controlsList="nodownload">
                                <source src="/media/audio/${encodeURIComponent(track.file)}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    `;
                    grid.appendChild(card);
                });

                section.appendChild(grid);
                container.appendChild(section);
            });
        }
    }
});
