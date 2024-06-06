<template>
	<div class="input-field">
		<label :for="id">{{ label }}</label>
		<input :id="id"
				 :type="type"
				 :placeholder="placeholder"
				 :min="min"
				 :max="max"
				 :value="modelValue"
				 @input="$emit('update:modelValue', $event.target.value)"
				 :required="required"
				 :disabled="disabled" />
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
	},
};
</script>

<style scoped>
.input-field {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

label {
	margin: 0;
	flex: 1;
	font-weight: bold;
	margin-right: 20px;
}

input {
	flex: 2;
	padding: 8px;
	max-width: 75px;
	border: 0;
	border-bottom: 1px solid #ccc;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1rem;
}
</style>