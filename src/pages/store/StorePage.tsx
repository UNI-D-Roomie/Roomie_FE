import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { OrangeButton, RedButton, SubTitle } from "@/entities";
import styled from "@emotion/styled";
import { colors } from "@/configs";
import Item from "./element/Item";
import { useUserStore } from "@/stores/UserStore";
import { ItemProps } from "./dto";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const StorePage = () => {
  const [currentStep, setCurrentStep] = useState("default");
  const [roomie, setRoomie] = useState("기본");
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const nav = useNavigate();

  const point = useUserStore((state) => state.point);
  const setPoint = useUserStore((state) => state.setPoint);

  const items: ItemProps[] = [
    { name: "리본", image: "리본", price: 100 },
    { name: "선글라스", image: "선글라스", price: 200 },
  ];

  const item = items[currentItemIndex];

  // 아이템 착용 상태를 관리하는 객체
  const itemWearStates: { [key: string]: string } = {
    리본: "리본 착용 모델 경로",
    선글라스: "선글라스 착용 모델 경로",
  };

  // 아이템 전환 함수
  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePreviousItem = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleApplyItem = () => {
    setRoomie(itemWearStates[item.name]);
    setCurrentStep("itemApplied");
  };

  // 아이템 구매하기
  const handlePurchaseItem = async () => {
    try {
      if (point >= item.price) {
        /*
        const response = await axios.post("/api/points/deduct", {
          itemId: item.image, // 아이템 ID
          price: item.price, // 차감할 포인트
        });

        if (response.data.success) {
          setPoint(point - item.price); // 포인트 차감
          setCurrentStep("itemPurchased");
        */
        setPoint(point - item.price); // 포인트 차감
        setCurrentStep("itemPurchased");
      } else {
        alert("포인트가 부족합니다.");
      }
    } catch (error) {
      console.error("아이템 구매 오류:", error);
    }
  };

  const handleBackToDefault = () => {
    setCurrentStep("default");
    setRoomie("기본");
  };

  const handleBackToHome = () => {
    nav("/");
  };

  return (
    <Layout>
      {currentStep === "default" && (
        <>
          <SubTitle>
            모은 포인트로
            <br />
            루미를 꾸밀 아이템을 구매해보세요
          </SubTitle>
          <RoomieContainer currentStep={currentStep}>
            모델링 - {roomie}
          </RoomieContainer>
          <ItemContainer>
            <ArrowButton onClick={handlePreviousItem}>
              <StyledChevronLeftIcon />
            </ArrowButton>
            <Item name={item.name} image={item.image} price={item.price} />
            <ArrowButton onClick={handleNextItem}>
              <StyledChevronRightIcon />
            </ArrowButton>
          </ItemContainer>
          <ButtonContainer>
            <OrangeButton onClick={handleApplyItem}>
              아이템 착용하기
            </OrangeButton>
          </ButtonContainer>
        </>
      )}

      {currentStep === "itemApplied" && (
        <>
          <SubTitle>
            모은 포인트로
            <br />
            루미를 꾸밀 아이템을 구매해보세요
          </SubTitle>
          <RoomieContainer currentStep={currentStep}>
            모델링 - {roomie}
          </RoomieContainer>
          <ButtonContainer>
            <OrangeButton onClick={handlePurchaseItem}>
              아이템 구매하기
            </OrangeButton>
            <OrangeButton onClick={handleBackToDefault}>
              아이템 착용 해제하기
            </OrangeButton>
          </ButtonContainer>
        </>
      )}

      {currentStep === "itemPurchased" && (
        <>
          <SubTitle>아이템을 구매했어요 !</SubTitle>
          <RoomieContainer currentStep={currentStep}>
            모델링 - {roomie}
          </RoomieContainer>
          <ButtonContainer>
            <RedButton onClick={handleBackToHome}>홈으로 돌아가기</RedButton>
          </ButtonContainer>
        </>
      )}
    </Layout>
  );
};

export default StorePage;

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomieContainer = styled.div<{ currentStep: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: ${(props) => (props.currentStep === "default" ? "240px" : "280px")};
  width: 300px;
  height: 300px;
  background-color: #d9d9d9;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 120px;
  width: 230px;
  height: 160px;
  //background-color: #d9d9d9;
  border-radius: 8px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding-bottom: 26px;
`;

const StyledChevronLeftIcon = styled(ChevronLeftIcon)`
  font-size: 36px;
  color: ${colors.black};
`;

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  font-size: 36px;
  color: ${colors.black};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 44px;
  width: 100vw;
`;
