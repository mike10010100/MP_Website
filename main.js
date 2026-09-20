import { voiceOvers } from './audioData.js';

document.addEventListener('DOMContentLoaded', () => {
    // Highlight active nav link based on current URL
    const rawPath = window.location.pathname.replace(/\/$/, '') || '/';
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        const href = link.getAttribute('href');
        const isHome = (rawPath === '/' || rawPath.endsWith('/index.html')) &&
            (href === 'index.html' || href === '/index.html' || href === '/');
        const isMatch = isHome || (rawPath.endsWith(href) && href !== 'index.html');
        if (isMatch) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // videos.html logic
    if (rawPath.includes('videos.html')) {
        const yt_videos = [
            { id: 'CniOgbpLEd8', title: 'Warm as the Autumn Light - Michael Paulauski' },
            { id: 'bAdFoWtz6ZA', title: 'Deuce Bigalow: Male Gigolo - Michael Paulauski' },
            { id: 'CNXnwKeJJW0', title: 'Have Yourself A Merry Little Christmas - Stevens Institute Jazz Band' },
            { id: 'WlzAQRmo_F0', title: 'Michael Demo Reel (Remix)' }
        ];

        const grid = document.querySelector('.video-grid');
        if (grid) {
            yt_videos.forEach(video => {
                const card = document.createElement('div');
                card.className = 'video-card';
                card.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${video.id}?rel=0" 
                        title="${video.title}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
                grid.appendChild(card);
            });
        }
    }

    // voiceover.html logic
    if (rawPath.includes('voiceover.html')) {
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
                        imageHTML = `<img src="/media/images/${encodeURIComponent(track.image)}" alt="${track.title} artwork" class="audio-thumbnail" width="80" height="80" loading="lazy" />`;
                    } else {
                        imageHTML = `
                            <div class="audio-thumbnail default-thumbnail" aria-hidden="true">
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

    // Audio mutual exclusion: pause any playing track when another begins
    document.addEventListener('play', (e) => {
        if (e.target.tagName === 'AUDIO') {
            document.querySelectorAll('audio').forEach(otherAudio => {
                if (otherAudio !== e.target && !otherAudio.paused) {
                    otherAudio.pause();
                }
            });
            document.querySelectorAll('.audio-card').forEach(card => {
                card.classList.remove('is-playing');
            });
            const currentCard = e.target.closest('.audio-card');
            if (currentCard) {
                currentCard.classList.add('is-playing');
            }
        }
    }, true);

    document.addEventListener('pause', (e) => {
        if (e.target.tagName === 'AUDIO') {
            const currentCard = e.target.closest('.audio-card');
            if (currentCard) {
                currentCard.classList.remove('is-playing');
            }
        }
    }, true);
});
