'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import Heading from '@/modules/common/Heading';
import { useUploadThing } from '@/libs/uploadthing';
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';
import { Loader2 } from 'lucide-react';
import { cn } from '@/libs/utils';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const fileTypes = {
  'image/jpeg': [],
  'image/png': [],
  'image/webp': [],
};

interface ListingImageUploadProps {
  imageSrc?: string;
  onUploadSuccess: (imageUrl: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

export const ListingImageUpload: FC<ListingImageUploadProps> = ({
  imageSrc,
  onUploadSuccess,
  onUploadStart,
  onUploadEnd,
}) => {
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState(0);

  const imageUrl = useMemo(
    () => preview || imageSrc || undefined,
    [preview, imageSrc]
  );

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      onUploadEnd!();
      setProgress(0);

      if (res != null) {
        const file = res[0];
        onUploadSuccess(file.fileUrl);
      }
    },
    onUploadError: (error: Error) => {
      onUploadEnd!();
      setPreview(undefined);
      if (error.message == null) {
        toast.error('Upload failed');
      } else {
        toast.error(error.message);
      }
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast.error('Too many files!');
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const image = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setPreview(image.preview);
        startUpload(acceptedFiles);
        onUploadStart!();
      }
    },
    [onUploadStart, startUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    accept: fileTypes,
  });

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
      <div
        className={cn(
          [
            'relative flex h-[350px] w-full cursor-pointer items-center justify-center rounded-lg outline-dashed outline-2 outline-black',
          ],
          [isUploading && 'pointer-events-none'],
          [preview != null ? 'cursor-default' : 'cursor-pointer']
        )}
      >
        {isUploading === false && imageUrl != null ? (
          <Image
            src={imageUrl}
            className="object-fill"
            alt="Nextbnb listing"
            fill={true}
          />
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps({ multiple: false })} />
            {isUploading ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin text-orange-400" />
                <p className="ml-2 mr-1 font-semibold text-orange-400">
                  Uploading image:
                </p>
                <p className="text-orange-400">{progress}%</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <BiImageAdd className="mb-4 text-black" size={48} />
                <p className="font-semibold text-orange-400">
                  Drag an image or click to select one. (1MB Max)
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingImageUpload;
