const id = require("./identifier");

describe('identifier', () => {
  /*
    it takes a filepath as a parameter
      it takes the last element as the file
      it takes the second last element as the parent
      it takes the remaining elements as unprocessed

    it splits the file name
      it splits the name into 'Show', 'Ep' and 'Title'
      it can handle additional split characters without error
        // [Strange Pilot.mkv] in D:\Sorted Torrents\TV\Archer (2009)\Archer (2009) - 9x01 - Danger Island - Strange Pilot.mkv​​

      
    it errors if
      a file name does not match this 'pattern' of `Show - Ep - Title`
      show, ep or title is empty
      unprocessed bits contains anything

    it cleans the show name
      it replaces special characters with a space
      it replaces special characters with nothing
      it removes the year (if present)

    it handles special case names
      it handles Archer (Year needed for Kodi)
      it handles Doctor Who
      it handles Planet Earth
      it handles Last Week Tonight
      it handles Marvelous Mrs. Maisel

  */
});