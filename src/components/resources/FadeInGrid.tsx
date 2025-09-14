import { toChildArray, type ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export const FadeInGrid = ({ children }: Props) => {
  return (
    <div>
      {toChildArray(children).map((item, i) => {
        return <div key={i} style={{}}></div>;
      })}
    </div>
  );
};
