<script>
	import { page } from "$app/stores";

	$: console.log($page.data);
</script>

<nav class="flex items-center justify-between">
	<a href="/" class="block text-lg">BrainBuddy</a>

	<ul class="flex gap-5">
		<li><a href="/rooms">Rooms</a></li>
		{#if !$page.data?.user}
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		{:else}
			<form action="">
				<button type="button">logout</button>
			</form>
		{/if}
	</ul>
</nav>
