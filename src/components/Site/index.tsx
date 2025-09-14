import type { ComponentChildren } from "preact";
import { Content } from "./Content";
import { PorviderComment } from "./ProviderComment";

interface Props {
  children: ComponentChildren;
  id: string;
}

export const AsideSite = (props: Props) => {
  return (
    <PorviderComment>
      <Content {...props} />
    </PorviderComment>
  );
};
