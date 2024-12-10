<script>
	import { formatDistanceStrict } from "date-fns";

	const { data } = $props();
</script>

<h1>Room: {data.room?.name}</h1>
<h2>
	Hosted by <span class="text-blue-600">@{data.room?.host?.username}</span>
</h2>
<p class="whitespace-pre-wrap">{data.room?.description}</p>
<p>{data.room?.topic?.name}</p>
<hr />

<h2 class="font-semibold uppercase text-gray-700">Conversation</h2>

{#await data.comments}
	<p>loading comments...</p>
{:then comments}
	{#each comments as comment (comment.id)}
		<figure class="">
			<h3>
				<span>@{comment.user?.username}</span>
				<span class="text-gray-700 text-sm italic">
					{formatDistanceStrict(new Date(String(comment.created)), Date.now(), {
						addSuffix: true,
						unit: "day",
					})}
					{comment.created}
				</span>
			</h3>
			<figcaption>
				<p>{comment.body}</p>
			</figcaption>
		</figure>
	{:else}
		<p>no comments yet</p>
	{/each}
{/await}
