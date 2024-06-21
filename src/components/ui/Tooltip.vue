<template>
	<div class="tooltip-container"
		  v-if="text !== ''"
		  @mouseenter="showTooltip"
		  @mouseleave="hideTooltip">
		<slot></slot>
		<div v-if="visible"
			  class="tooltip-content"
			  :style="tooltipStyle">
			{{ text }}
		</div>
	</div>

	<div v-else>
		<slot></slot>
	</div>

</template>

<script>
export default {
	name: 'Tooltip',
	props: {
		text: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			default: 'top', // possible values: top, right, bottom, left
		},
	},
	data() {
		return {
			visible: false,
		};
	},
	computed: {
		tooltipStyle() {
			switch (this.position) {
				case 'top':
					return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' };
				case 'right':
					return { top: '50%', left: '100%', transform: 'translateY(-50%)' };
				case 'bottom':
					return { top: '100%', left: '50%', transform: 'translateX(-50%)' };
				case 'left':
					return { top: '50%', right: '100%', transform: 'translateY(-50%)' };
				default:
					return {};
			}
		},
	},
	methods: {
		showTooltip() {
			this.visible = true;
		},
		hideTooltip() {
			this.visible = false;
		},
	},
};
</script>

<style scoped>
.tooltip-container {
	position: relative;
	display: inline-block;
	border-bottom: 1px dotted black;
	cursor: help;
}

.tooltip-content {
	position: absolute;
	background-color: #333;
	color: #fff;
	padding: 5px 10px;
	border-radius: 5px;
	z-index: 10;
	font-size: 12px;
	width: 175px;
}

.tooltip-content::after {
	content: '';
	position: absolute;
	border-style: solid;
}

.tooltip-content[style*="bottom: 100%"]::after {
	top: 100%;
	left: 50%;
	border-width: 5px 5px 0;
	border-color: #333 transparent transparent transparent;
	transform: translateX(-50%);
}

.tooltip-content[style*="top: 100%"]::after {
	bottom: 100%;
	left: 50%;
	border-width: 0 5px 5px;
	border-color: transparent transparent #333 transparent;
	transform: translateX(-50%);
}

.tooltip-content[style*="left: 100%"]::after {
	right: 100%;
	top: 50%;
	border-width: 5px 0 5px 5px;
	border-color: transparent transparent transparent #333;
	transform: translateY(-50%);
}

.tooltip-content[style*="right: 100%"]::after {
	left: 100%;
	top: 50%;
	border-width: 5px 5px 5px 0;
	border-color: transparent #333 transparent transparent;
	transform: translateY(-50%);
}
</style>