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
        settings: ['speed', 'quality'], // Add quality settings
        quality: { // Add quality options
            default: '720p',
            options: ['240p', '360p', '480p', '720p', '1080p']
        }
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

    // Function to handle swipe left and right
    videoPlayer.elements.container.addEventListener('touchstart', handleTouchStart, false);
    videoPlayer.elements.container.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }
    

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // Most significant.
            if (xDiff > 0) {
                /* left swipe */
                videoPlayer.currentTime -= 10; // Go back 10 seconds
            } else {
                /* right swipe */
                videoPlayer.currentTime += 10; // Go forward 10 seconds
            }
        }

        // Reset values
        xDown = null;
        yDown = null;
    }

    // Prevent full screen on double click
    videoPlayer.elements.container.ondblclick = function(e) {
        e.preventDefault();
    };
}
