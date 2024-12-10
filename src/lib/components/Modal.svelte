<script>
export const open = false;
</script>

<dialog {open} class={$$props.class} on:close>
	<slot />
</dialog>

<style>
	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
	}
</style>
