import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import React from 'react';
import type { Area, Point } from 'react-easy-crop';
import Cropper from 'react-easy-crop';
import { BsZoomIn, BsZoomOut  } from 'react-icons/bs';
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai';

type Props = {
  show: boolean;
  onClose: () => void;
  source: string;
}

const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;
const MAX_ROTATION = 360;

export function CropperModal({ show, onClose, source }: Props) {

  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {

    console.log(croppedArea, croppedAreaPixels);

  };

  const handleOnRotation = React.useCallback((rotationValue: number) => {

    setRotation(rotationValue);

  }, []);

  return (
    <Dialog open={show} handler={onClose}>
      <DialogBody className='h-[300px] md:h-[600px] p-5'>
        <div className='w-80 bg-black'>
          <Cropper
            image={source}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            rotation={rotation}
            onRotationChange={handleOnRotation}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </DialogBody>
      <DialogFooter className='flex items-center justify-evenly'>

        <div className='flex w-full gap-4 items-center justify-end'>
          <AiOutlineRotateLeft onClick={() => {

            if (rotation > 0) setRotation(rotation - 1);

          }} />
          <AiOutlineRotateRight onClick={() => {

            if (rotation < MAX_ROTATION) setRotation(rotation + 1);

          }} />
          <BsZoomIn onClick={()=> {

            if (zoom < MAX_ZOOM) setZoom(zoom + ZOOM_STEP);

          }} />
          <BsZoomOut onClick={() => {

            if (zoom > 1) setZoom(zoom - ZOOM_STEP);

          }} />

          <Button
            variant="text"
            color="red"
            size='sm'
            onClick={onClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClose}>
            <span>Confirm</span>
          </Button>
        </div>

      </DialogFooter>
    </Dialog>
  );

}
