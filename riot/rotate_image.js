require('riotgear');
require('./rotateImageList.tag');
require('./rotateImage.tag');

var obs = riot.observable();

riot.mixin('obs', {
    obs: obs
});

riot.mount('rotateImageList');
