# Encrypted Journal

Will store encrypted markdown entries to IPFS. Currently shows a markdown editor and preview.

## UI
Using [choo framework](https://github.com/choojs/choo) with [styled-elements](https://github.com/styled-components/styled-elements) for layoout/styling. [Nanocomponents](https://github.com/choojs/nanocomponent) is used to wrap [Code Mirror](http://codemirror.net/) and handle its internal state. [W3.CSS](https://www.w3schools.com/w3css/default.asp) is used as base stylesheet.

## Security
// TODO None of this is implemented

Entries are encrypted by Keybase's TripleSec lib. The encryption key is the sha2 hash (TODO finalize if I want to use sha2) of the data to be encrypted.
The encryption key is then stored locally and used later on retrieve.

## Deployment
All static assets to be hosted on ipfs. Using [ipscend](https://github.com/diasdavid/ipscend) to ease the process.

## TODO
* keep list of all posted entries
* publish markdown entries to ipfs using js-ipfs in the browser
* encryption of notes using one-time keys
