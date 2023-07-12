'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

import { UploadDropzone } from '@/libs/uploadthing';

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onImageUploadComplete: (url: string) => void;
  onUploadProgess: (progress: number) => void;
  onImageUploadError?: (message: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploadComplete,
  onUploadProgess,
  onImageUploadError,
}) => {
  return (
    <UploadDropzone
      endpoint="imageUploader"
      onUploadProgress={onUploadProgess}
      onClientUploadComplete={(res) => {
        if (res != null) {
          const uploadedFile = res[0];
          onImageUploadComplete(uploadedFile.fileUrl);
        }
      }}
      onUploadError={(error: Error) => {
        onImageUploadError!(error.message);
      }}
    />
  );
};

export default ImageUpload;
