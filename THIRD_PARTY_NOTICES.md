# Third-party notices

This project uses the open-source software and fonts below. All of them allow commercial use. Their full license texts ship with each package in `node_modules/<package>/LICENSE`.

## Fonts

The fonts are bundled with the app (via [Fontsource](https://fontsource.org)) and are not loaded from any third-party server.

| Font           | Used for                                 | License                   |
| -------------- | ---------------------------------------- | ------------------------- |
| Inter          | App interface, "Classic Modern" template | SIL Open Font License 1.1 |
| Literata       | "Executive Serif" template               | SIL Open Font License 1.1 |
| JetBrains Mono | "Technical Mono" template                | SIL Open Font License 1.1 |
| Space Grotesk  | App logo text                            | SIL Open Font License 1.1 |

The SIL Open Font License allows using, embedding and bundling the fonts in commercial products. The fonts themselves may not be sold on their own.

## Icons

| Package             | License |
| ------------------- | ------- |
| lucide-react        | ISC     |
| @mui/icons-material | MIT     |

## Libraries

| Package                                                                                 | License               |
| --------------------------------------------------------------------------------------- | --------------------- |
| react, react-dom                                                                        | MIT                   |
| @mui/material, @mui/x-date-pickers (community edition), @emotion/react, @emotion/styled | MIT                   |
| @reduxjs/toolkit, react-redux, redux-persist, zustand, react-router-dom                 | MIT                   |
| dayjs                                                                                   | MIT                   |
| @vercel/analytics (anonymous visit counts, no cookies)                                  | MIT                   |
| html2canvas                                                                             | MIT                   |
| jspdf                                                                                   | MIT                   |
| dompurify (used by jspdf)                                                               | MPL-2.0 or Apache-2.0 |
| pako (used by jspdf)                                                                    | MIT and Zlib          |

Every other package installed for production is MIT, ISC or BSD-3-Clause. Check with:

```bash
npx license-checker-rseidelsohn --production --summary
```

## AI model

The AI features use Gemini Nano, which Google builds into Chrome. It is not part of this project and is not distributed with it. Using it is subject to Google's terms, including the [Generative AI Prohibited Use Policy](https://policies.google.com/terms/generative-ai/use-policy).

## Colors

The resume accent colors are plain color values chosen for this project. Colors can't be copyrighted.

## Favicon and link preview image

`public/favicon.svg` and `public/og-image.png` (the picture shown when the link is shared, e.g. on LinkedIn) were made for this project. The image is a screenshot of the app with made-up sample data (no real person, company or school), and its text uses Inter (SIL Open Font License 1.1), the app's own font.
