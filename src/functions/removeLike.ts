import type { MutableRef } from "preact/hooks";
import { Methods, RoutesAPI } from "../utils/enums";
import type { QueryLike, UUID } from "../utils/types";

interface Props extends QueryLike {
  refLikeId: MutableRef<UUID | undefined>;
}

export const removeLike = ({ refLikeId, setCountLikes, setLike }: Props) => {
  fetch(`${RoutesAPI.LIKE}?id=${refLikeId.current}`, {
    method: Methods.DELETE
  })
    .then(async (res) => {
      // controlar mensaje de error
      if (!res.ok) {
        setLike(1);
        setCountLikes((prev) => (prev !== undefined ? prev + 1 : prev));
        return;
      }
      refLikeId.current = undefined;
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};
