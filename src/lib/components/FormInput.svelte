<script>
	export let name = "";
	export let id = "";
	export let label = "";
	export let type = "text";
	export let value = "";
</script>

<label for={name || id}>
	<span class="block">{label}</span>
	<input
		{type}
		{value}
		{name}
		id={name || id}
		class="{$$props.class} block text-sm rounded"
	/>
</label>
