<script>
	export let name = "";
	export let id = "";
	export let label = "";
	export let type = "text";
</script>

<label for={name || id}>
	<span class="block">{label}</span>
	<input {type} {name} {id} class="{$$props.class} block text-sm rounded" />
</label>
