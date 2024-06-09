<template>
	<Transition>
		<div v-if="isOpen"
			  @click.self="close"
			  class="modal-container">
			<dialog open
					  @click.stop
					  class="modal">
				<button @click="close"
						  class="modal-close">
					<img src="@/assets/icons/close.svg"
						  alt="Close modal" />
				</button>
				<slot></slot>
			</dialog>
		</div>
	</Transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	isOpen: Boolean,
})

// Close modal event
const emit = defineEmits(['close'])
const close = () => emit('close');

</script>

<style scoped>
.modal {
	position: relative;
	padding: 40px;
	background: white;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	border: 1px solid black;
	width: 100%;
	max-width: 800px;
}

.modal-container {
	z-index: 1100;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	padding: 20px;
	background: rgba(0, 0, 0, 0.25);
}

.modal-close {
	position: absolute;
	top: 10px;
	right: 10px;
	background: none;
	border: none;
	cursor: pointer;

	&:hover {
		opacity: 0.5;
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>