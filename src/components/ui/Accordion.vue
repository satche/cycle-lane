<template>
	<details>
		<summary @click="toggleDetail">{{ buttonText }}</summary>
		<div v-if="showDetail"
			  class="detail-content">
			<slot></slot>
		</div>
	</details>
</template>

<script>
export default {
	data() {
		return {
			showDetail: false,
		};
	},
	computed: {
		buttonText() {
			return this.showDetail ? "Cacher les détails" : "Ajouter des détails pour améliorer la précision de la note";
		},
	},
	methods: {
		toggleDetail() {
			this.showDetail = !this.showDetail;
		},
	},
};
</script>

<style>
details {
	margin-top: -5px;
	margin-bottom: 25px;

	font-size: 0.8rem;

	& .input-field {
		margin-bottom: 10px;
	}

	& .input-field,
	label,
	input {
		font-size: 0.8rem;
	}
}

summary {
	color: #666;
	cursor: pointer;
}

.detail-content {
	margin-top: 5px;
}

@media (max-width: 768px) {
	details {
		font-size: 0.9rem;
		margin-top: 10px;

		& .input-field,
		label,
		input {
			font-size: 0.9rem;
			margin-right: 0;
		}

		label {
			display: inline-block;
			max-width: 50vw;
		}
	}

	.detail-content {
		margin-top: 15px;
		font-size: 0.9rem;
	}
}
</style>