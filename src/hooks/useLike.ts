import { useEffect, useRef, useState } from "preact/hooks";
import { addLike } from "../functions/addLike";
import { removeLike } from "../functions/removeLike";
import type { LikesData } from "../schemas/like";
import { STATE_MAP_LIKE, TIME_DEBOUNCE } from "../utils/const";
import { Methods, RoutesAPI } from "../utils/enums";
import type { StateLike, UUID } from "../utils/types";

export const useLike = ({ id }: { id: string }) => {
  const [like, setLike] = useState<StateLike>(STATE_MAP_LIKE.desactive);
  const [countLikes, setCountLikes] = useState<number | undefined>(undefined);
  const refLikeId = useRef<UUID>();
  const refDebounceLike = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (typeof like === STATE_MAP_LIKE.type && countLikes !== undefined)
      setCountLikes(like ? countLikes + 1 : countLikes - 1);

    if (like === STATE_MAP_LIKE.add && !refLikeId.current)
      refDebounceLike.current = setTimeout(() => {
        addLike({ id, refLikeId, setCountLikes, setLike });
      }, TIME_DEBOUNCE);

    if (like === STATE_MAP_LIKE.remove && refLikeId.current)
      refDebounceLike.current = setTimeout(() => {
        removeLike({ refLikeId, setCountLikes, setLike });
      }, TIME_DEBOUNCE);

    return () => {
      clearTimeout(refDebounceLike.current);
    };
  }, [like]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`${RoutesAPI.LIKE}?id=${id}`, {
      method: Methods.GET,
      signal
    })
      .then(async (res) => {
        if (!res.ok) return;

        const LIKES_DATA: LikesData = await res.json();

        if (LIKES_DATA.id) {
          setLike(STATE_MAP_LIKE.active);
          refLikeId.current = LIKES_DATA.id as UUID;
        }

        setCountLikes(LIKES_DATA.count);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleLike = () => {
    // if (!sessionStore.value?.email)
    //   return alert("Error: Inicia sesión para dar me gusta");
    if (countLikes !== undefined) setLike((prev) => !prev);
  };

  return { countLikes, like, handleLike };
};
