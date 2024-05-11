/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 📚 사용법
 *    1. const popUpManager = inject<PopUpManagerType>('popUpManager') 로 인스턴스를 주입받는다.
 *    2. popUpManager?.openPopUp<컴포넌트PropsType>(import한컴포넌트, Props객체)로 팝업을 띄운다.
 */
import { CommonPopUpPropsType } from "@/types/popUpComponentsPropsType";
import { Component, markRaw, reactive, readonly } from "vue";

type PopUpComponentType = Component | null;

export type PopUpManagerType = ReturnType<typeof usePopUpManager>;

interface PopUpState<T extends CommonPopUpPropsType = CommonPopUpPropsType> {
  component: PopUpComponentType;
  props: T;
  key: number;
}

const state = reactive<PopUpState[]>([]);

export const usePopUpManager = () => {
  const openPopUp = <T extends CommonPopUpPropsType = CommonPopUpPropsType>(
    component: PopUpComponentType,
    props?: Partial<T>,
    key = Date.now()
  ) => {
    // props인자를 안받으면 DEFUALT_PROPS를 넣는다
    const DEFAULT_PROPS: CommonPopUpPropsType = {
      isShow: true,
      close: closePopUp,
    };
    const finalProps = { ...DEFAULT_PROPS, ...props } as T;

    setTimeout(() => {
      state.push({
        component: markRaw(component as object),
        props: finalProps,
        key,
      });
    }, 200);
  };

  const closePopUp = () => {
    if (state.length === 0) return;

    state[state.length - 1].props.isShow = false;
    // primeVue Dialog 애니메이션 때문에 시간차를 위해 setTimeout을 사용
    setTimeout(() => {
      state.pop();
    }, 100);
  };

  const closeAll = () => {
    if (state.length === 0) return;
    state.splice(0, state.length);
  };

  return {
    state: readonly(state),
    openPopUp,
    closePopUp,
    closeAll,
  };
};
