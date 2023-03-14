function getYoutube(data) {
    const videoLists = document.querySelector('.youtube-container');
    const videoTemplate = document.querySelector('.youtube-iframe-template');
    const weatheriframe = document.importNode(videoTemplate.content, true);
    const videoId = data.items[0].id.videoId

    let link = data.items[0].snippet.thumbnails.high.url;
    weatheriframe.querySelector('.youtube-link').setAttribute('href', `https://www.youtube.com/watch?v=${videoId}`);
    weatheriframe.querySelector('.thumbnail').style.backgroundImage = `url(${link})`;
    weatheriframe.querySelector('.thumbnail-title').insertAdjacentHTML('afterbegin', `${data.items[0].snippet.title}`);
    videoLists.append(weatheriframe);
}

(function youtube() {

    const YOUTUBE_API = "";
    const YOUTUBE_CHANNEL = "UCs1omgoHHPENxs4b-fwMpPQ";

    const url = `https://www.googleapis.com/youtube/v3/search?list=PLsU45F2D-sEanSDUJ0LUye7uK8A66zDiL&part=snippet&maxResults=1&channelId=${YOUTUBE_CHANNEL}&type=video&order=date&key=${YOUTUBE_API}`;
    
    fetch(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return response.json().then(errData => {
                    console.log(errData);
                    throw new Error('Something went wrong');
                });
            }
        })
        .catch(error => {
            console.log(error);
            throw new Error('Something went wrong.');
        })
        .then((data) => {
            getYoutube(data);
        })
})();
