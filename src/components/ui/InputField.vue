<template>
	<div class="input-field">
		<label :for="id">{{ label }}</label>
		<input :id="id"
				 :type="type"
				 :placeholder="placeholder"
				 :min="min"
				 :max="max"
				 :step="step"
				 :rounded="rounded"
				 :value="modelValue"
				 @input="handleInput"
				 :required="required"
				 :disabled="disabled"
				 dir="rtl" />
		<span class="unit">{{ unit }}</span>
	</div>
</template>

<script>
export default {
	name: "InputField",
	props: {
		label: {
			type: String,
			default: "Label",
		},
		type: {
			type: String,
			default: "text",
		},
		placeholder: {
			type: String,
			default: "",
		},
		min: {
			type: [String, Number],
			default: null,
		},
		max: {
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
		required: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
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
	},
	methods: {
		handleInput(event) {
			this.updateValue(event.target.value);
		},
		updateValue(value) {
			if (!isNaN(value)) {
				this.$emit('update:modelValue', parseFloat(value).toFixed(this.rounded));
			}
		}
	},
	mounted() {
		this.updateValue(this.modelValue);
	},
};
</script>

<style scoped>
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
	max-width: 100px;
	border: 0;
	border-bottom: 1px solid #ccc;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1rem;
}

.unit {
	font-size: 0.8rem;
	color: #888;
}
</style>