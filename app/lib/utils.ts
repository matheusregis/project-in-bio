import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import imageCompression from 'browser-image-compression';

export function cn(...input: ClassValue[]) {
  return twMerge(clsx(input));
}

export function sanitizeLink(link?: string) {
  if (!link) return "";

  return link
    .replace(/\s/g, "")
    .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,ˆ.<>\/?]+/, "")
    .toLocaleLowerCase();
}

export async function compressFiles(files: File[]) {
  const compressPromises = files.map(async (file) => {
    try {
      return await compressImage(file);
    } catch (error) {
      console.error(error);
      return null
    }
  })

  return (await Promise.all(compressPromises)).filter((file) => file !== null);
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 900,
      useWebWorker: true,
      fileType: "image/png",
    }
    imageCompression(file, options).then((compressedFile) => {
      resolve(compressedFile);
    })
  })
}