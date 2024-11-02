import styled from "@emotion/styled";
import { Camera } from "react-camera-pro";
import { useState, useRef, useEffect } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import { useLocation } from "react-router-dom";

import { RedButton } from "@/entities";
import { dataURLtoFile } from "@/configs";

const CameraPage = () => {
  const location = useLocation();
  console.log(location.state.mode);

  const camera = useRef<{
    width: string;
    height: string;
    takePhoto: () => React.SetStateAction<null>;
  }>(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      const formData = new FormData();
      formData.append("multipartFile", dataURLtoFile(image, "image"));
      //upload(formData);
    }
  }, [image]);

  return (
    <>
      <Target1>
        <img src="/icons/target1.svg" alt="target" />
      </Target1>
      <Target2>
        <img src="/icons/target2.svg" alt="target" />
      </Target2>
      <Target3>
        <img src="/icons/target3.svg" alt="target" />
      </Target3>
      <Target4>
        <img src="/icons/target4.svg" alt="target" />
      </Target4>
      <CameraContainer>
        <Camera
          ref={camera}
          errorMessages={{
            noCameraAccessible:
              "No camera device accessible. Please connect your camera or try a different browser.",
            permissionDenied:
              "Permission denied. Please refresh and give camera permission.",
            switchCamera:
              "It is not possible to switch camera to different one because there is only one video device accessible.",
            canvas: "Canvas is not supported.",
          }}
        />
        <SubmitButton
          onClick={() => {
            setImage(camera.current!.takePhoto());
          }}
        >
          <CameraIcon fontSize="large" />
        </SubmitButton>
      </CameraContainer>
    </>
  );
};

const CameraContainer = styled.div`
  height: 100%;
  div {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;

    z-index: -1;
  }
`;

const Target1 = styled.div`
  position: absolute;
  top: 50px;
  left: 37px;
`;

const Target2 = styled.div`
  position: absolute;
  top: 50px;
  right: 37px;
`;

const Target3 = styled.div`
  position: absolute;
  bottom: 120px;
  right: 37px;
`;

const Target4 = styled.div`
  position: absolute;
  bottom: 120px;
  left: 37px;
`;

const SubmitButton = styled(RedButton)`
  position: absolute;
  transform: translate(-50%, 0%);
  left: 50%;
  bottom: 30px;
`;

export default CameraPage;
