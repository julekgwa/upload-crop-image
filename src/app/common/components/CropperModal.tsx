import { Button, Dialog, DialogBody, DialogFooter, Input, Spinner } from '@material-tailwind/react';
import React from 'react';
import type { Area, Point } from 'react-easy-crop';
import Cropper from 'react-easy-crop';
import { BsZoomIn, BsZoomOut  } from 'react-icons/bs';
import { AiOutlineRotateLeft, AiOutlineRotateRight } from 'react-icons/ai';
import Tesseract from 'tesseract.js';

type Props = {
  show: boolean;
  onClose: () => void;
  source: string;
}

const MAX_ZOOM = 3;
const ZOOM_STEP = 0.1;
const MAX_ROTATION = 360;

function degreesToRadians(degrees: number): number {

  return (degrees * Math.PI) / 180;

}

function rotateSize(width: number, height: number, rotation: number) {

  const rotRad = degreesToRadians(rotation);

  return {
    boxWidth:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    boxHeight:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };

}

export function CropperModal({ show, onClose, source }: Props) {

  const desiredWidth = 600;
  const desiredHeight =600;
  const [crop, setCrop] = React.useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [isValidId, setIsValidId] = React.useState<boolean>();
  const [canvasData, setCanvasData] = React.useState<HTMLCanvasElement | null>(null);
  const [idNumber, setIdNumber] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const validateID = async() => {

    try {

      setIsValidId(undefined);
      setIsLoading(true);
      const { data: { text } } = await Tesseract.recognize(canvasData, 'eng', {
        // tessedit_char_whitelist: '0123456789', // Recognize only digits (for South African ID)
      });

      setIsValidId(text.trim().includes(idNumber));

    } catch (error) {

      console.log(error);

    } finally {

      setIsLoading(false);

    }

  };

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {

    try {

      if (!croppedAreaPixels) return;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const image = new Image();

      image.crossOrigin = 'anonymous';

      image.onload = () => {

        // set the size for canvas

        const { boxWidth, boxHeight } = rotateSize(
          image.width,
          image.height,
          rotation
        );

        const rotRad = degreesToRadians(rotation);

        canvas.width = boxWidth;
        canvas.height = boxHeight;

        ctx.translate(boxWidth / 2, boxHeight / 2);
        ctx.rotate(rotRad);
        ctx.translate(-image.width / 2, -image.height / 2);

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(image, 0, 0);

        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');

        if (!croppedCtx) return;

        const { x, y, width, height } = croppedAreaPixels;

        croppedCanvas.width = desiredWidth;
        croppedCanvas.height = desiredHeight;
        croppedCtx.drawImage(
          canvas,
          x,
          y,
          width,
          height,
          0,
          0,
          desiredWidth,
          desiredHeight
        );

        setCanvasData(croppedCanvas);

      };

      image.src = source;

    } catch (error) {

      console.log(error);

    }

  };
  const handleOnRotation = React.useCallback((rotationValue: number) => {

    setRotation(rotationValue);

  }, []);

  return (
    <Dialog open={show} handler={onClose}>
      <DialogBody className='h-[300px] md:h-[600px] p-5'>
        <div className='bg-black w-80'>
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
      <DialogFooter className='flex flex-col items-start'>

        <div className='flex items-center gap-4 justify-evenly '>
          <Input crossOrigin={false} label='ID number' onChange={e => setIdNumber((e.target.value))} />
          {isValidId === undefined ? '' : isValidId ? <p className='font-bold text-green-600 !w-20'>Valid ID</p> : <p className='!w-24 text-red-600 font-bold'>Invalid ID</p>}
        </div>

        <div className='flex items-center justify-end w-full gap-4'>
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
          <Button disabled={!idNumber} className='flex items-center gap-2' variant="gradient" color="green" onClick={validateID}>
            {isLoading && <Spinner />}
            <span>Validate</span>
          </Button>
        </div>

      </DialogFooter>
    </Dialog>
  );

}
