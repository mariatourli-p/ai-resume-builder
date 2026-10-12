/** Width and height of the saved photo, in pixels - sharp at 24mm in the PDF */
const PHOTO_SIZE = 320;

/** JPEG quality: keeps a photo around 20-40 KB */
const PHOTO_QUALITY = 0.85;

/**
 * Turns an uploaded image into a small square JPEG data URL, cropped from
 * the center. The resume is saved in localStorage (about 5 MB in total), so
 * a phone photo of several MB has to shrink before it is stored.
 *
 * @param file - The image the user picked
 * @returns A `data:image/jpeg;base64,...` URL
 * @throws If the file is not an image the browser can read
 *
 * @example
 * const photo = await resizePhoto(input.files[0]);
 */
export const resizePhoto = async (file: File): Promise<string> => {
  const image = await createImageBitmap(file);
  const side = Math.min(image.width, image.height);

  const canvas = document.createElement("canvas");
  canvas.width = PHOTO_SIZE;
  canvas.height = PHOTO_SIZE;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported.");

  // White behind transparent PNGs, which JPEG would turn black
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, PHOTO_SIZE, PHOTO_SIZE);
  context.drawImage(
    image,
    (image.width - side) / 2,
    (image.height - side) / 2,
    side,
    side,
    0,
    0,
    PHOTO_SIZE,
    PHOTO_SIZE,
  );
  image.close();

  return canvas.toDataURL("image/jpeg", PHOTO_QUALITY);
};
