<template>
	<section id="infoPane"
				:class="{ isOpen: isOpen }">

		<button class="infoPane_toggleButton"
				  aria-label="Open information pane"
				  @click="isOpen = !isOpen">
			<img src="@/assets/icons/chevron-left.svg"
				  alt="Chevron left icon" />
		</button>

		<button class="infoPane_questionButton"
				  aria-label="Open onboarding modal"
				  @click="openOnboarding">
			<img src="@/assets/icons/question.svg"
				  alt="Question mark icon" />
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
					  v-if="data.startMarker && data.endMarker"
					  class="btn">
				🔖 Générer le rapport
			</button>
		</div>

	</section>
</template>

<script>
import InfoMarker from './InfoMarker.vue';
import Route from './InfoRoute.vue';
import { calculateSteepness } from '../../scripts/utils.js';

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
			const steepness = calculateSteepness(
				this.data.route.features[0].properties.ascent,
				this.data.route.features[0].properties.descent,
				this.data.route.features[0].properties.summary.distance,
				true
			);
			const reportData = {
				markers: [
					this.data.startMarker,
					this.data.endMarker
				],
				routeLength: this.data.route.features[0].properties.summary.distance,
				routeSteepness: steepness,
				irradiation: this.data.irradiation,
			};

			this.$emit('generate-report', reportData);
		},

		openOnboarding() {
			this.$emit('open-onboarding');
		},
	},
};
</script>

<style>
#infoPane {
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	max-width: 600px;
	height: 100vh;
	padding: 40px;
	padding-top: 60px;
	z-index: 1000;
	background: white;
	transform: translateX(100%);
	transition: transform 0.3s ease-out;
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

.infoPane_questionButton {
	position: absolute;
	top: 16px;
	right: 20px;
	width: 30px;
	height: 30px;
	padding: 0;
	border: none;
	background: none;
	opacity: 0.4;

	&>img {
		position: absolute;
		top: calc(50% - 13px);
		left: calc(50% - 13px);
		width: 30px;
		height: 30px;
		z-index: 10;
	}

	&:hover {
		cursor: pointer;
		opacity: 1;
	}

}

#infoPane.isOpen {
	transform: translateX(0);

	& .infoPane_toggleButton {
		width: 0;
		left: 0;
		border: 0.5px solid black;
		/* I'm not sure why, but it's visually better like this */

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
		width: 100px;
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
}

@media (max-width: 768px) {
	#infoPane {
		top: auto;
		bottom: 0;
		width: 100vw;
		max-width: 100%;
		height: 50vh;
		transform: translateX(0) translateY(calc(100% - 10px));
		padding: 10px;

		&.isOpen .infoPane_toggleButton {
			width: 100vw;
			height: 0;

			&>img {
				transform: rotate(-90deg) translateX(25px) translateY(-15px);
			}

			&::after {
				border-bottom: 1px solid white;
				left: auto;
				right: auto;
			}
		}

		& hr {
			margin: 5px 0;
			margin-bottom: 10px;
		}
	}

	.infoPane_toggleButton {
		top: 0px;
		left: 0;
		right: 0;
		width: 100vw;
		height: 50px;
		border-bottom: 0;

		&>img {
			top: 0;
			left: auto;
			right: auto;
			transform: rotate(90deg) translateX(-25px) translateY(15px);
		}

		&:hover {
			cursor: pointer;
			transform: translateX(-0) translateY(-10px);
		}

		&::after {
			top: -13px;
			right: auto;
			left: auto;
			width: 60px;
			height: 25px;
			border: 1px solid black;
			border-bottom: 0;
			border-radius: 10px 10px 0 0;
		}
	}

	.infoPane_questionButton {
		top: auto;
		left: auto;
		bottom: 8px;
		right: 8px;
	}

	#infoPane_markers .separator {
		width: 0px;
		overflow: hidden;
		padding: 0;
		margin: 0 5px;
	}

	.title {
		font-size: 0.9rem;
	}
}
</style>