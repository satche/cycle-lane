<template>
	<div class="infoField">
		<Tooltip :text="tooltip"
					position="top">
			<span>{{ label }}</span>
		</Tooltip>
		<span>
			{{ value }} <span class="unit">{{ unit }}</span>
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

.unit {
	font-size: 0.8rem;
	color: #888;
}
</style>