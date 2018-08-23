# HyperTube
This project proposes to create a web application that allows the user to research and
watch videos.

The player will be directly integrated to the site, and the videos will be downloaded
through the BitTorrent protocol.

The research engine we used - https://www.yts.am

Once the element selected, it will be downloaded from the server and streamed on the
web player at the same time. Which means that the player won’t only show the video
once the download is completed, but will be able to stream directly the video feed.

## Install
1. `npm install`
2. `./composer.phar update`
3. Open another bash window - `node public/torrent-stream/torrent.js`
4. `npm run prod`

## Authorized tools
All the framework, micro-framework, libraries etc. . . are authorized within the
limits where they are not used to create a video stream from a torrent, thus limiting
the educational purpose of this project. For example, libraries such as webtorrent,
pulsar and peerflix are forbidden.

## Compatibility
At least with Firefox (>= 41) and Chrome (>= 46).

## Structure
1. Server side - Laravel/PHP for all plain stuff and Node JS Express for streaming purposes.
2. Client side - React.

## Screenshots
### Authorization page
![Auth](/screenshots/authPage.png)

### Library page
![Library](/screenshots/libraryPage.png)

### Search sidebar
![Search](/screenshots/searchNav.png)

### Movie page
![Movie](/screenshots/moviePage.png)

## Final grade - 125/100(max)
