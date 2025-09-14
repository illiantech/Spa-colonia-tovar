import { useContext, useRef, useState, type RefObject } from "preact/compat";
import { ENTER, MAX_INPUT } from "@/utils/const";

import type { MutableRef } from "preact/hooks";
import { addComment } from "@/functions/addComment";
import { updateComment } from "@/functions/updateComment";
import { edit, input, options } from "@/store/featuresComment";
import { SendIcon } from "../resources/icons";
import { CommentActionsContext, CommentsContext } from "./ProviderComment";

interface Props {
  refContainerAside: RefObject<HTMLDivElement>;
  id: string;
  refInput: MutableRef<string>;
}

export const FormComment = ({ id, refContainerAside, refInput }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const actions = useContext(CommentActionsContext);
  const comments = useContext(CommentsContext);
  const refForm = useRef<HTMLFormElement>(null);

  const handleForm = (e?: SubmitEvent) => {
    e?.preventDefault();
    const containerAside = refContainerAside.current;

    if (input.value.trim().length === 0) {
      input.value = "";
      refForm.current?.reset();
      return alert("Error: No puedes enviar un comentario vacio");
    }

    // if (!sessionStore.value?.email)
    //   return alert("Error: Inicia sesión para comentar o editar");

    if (edit.value) {
      if (refInput.current === input.value) {
        options.value = undefined;
        edit.value = undefined;
        input.value = "";
        return;
      }

      if (!isLoading && comments)
        updateComment({
          actions,
          setIsLoading,
          id
        });

      return;
    }

    if (!isLoading && comments && containerAside)
      addComment({
        id,
        actions,
        container: containerAside,
        setIsLoading
      });
  };

  const handleInput = (e: KeyboardEvent) => {
    const { target } = e;

    if (!e.shiftKey && e.key === ENTER) {
      handleForm();
      return;
    }

    if (!(target instanceof HTMLTextAreaElement)) return;

    input.value = target.value;
  };

  return (
    <form
      onSubmit={handleForm}
      ref={refForm}
      class="fixed bottom-0 z-40 grid w-full grid-cols-[3fr_0.5fr] place-items-end items-center gap-y-1 border-t border-neutral-700 bg-neutral-950 px-4 pb-1 pt-2 lg:absolute lg:grid-rows-[repeat(3_1fr)] lg:rounded-br-md"
    >
      <div class="absolute w-0 lg:relative lg:h-[2lh] lg:w-full"></div>
      <textarea
        disabled={isLoading}
        required
        value={input.value}
        placeholder="Agrega un comentario..."
        autoComplete="off"
        class="h-[2lh] w-full resize-none place-content-center bg-neutral-950 focus-visible:outline-none lg:row-start-2"
        onKeyUp={handleInput}
        maxLength={MAX_INPUT}
        // joke XD
        minLength={MAX_INPUT / MAX_INPUT}
      />
      <button
        title={isLoading ? "Enviando..." : "Comentar"}
        class="aspect-square w-7 text-sm font-bold text-current lg:row-start-2"
      >
        <SendIcon stroke={isLoading ? "#656B77" : undefined} />
      </button>
      <span class="w-full text-xs opacity-60 lg:row-start-3">
        {input.value.length}/200
      </span>
    </form>
  );
};
