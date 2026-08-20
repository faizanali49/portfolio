const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

const cloudinaryUrl = (
  resourceType: 'image' | 'video',
  publicId: string | undefined,
  fallback: string,
) => {
  const asset = publicId?.trim()
  if (!asset) return fallback
  if (asset.startsWith('https://res.cloudinary.com/')) return asset
  if (!cloudName || /^v\d+$/.test(asset)) return fallback

  const transformations = resourceType === 'image'
    ? 'f_auto,q_auto'
    : 'f_mp4,q_auto,vc_h264'

  return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformations}/${asset}`
}

const imageUrl = (publicId: string | undefined, fallback: string) =>
  cloudinaryUrl('image', publicId, fallback)

const videoUrl = (publicId: string | undefined, fallback: string) =>
  cloudinaryUrl('video', publicId, fallback)

export const heroMedia = {
  orbitImages: [
    { label: 'before coding days i was happy', src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_1_ID, '/images/orbit/orbit-1.jpg') },
    { label: 'back in old days 🚀', src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_2_ID, '/images/orbit/orbit-2.jpg') },
    { label: 'party day 📺', src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_3_ID, '/images/orbit/orbit-3.jpg') },
    { label: 'graduation day ⚡', src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_4_ID, '/images/orbit/orbit-4.jpg') },
    { label: 'last day of university ✨', src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_5_ID, '/images/orbit/orbit-5.jpg') },
    { label: "let's move in mountains", src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_6_ID, '/images/orbit/orbit-6.jpg') },
    { label: 'Stucked in code 🛠️', src: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_ORBIT_7_ID, '/images/orbit/orbit-7.jpg') },
  ],
  avatars: [
    imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_AVATAR_1_ID, '/images/avatar/avatar-1.png'),
    imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_AVATAR_2_ID, '/images/avatar/avatar-2.png'),
    imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_AVATAR_3_ID, '/images/avatar/avatar-3.png'),
    imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_AVATAR_4_ID, '/images/avatar/avatar-4.png'),
  ],
}

export const projectMedia = {
  tkstream: {
    cover: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_COVER_ID, '/images/projects/tkstream-cover.jpg'),
    gallery: [
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_COVER_ID, '/images/projects/tkstream-cover.jpg'),
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_1_ID, '/images/projects/tkstream-1.jpg'),
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_2_ID, '/images/projects/tkstream-2.jpg'),
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_3_ID, '/images/projects/tkstream-3.jpg'),
    ],
    video: videoUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_VIDEO_ID, '/videos/tkstream-demo.mp4'),
    preview: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_TKSTREAM_PREVIEW_ID, '/images/projects/tkstream-preview.jpg'),
  },
  glamgo: {
    cover: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_COVER_ID, '/images/projects/glamgo-cover.jpg'),
    gallery: [
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_COVER_ID, '/images/projects/glamgo-cover.jpg'),
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_1_ID, '/images/projects/glamgo-1.jpg'),
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_2_ID, '/images/projects/glamgo-2.jpg'),
      imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_3_ID, '/images/projects/glamgo-3.jpg'),
    ],
    video: videoUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_VIDEO_ID, '/videos/glamgo-demo.mp4'),
    preview: imageUrl(process.env.NEXT_PUBLIC_CLOUDINARY_GLAMGO_PREVIEW_ID, '/images/projects/glamgo-preview.jpg'),
  },
}