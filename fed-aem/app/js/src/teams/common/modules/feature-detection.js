var $ = require('jquery');

export function supportsVideo() {
    return !!document.createElement('video').canPlayType;
}