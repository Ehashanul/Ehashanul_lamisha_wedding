# Ehashanul & Lamisha's wedding invitation

Open `Index.html` in your browser to view the invitation. This is a static site with no build step.

Wedding date: Friday, 18 December 2026. The wedding begins at 1:30 PM Bangladesh time (UTC+6). The countdown uses this confirmed start time.

Edit the `wedding` object at the top of `script.js` to add the venue, address, time, Google Maps URL, and shared album URL. Directions and album buttons appear when their HTTPS URLs are configured. Edit the invitation text in `Index.html` and the design in `styles.css`.

The calendar shows the wedding date without a download button. The site does not collect RSVPs or upload guest photos; the shared album button connects to your chosen external album.

The vintage collage design is in `collage.css`. It uses the original maroon `#641f36`, torn off-white paper panels, an illustrated envelope, and a gold monogram seal. The earlier `hero.css` is retained but no longer loaded.

The hero now uses a pointed floral envelope and an embossed name plaque (`assets/name-plaque.svg`) with large script names. Visible torn-paper cards gently drift by 4px over 9–12 seconds. Visitors who enable reduced motion receive static cards.

Visitors first see a closed maroon envelope. Clicking the envelope or activating it with Enter/Space breaks the seal, opens the flap, and lifts a paper invitation before revealing the full page. Reduced-motion visitors receive a short reveal. The complete page remains available when JavaScript is disabled.

The opening sequence lasts approximately seven seconds and releases a copy of the actual ornate name plaque. Fixed flap layers and back-face hiding avoid flicker; the plaque's travel adapts to the viewport height. The full page appears through a slow crossfade after the plaque has emerged.

The hero no longer repeats the envelope. After extraction, the same animated plaque smoothly enlarges and travels into the exact position of the hero plaque while the envelope fades away. The opening screen uses the main invitation's toile background and color. Reduced-motion visitors receive a short transition.

Background music is the supplied `Loves Serenade.mp3`, copied to `assets/loves-serenade.mp3`. It starts from the envelope click, loops at 50% volume, and has an accessible bottom-right mute/unmute button. Each fresh page visit starts unmuted when opened.

Footer artwork: `assets/footer-floral-arch.png`, generated with the built-in ImageGen tool on a transparent background. Final prompt: “A transparent-background decorative floral wedding arch divider asset, wide landscape 3:2. An abundant semicircular upward arch garland of realistic painted ivory cream roses, pale blush peonies, tiny white flowers, sage eucalyptus leaves and muted olive foliage. Flowers span left to right and dip down at both ends, center highest, like an antique romantic wedding stationery floral border. Detailed watercolor and vintage oil-painting botanical aesthetic, soft natural shadows, delicate organic trailing foliage. Center lower area and all surrounding background fully transparent. No text, no lettering, no frame, no background, no lace. Flowers occupy the upper two-thirds, with a generous clear arch opening in the bottom center.”

Floral artwork: `assets/vintage-florals.jpg`, generated with the built-in ImageGen tool. Final prompt: “Create a text-free antique oil painting floral pattern asset for a vintage wedding envelope lining. Square image, edge to edge, ornate abundant cream garden roses, ivory peonies, blush peach roses, dark burgundy flowers, tiny pale blossoms and rich muted olive leaves, against a dark olive background. Painterly seventeenth-century botanical still-life, romantic historic European stationery, aged linen texture, detailed fine art. The flowers should fill the composition, with largest cream and peach flowers toward the center and lower half. No envelope, no frame, no words, no typography, no gold seal, no UI.”

Garden artwork: `assets/vintage-garden.jpg`, generated with the built-in ImageGen tool and exported as a compressed JPEG. The uncompressed original is retained in `.reference/vintage-garden-original.png`.

Final artwork prompt: “Create a text-free vintage oil painting landscape asset for a romantic antique wedding invitation website. Portrait 2:3 composition. Seventeenth century pastoral garden scenery in muted olive, taupe, ivory, faded brown, aged linen. Tall leafy trees framing the left and right sides, pale cloudy sky at center top, a distant small stone pavilion and a winding path in a lush garden at center bottom, serene South Asian garden atmosphere, subtle paper grain and aged engraving detail, painterly realistic fine-art style. Edge-to-edge painting. No typography, no letters, no envelope, no borders, no UI, no people. This will be cropped into a decorative arch and also used in grayscale as a faint toile wallpaper.”

Deploy this folder as a static project on Vercel with no build command. `vercel.json` maps the root URL to the existing `Index.html` filename. Google Fonts require an internet connection; system serif and cursive fonts provide fallbacks.
