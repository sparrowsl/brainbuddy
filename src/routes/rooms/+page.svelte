<script>
	export let data;
</script>

<h1>Rooms</h1>
<p>back <a href="/">Home</a></p>

<pre>
{JSON.stringify(data?.rooms, null, 2)}
</pre>

<div>
	{#each data.rooms as room}
		<p><a href="/rooms/{room.id}">{room.name}</a></p>
	{/each}
</div>
