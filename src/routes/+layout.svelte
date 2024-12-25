<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import "../app.css";

	const { children } = $props();
</script>

<nav class="flex items-center justify-between py-5 max-w-6xl mx-auto">
	<a href="/" class="block text-lg font-semibold font-ptsans text-purple">
		BrainBuddy
	</a>

	<form action="" method="post" use:enhance>
		<input type="search" name="topic" class="text-sm rounded-sm" />
	</form>

	<ul class="flex gap-5 *:text-sm">
		<li><a href="/">Home</a></li>
		{#if !$page.data?.user}
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		{:else}
			<li><a href="/rooms/new">Create Room</a></li>
			<li>
				<form action="/?/logout" method="post" use:enhance>
					<button type="submit" class="cursor-pointer text-red-500">
						logout
					</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<main class="max-w-6xl mx-auto">
	{@render children?.()}
</main>
