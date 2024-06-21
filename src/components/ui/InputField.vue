<template>
	<div class="input-field">
		<Tooltip :text="tooltip"
					position="top">
			<label :for="id">{{ label }}</label>
		</Tooltip>
		<span class="field">
			<input :id="id"
					 type="number"
					 inputmode="numeric"
					 :placeholder="placeholder"
					 :min="min"
					 :step="step"
					 :rounded="rounded"
					 :value="modelValue"
					 @change="handleInput"
					 @keypress="isNumber($event)"
					 dir="rtl" />
			<span class="unit">{{ unit }}</span>
		</span>
	</div>
</template>

<script>
import Tooltip from './Tooltip.vue';

export default {
	name: "InputField",
	props: {
		label: {
			type: String,
			default: "Label",
		},
		placeholder: {
			type: String,
			default: "",
		},
		min: {
			type: [String, Number],
			default: null,
		},
		modelValue: {
			type: [String, Number],
			default: "",
		},
		unit: {
			type: String,
			default: "",
		},
		id: {
			type: String,
			default: null,
		},
		step: {
			type: Number,
			default: 1,
		},
		rounded: {
			type: Number,
			default: 0,
		},
		tooltip: {
			type: String,
			default: "",
		},
	},
	methods: {
		isNumber(evt) {
			evt = (evt) ? evt : window.event;
			let charCode = (evt.which) ? evt.which : evt.keyCode;
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
			}
		},
		handleInput(event) {
			let value = event.target.value;
			if (value < this.min) {
				value = this.min;
			}
			this.updateValue(value);
		},
		updateValue(value) {
			if (value === "") {
				value = 0;
			}
			this.$emit('update:modelValue', parseFloat(value).toFixed(this.rounded));

		}
	},
	mounted() {
		this.updateValue(this.modelValue);
	},
	components: {
		Tooltip,
	},
};
</script>

<style>
.input-field {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 0.5rem;
}

label {
	margin: 0;
	flex: 1;
	margin-right: 20px;
}

input {
	flex: 2;
	padding: 5px;
	padding-bottom: 2px;
	margin-top: -5px;
	max-width: 60px;
	border: 0;
	border-bottom: 1px solid #ccc;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1rem;
	-moz-appearance: textfield;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}

.unit {
	font-size: 0.8rem;
	color: #888;
}
</style>