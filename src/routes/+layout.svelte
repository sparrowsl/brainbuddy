<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import "../app.css";
</script>

<nav class="flex items-center justify-between py-5 container mx-auto">
	<a href="/" class="block text-lg font-bold font-ptsans">BrainBuddy</a>

	<ul class="flex gap-5 *:text-sm">
		<li><a href="/">Home</a></li>
		<li><a href="/rooms">Rooms</a></li>
		{#if !$page.data?.user}
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		{:else}
			<li><a href="/rooms/new">Create Room</a></li>
			<li>
				<form action="" method="post" use:enhance>
					<button type="button">logout</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<main class="container mx-auto">
	<slot />
</main>
