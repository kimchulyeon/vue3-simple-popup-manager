<template>
  <Teleport to="body">
    <template v-if="popUpManager">
      <div
        v-for="popup in popUpManager.state"
        :key="popup.key"
        class="modal-container"
      >
        <component :is="popup.component" v-bind="popup.props" />
      </div>
    </template>
  </Teleport>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { PopUpManagerType } from "@/composables/usePopUpManager";

const popUpManager = inject<PopUpManagerType>("popUpManager");
</script>
