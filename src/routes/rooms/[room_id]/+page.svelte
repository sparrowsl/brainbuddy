<script>
	export let data;
</script>

<pre>
{JSON.stringify(data?.room, null, 2)}
</pre>

<h1>Room: {data.room?.name}</h1>
<p><a href="/rooms">back to rooms</a></p>
<!-- <h2></h2> -->
