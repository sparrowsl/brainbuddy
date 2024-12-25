<script>
	import { formatDistanceStrict } from "date-fns";

	const { data } = $props();
</script>

<section class="grid gap-10 grid-cols-[1fr_max-content]">
	<div>
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
							{formatDistanceStrict(
								new Date(String(comment.created)),
								Date.now(),
								{
									addSuffix: true,
									unit: "day",
								}
							)}
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
	</div>

	<aside class="px-2 min-w-80">
		<h3>Participants</h3>
		<hr />

		<section class="capitalize *:text-sm grid gap-2 mt-3">
			{#each { length: 5 }}
				<div class="bg-white p-2 rounded-sm text-xs">
					Lorem ipsum dolor sit amet.
				</div>
			{/each}
		</section>
	</aside>
</section>
