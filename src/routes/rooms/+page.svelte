<script>
	import { enhance } from "$app/forms";

	export let data;
</script>

<main>
	<h1>Rooms</h1>
	<p>back <a href="/">Home</a></p>
	<p><a href="/rooms/new">Create Room</a></p>

	<div class="grid gap-5 grid-cols-[max-content_1fr]">
		<aside class="px-2">
			<h3>Browse Topics</h3>
			<hr />

			<ul class="capitalize">
				<li><a href="?topic=all">all</a></li>
				{#each data.topics as topic (topic.id)}
					<li><a href="?topic={topic.name.toLowerCase()}">{topic.name}</a></li>
				{/each}
			</ul>
		</aside>

		<section>
			{#await data?.rooms}
				<p>loading rooms...</p>
			{:then rooms}
				{#each rooms as room (room.id)}
					<div>
						<span>
							<a href="/rooms/{room.id}/edit">edit</a>
							<form action="?/deleteRoom" method="post" class="inline" use:enhance>
								<button value={room.id} name="roomId">delete</button>
							</form>
							@{room.host?.username || "N/A"}
						</span>
						<p><a href="/rooms/{room.id}">{room.name}</a></p>
						<small>{room.topic?.name}</small>
					</div>
					<hr />
				{/each}
			{/await}
		</section>
	</div>
</main>
