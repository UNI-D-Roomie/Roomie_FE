import { AxiosResponse } from "axios";
import { API, FORMAPI } from "@/configs";
import { useUserStore } from "@/stores/UserStore";

export const UserService = () => {
  const URL = "/roomie";
  const setIsRibbon = useUserStore((state) => state.setIsRibbon);
  const setRoomieTalkMsg = useUserStore((state) => state.setRoomieTalkMsg);
  const setPoint = useUserStore((state) => state.setPoint);
  const setName = useUserStore((state) => state.setName);
  const setHungryGauge = useUserStore((state) => state.setGauge);

  const fetchRoomieCurrent = async () => {
    let callCount = 0; // Counter for the number of API calls

    const fetchData = async () => {
      try {
        const response = await API.get<User.RoomieResponse>(`/roomie/home`);

        if (response.data) {
          if (callCount === 0) {
            setPoint(response.data.points);
            setHungryGauge(response.data.hungerGage);
            setIsRibbon(response.data.isRibbon);
            setName(response.data.name);
            setRoomieTalkMsg(response.data.roomieTalkMsg);
          } else {
            setHungryGauge(response.data.hungerGage);
          }

          callCount += 1;

          if (callCount >= 4) {
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error("Failed to fetch Roomie data:", error);
        clearInterval(interval);
      }
    };

    const interval = setInterval(fetchData, 1500);
    fetchData();
  };

  const upload = async (body: FormData) => {
    const { data } = (await FORMAPI.post(
      `/storage`,
      body
    )) as AxiosResponse<string>;

    return data;
  };

  const startDish = async (url: string) => {
    await API.post(
      `${URL}/feed/wash-dish/before`,
      {},
      {
        headers: {
          beforeWashImage: url,
        },
      }
    );
  };

  const endDish = async (url: string) => {
    const { data } = (await API.post(
      `${URL}/feed/wash-dish/after`,
      {},
      {
        headers: {
          afterWashImage: url,
        },
      }
    )) as AxiosResponse<{ score: number; comment: string }>;
    return data;
  };

  const endRoom = async (url: string) => {
    const { data } = (await API.post(
      `${URL}/feed/room`,
      {},
      {
        headers: {
          afterRoomImage: url,
        },
      }
    )) as AxiosResponse<{ score: number; comment: string }>;
    return data;
  };

  const setImg = async (url: string) => {
    await API.post(
      `/member/room-image`,
      {},
      {
        headers: {
          imageUrl: url,
        },
      }
    );
  };

  const buyRiboon = async () => {
    await API.put(`${URL}/buy-riboon`);

    setIsRibbon(true);
  };

  return {
    fetchRoomieCurrent,
    upload,
    startDish,
    endDish,
    endRoom,
    setImg,
    buyRiboon,
  };
};
