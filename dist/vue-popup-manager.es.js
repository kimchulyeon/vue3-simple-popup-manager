import { reactive, readonly, markRaw, defineComponent, inject, openBlock, createBlock, Teleport, unref, createElementBlock, Fragment, renderList, resolveDynamicComponent, mergeProps, createCommentVNode } from "vue";
const state = reactive([]);
const usePopUpManager = () => {
  const openPopUp = (component, props, key = Date.now()) => {
    const DEFAULT_PROPS = {
      isShow: true,
      close: closePopUp
    };
    const finalProps = { ...DEFAULT_PROPS, ...props };
    setTimeout(() => {
      state.push({
        component: markRaw(component),
        props: finalProps,
        key
      });
    }, 200);
  };
  const closePopUp = () => {
    if (state.length === 0)
      return;
    state[state.length - 1].props.isShow = false;
    setTimeout(() => {
      state.pop();
    }, 100);
  };
  const closeAll = () => {
    if (state.length === 0)
      return;
    state.splice(0, state.length);
  };
  return {
    state: readonly(state),
    openPopUp,
    closePopUp,
    closeAll
  };
};
const _sfc_main = defineComponent({
  __name: "PopUpManageComponent",
  setup(__props) {
    const popUpManager = inject("popUpManager");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        unref(popUpManager) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(popUpManager).state, (popup) => {
          return openBlock(), createElementBlock("div", {
            key: popup.key,
            class: "modal-container"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(popup.component), mergeProps({ ref_for: true }, popup.props), null, 16))
          ]);
        }), 128)) : createCommentVNode("", true)
      ]);
    };
  }
});
export { _sfc_main as PopUpManageComponent, usePopUpManager };
