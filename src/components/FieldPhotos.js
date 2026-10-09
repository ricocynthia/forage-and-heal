import { photosFor } from '../lib/media';

// Shown only when the species has at least one photo, either in src/photos/<species>/
// or sent by the API in a `photos` field. See src/photos/README.md.
export default function FieldPhotos({ item }) {
  const photos = photosFor(item);
  if (photos.length === 0) return null;

  return (
    <section className="field-photos">
      <div className="plate-title">
        <h2>From the field</h2>
        <span>photographs by Cynthia, to check against what you find</span>
      </div>
      <div className="prints">
        {photos.map((photo) => (
          <figure className="print" key={photo.src}>
            <div className="print-mount">
              <img src={photo.src} alt={photo.caption || `${item.name}, photographed in the field`} loading="lazy" />
            </div>
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
