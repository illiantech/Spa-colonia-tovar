import type { MutableRef } from "preact/hooks";
import { Methods, RoutesAPI } from "../utils/enums";
import type { QueryLike, UUID } from "../utils/types";

interface Props extends QueryLike {
  refLikeId: MutableRef<UUID | undefined>;
}

export const addLike = ({ id, refLikeId, setCountLikes, setLike }: Props) => {
  const LIKE_DATA = {
    siteId: id,
    id: crypto.randomUUID()
  };

  fetch(`${RoutesAPI.LIKE}`, {
    method: Methods.POST,
    body: JSON.stringify(LIKE_DATA)
  })
    .then(async (res) => {
      // controlar mensaje de error
      if (!res.ok) {
        setLike(0);
        setCountLikes((prev) => (prev !== undefined ? prev - 1 : prev));
        return;
      }

      refLikeId.current = LIKE_DATA.id;
    })
    .catch((err) => {
      console.log(err);

      alert(err);
    });
};
