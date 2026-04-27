# Goals
- Create an app that visualizes a temperature blanket for a chosen span of time with a chosen amount of custom colors
- Connect to a weather API

## NOTES TO MYSELF
- Update form input to:
  - validate input type
- Issues:
  - Zip code only works with strictly numeric zip codes
    - This is a limitation of the geocoding API (ex: when you search for Toronto, it's postal code of 'M5V 3L9' does not appear in the json). I'll have to look into this more later as it's a minor issue that won't impact playtesting for a personal and private project. After looking into this, I've returned the input to numeric rather than alpha.
    - After looking even more into this, I have discovered that the zip codes stored here are unreliable (ex: searching 79109, an Amarillo, TX zip code, returns a city in France. The Amarillo json does not include that zip code...) I will be re-doing this with city name and will:
      - **RETURN** to add validation (list top 10 matches and have the user select the correct one)

### Acknowledgements & References
- CSS Reset from [Josh Comeau](https://www.joshwcomeau.com/css/custom-css-reset/)
- [BEM structure](https://getbem.com/naming/)
- [Javascript-friendly BEM](https://medium.com/trabe/a-more-javascript-friendly-bem-naming-convention-75c7f01ff736)
  - Block: PascalCase
  - Element: camelCase_oneUnderscore
  - Modifier: camelCase___threeUnderscores