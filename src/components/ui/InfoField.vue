<template>
	<div class="infoField">
		<Tooltip :text="text"
					position="top">
			<strong>{{ label }}</strong>
		</Tooltip>
		<span>
			{{ value }}
		</span>
	</div>
</template>

<script>
import Tooltip from './Tooltip.vue';

export default {
	name: 'InfoField',
	props: {
		text: {
			type: String,
			default: "",
		},
		label: {
			type: String,
			default: "",
		},
		value: {
			type: [String, Number],
			default: "",
		},
	},
	components: {
		Tooltip,
	},
};

</script>

<style scoped>
.infoField {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}
</style>