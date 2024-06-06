<template>
	<section id="infoPane"
				:class="{ isOpen: isOpen }">

		<button class="infoPane_toggleButton"
				  aria-label="Open information pane"
				  @click="isOpen = !isOpen">
			<img src="@/assets/icons/chevron-left.svg"
				  alt="" />
		</button>

		<div id="infoPane_markers">
			<InfoMarker :data="data.startMarker" />
			<div class="separator">……</div>
			<InfoMarker :data="data.endMarker" />
		</div>

		<hr>

		<Route :data="data.route" />

		<div id="infoPane_reportButton">
			<button @click="generateReport"
					  v-if="data.startMarker && data.endMarker">
				🔖 Générer le rapport
			</button>
		</div>

	</section>
</template>

<script>
import InfoMarker from './InfoMarker.vue';
import Route from './InfoRoute.vue';

export default {
	props: {
		data: Object,
	},

	components: {
		InfoMarker,
		Route,
	},

	data() {
		return {
			isOpen: false,
		};
	},

	watch: {
		// Open the info pane when the first marker is selected
		'data.startMarker': {
			handler: function (newVal, oldVal) {
				if (newVal !== null) {
					this.isOpen = true;
				}
			},
		},
	},

	methods: {
		generateReport() {
			const reportData = {
				routeLength: this.data.route.features[0].properties.summary.distance,
				routeWidth: 3,
				routeTickness: 0.12,
				materialVolumeMass: 2.5,
				materialImpact: 0.5,
			};
			this.$emit('generate-report', reportData);
		},
	},
};
</script>

<style>
#infoPane {
	position: absolute;
	top: 0;
	right: 0;
	width: 500px;
	height: 100vh;
	padding: 40px;
	z-index: 1000;
	background: white;
	transform: translateX(100%);
	transition: transform 0.3s ease-out;
}

@media (max-width: 768px) {
	#info-pane {
		top: auto;
		bottom: 0;
		width: 100vw;
		height: 50vh;
	}
}

.infoPane_toggleButton {
	position: absolute;
	top: 0;
	left: -20px;
	width: 40px;
	height: 100%;
	padding: 0;
	border: none;
	background: white;
	border: 1px solid black;
	transition: transform 0.2s ease-out;

	&>img {
		position: absolute;
		top: calc(50% - 13px);
		left: -25px;
		z-index: 10;
	}

	&:hover {
		cursor: pointer;
		transform: translateX(-10px);
	}

	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: calc(50% - 32px);
		width: 25px;
		height: 60px;
		background: white;
		border: 1px solid black;
		border-right: 0;
		border-radius: 10px 0 0 10px;
		transform: translate(-50%, -50%);
	}
}

#infoPane.isOpen {
	transform: translateX(0);

	& .infoPane_toggleButton {
		width: 0;
		left: 0;

		&:hover {
			transform: translateX(0);
		}

		&::after {
			left: -12px;
		}

		&>img {
			transform: rotate(180deg);
		}
	}
}

#infoPane_markers {
	display: flex;
	justify-content: space-between;
	margin-bottom: 0px;

	& .separator {
		width: 50px;
		padding: 0 15px;
		height: 100%;
		text-align: center;
		align-self: center;
		color: #919191;
	}
}

#infoPane hr {
	margin: 10px 0;
	border: 1px solid #e0e0e0;
}

.title {
	font-size: 1.1rem;
	font-weight: bold;
}

#infoPane_reportButton {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 30px;

	& button {
		padding: 10px 20px;
		color: black;
		background: white;
		border: 1px solid black;
		border-radius: 5px;
		font-size: 1rem;
		font-weight: bold;
		transition: all 0.2s ease;

		&:hover {
			transform: translateY(-3px);
			background: white;
			box-shadow: 0px 3px 0px rgb(0, 0, 0);
			cursor: pointer;
		}

		&:active {
			transform: translateY(0px);
			box-shadow: 0px 0px 0px rgb(0, 0, 0);
		}
	}
}
</style>