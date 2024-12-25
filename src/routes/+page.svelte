<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	const { data } = $props();
</script>

<main>
	<h1 class="text-accent">Rooms</h1>

	<div class="grid gap-5 grid-cols-[max-content_1fr_max-content]">
		<aside class="px-2">
			<h3>Browse Topics</h3>
			<hr />

			<ul class="capitalize *:text-sm grid gap-2 mt-3">
				<li><a href="/">All</a></li>
				{#each data.topics as topic (topic.id)}
					<li><a href="?topic={topic.name}">{topic.name}</a></li>
				{/each}
			</ul>
		</aside>

		<section>
			{#await data?.rooms}
				<p>loading rooms...</p>
			{:then rooms}
				<p>{rooms.length} rooms found!!!</p>
				{#each rooms as room (room.id)}
					<div>
						<span class="flex gap-2 items-center">
							{#if $page.data?.user && $page.data?.user?.id === room.host?.id}
								<a href="/rooms/{room.id}/edit" class="text-sm">edit</a>
								<form action="?/deleteRoom" method="post" use:enhance>
									<input type="hidden" name="hostId" value={room.host?.id} />
									<button
										value={room.id}
										name="id"
										class="cursor-pointer text-red-400 text-sm"
									>
										delete
									</button>
								</form>
							{/if}
							@{room.host?.username || "N/A"}
						</span>

						<a href="/rooms/{room.id}" class="block text-accent text-lg w-fit">
							{room.name}
						</a>
						<small>{room.topic?.name}</small>
					</div>
					<hr class="mb-5" />
				{:else}
					<p>no rooms created yet!!</p>
				{/each}
			{/await}
		</section>

		<aside class="px-2">
			<h3>Browse Topics</h3>
			<hr />

			<ul class="capitalize *:text-sm grid gap-2 mt-3">
				<li><a href="/">All</a></li>
				{#each data.topics as topic (topic.id)}
					<li><a href="?topic={topic.name}">{topic.name}</a></li>
				{/each}
			</ul>
		</aside>
	</div>
</main>
