<template>
	<div class="infoField">
		<Tooltip :text="text"
					position="top">
			<strong>{{ label }}</strong>
		</Tooltip>
		<span>
			{{ value }} {{ unit }}
		</span>
	</div>
</template>

<script>
import Tooltip from './Tooltip.vue';

export default {
	name: 'InfoField',
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: [String, Number],
			default: "",
		},
		unit: {
			type: String,
			default: "",
		},
		tooltip: {
			type: String,
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