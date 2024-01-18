<script>
	import { enhance } from "$app/forms";

	export let data;
</script>

<h1>Rooms</h1>
<p>back <a href="/">Home</a></p>
<p><a href="/rooms/new">Create Room</a></p>

<section>
	{#each data?.rooms as room (room.id)}
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
</section>
