<script>
	import { enhance } from "$app/forms";

	const { data } = $props();
</script>

<form method="POST" use:enhance>
	<fieldset class="grid gap-5 *:block">
		<div class="*:block">
			<label for="topicId">Topic:</label>
			<select name="topicId" id="topicId" class="rounded text-sm">
				{#each data?.topics as topic (topic.id)}
					<option value={topic.id} selected={topic.id === data.room?.topicId}>
						{topic.name}
					</option>
				{/each}
			</select>
		</div>

		<div class="*:block">
			<label for="name">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				class="rounded text-sm"
				value={data.room?.name}
			/>
		</div>

		<div class="*:block">
			<label for="description">Description</label>
			<textarea
				name="description"
				id="description"
				value={data.room?.description}
				class="rounded text-sm min-h-20"
			></textarea>
		</div>

		<button type="submit" class="w-fit cursor-pointer text-sm">Submit</button>
	</fieldset>
</form>
