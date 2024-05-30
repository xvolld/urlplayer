function playMedia() {
    var mediaUrl = document.getElementById('mediaUrl').value;
    var mediaPlayer = document.getElementById('mediaPlayer');

    // Create video element using Plyr
    mediaPlayer.innerHTML = `
        <div class="plyr__video-embed" id="player">
            <video id="videoPlayer" controls>
                <source src="${mediaUrl}" type="video/mp4">
            </video>
        </div>
        <div id="speedIndicator">2X >></div>
    `;

    // Initialize Plyr video player
    var videoPlayer = new Plyr('#videoPlayer', {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen', 'settings', 'speed'], // Add controls including speed
        settings: ['speed']
    });

    // Get speed indicator element
    var speedIndicator = document.getElementById('speedIndicator');

    // Variables to handle long press
    var pressTimer;

    // Function to handle speed change on long press
    function handleLongPressStart() {
        pressTimer = setTimeout(function() {
            videoPlayer.speed = 2; // Double speed
            speedIndicator.style.display = 'block'; // Show speed indicator
        }, 1000); // 1 second delay
    }

    function handleLongPressEnd() {
        clearTimeout(pressTimer);
        videoPlayer.speed = 1; // Normal speed
        speedIndicator.style.display = 'none'; // Hide speed indicator
    }

    // Add event listeners for long press
    videoPlayer.elements.container.addEventListener('mousedown', handleLongPressStart);
    videoPlayer.elements.container.addEventListener('mouseup', handleLongPressEnd);
    videoPlayer.elements.container.addEventListener('mouseleave', handleLongPressEnd);

    videoPlayer.elements.container.addEventListener('touchstart', handleLongPressStart);
    videoPlayer.elements.container.addEventListener('touchend', handleLongPressEnd);
    videoPlayer.elements.container.addEventListener('touchcancel', handleLongPressEnd);
}