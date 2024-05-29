<template>
	<Transition>
		<section id="report"
					@click="this.$emit('close-report')">

			<div class="content"
				  @click.stop>
				<strong class="title">Report</strong>
				<p>Here is a report of the route you have selected:</p>
			</div>
		</section>
	</Transition>
</template>


<script>
export default {
};
</script>

<style>
#report {
	z-index: 1100;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.25);

	& .content {
		padding: 20px;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>