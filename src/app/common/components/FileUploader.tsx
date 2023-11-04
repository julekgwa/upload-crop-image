import { useDropzone } from 'react-dropzone';
import UploadIcon from '/svg/upload-icon.svg';
import React from 'react';
import { CropperModal } from 'common';

export function FileUploader() {

  const [localImage, setLocalImage] = React.useState('');
  const [showImageCropper, setShowImageCropper] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {

    setShowImageCropper(true);
    setLocalImage(URL.createObjectURL(acceptedFiles[0]));

  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { 'image/*': [], }, onDrop });

  return (
    <>
      <CropperModal source={localImage} show={showImageCropper} onClose={() => setShowImageCropper(false)} />
      <div className={`border-2 border-dashed flex flex-col items-center p-7 bg-pale rounded-md ${isDragAccept ? 'border-lime-green' : isDragReject ? 'border-vivid-red' : 'border-moderate-blue'} border-opacity-30`} {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <img className='w-16 mb-6' src={UploadIcon} alt="upload icon" />
        <p className='font-bold text-xs md:text-base'>Drag & drop files or <span className='text-moderate-blue underline'>Browse</span></p>
        <p className='text-[10px] md:text-xs text-dark-grey'>Supported formates: JPEG, PNG</p>
      </div>
    </>
  );

}
