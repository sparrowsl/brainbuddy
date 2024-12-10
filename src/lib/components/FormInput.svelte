<script>
export const name = "";
export const id = "";
export const label = "";
export const type = "text";
export const value = "";
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
