const form = document.querySelector('.cp-search-from');
const moreButton = document.querySelector('.cp-more-results__button');
let tag;
let currentTag
let counter = 1;
let flickrGallery = document.querySelector("#cp-flickr-gallery");

//goGetTheNextSet(counter);
function goGetTheNextSet(tag, counter) {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=24a59354d875076333aedccc255242b3&tags=${tag}&per_page=25&page=${counter}&format=json&nojsoncallback=1`)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            const photos = data.photos.photo.map((photo) => {
                const farmId = photo.farm;
                const serverId = photo.server;
                const id = photo.id;
                const secret = photo.secret;
                const title = photo.title;
                let html = `
                    <a class="cp-flickr-gallery__image" href="https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg" title="${title}">
                        <img src="https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg" />
                    </a>
                `
                flickrGallery.innerHTML += html;
                //moreButton.style.display = 'block';
                //console.log(`<img src="https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg" />`);
            });
            //console.log(photos);
        })
        .catch((error) => {
            console.log(error);
        });
}

// moreButton.addEventListener('click', function () {
//     counter += 1;
//     console.log(counter);
//     tag = form.search.value;
//     goGetTheNextSet(tag, counter);
// });

// Infinite scroll
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            counter += 1;
        console.log(counter);
        tag = form.search.value;
        goGetTheNextSet(tag, counter);
        magnificPopup();
    }
});

form.addEventListener('submit', e => {
    counter = 1;
    flickrGallery.innerHTML = '';
    currentTag = form.search.value;
    e.preventDefault();
    goGetTheNextSet(currentTag, counter);
    magnificPopup();

});

function magnificPopup() {
	$('.cp-flickr-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
		}
	});
}