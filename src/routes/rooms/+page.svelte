<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";

	export let data;

	$: currentTopic = $page.url.searchParams.get("topic");
</script>

<main>
	<h1 class="text-accent">Rooms</h1>

	<div class="grid gap-5 grid-cols-[max-content_1fr]">
		<aside class="px-2">
			<h3>Browse Topics</h3>
			<hr />

			<ul class="capitalize *:text-sm *:[li>a]">
				<li><a href="/rooms">All</a></li>
				{#each data.topics as topic (topic.id)}
					<li><a href="?topic={topic.name}">{topic.name}</a></li>
				{/each}
			</ul>
		</aside>

		<section>
			{#await data?.rooms}
				<p>loading rooms...</p>
			{:then rooms}
				<p>
					{rooms.length} rooms found {currentTopic && `for ${currentTopic}`}!!!
				</p>
				{#each rooms as room (room.id)}
					<div>
						<span class="flex gap-2">
							{#if $page.data?.user && $page.data?.user?.id === room.host?.id}
								<a href="/rooms/{room.id}/edit">edit</a>
								<form action="?/deleteRoom" method="post" use:enhance>
									<button value={room.id} name="id">delete</button>
								</form>
							{/if}
							@{room.host?.username || "N/A"}
						</span>
						<a href="/rooms/{room.id}" class="block text-accent">{room.name}</a>
						<small>{room.topic?.name}</small>
					</div>
					<hr />
				{:else}
					<p>
						no rooms {currentTopic ? `for ${currentTopic}` : "created yet!!"}!!
					</p>
				{/each}
			{/await}
		</section>
	</div>
</main>
