export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dhtgf4e54';
  
  // If the src is already a full URL, return it
  if (src.startsWith('http')) {
    return src;
  }
  
  const params = [
    'f_auto',
    'q_auto',
    `w_${width}`,
  ].join(',');

  // Remove leading slash if it exists
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${cleanSrc}`;
}
