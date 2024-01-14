<script>
	export let data;
</script>

<h1>Rooms</h1>
<p>back <a href="/">Home</a></p>
<p><a href="/rooms/new">Create Room</a></p>

<section>
	{#each data.rooms as room}
		<div>
			<span>@{room.host?.username}</span>
			<p><a href="/rooms/{room.id}">{room.name}</a></p>
			<small>{room.topic?.name}</small>
		</div>
		<hr />
	{/each}
</section>
