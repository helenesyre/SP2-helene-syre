export function renderImageGallery(media) {
  const galleryContainer = document.getElementById('listing-images');
  const mainImage = document.createElement('img');
  const allImages = document.createElement('div');

  mainImage.src = media[0]?.url || 'https://placehold.co/400x300/dadada/aaa?text=No+image&font=open-sans';
  mainImage.alt = media[0]?.alt || 'Listing image';
  mainImage.className = 'w-full h-52 md:h-64 lg:h-80 xl:h-108 object-cover rounded-medium';

  allImages.className = 'flex gap-2 md:gap-4 mt-4 overflow-x-auto';
  media.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image.url;
    img.alt = image.alt || `Listing image ${index + 1}`;
    img.className = 'w-20 h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 xl:w-36 xl:h-28 object-cover rounded-default cursor-pointer flex-shrink-0 transition-listing-images';
    img.onclick = () => {
      mainImage.src = image.url;
      mainImage.alt = image.alt || `Listing image ${index + 1}`;
    };
    allImages.appendChild(img);
  });

  galleryContainer.appendChild(mainImage);
  if (media.length > 1) galleryContainer.appendChild(allImages);
}