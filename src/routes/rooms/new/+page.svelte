<script>
	import { enhance } from "$app/forms";

	const { data } = $props();
</script>

<form method="POST" use:enhance>
	<fieldset class="grid gap-5 *:block">
		<div class="*:block">
			<label for="topicId">Topic:</label>
			<select name="topicId" id="topicId" class="rounded text-sm">
				<option value="" disabled selected>-------</option>
				{#each data.topics as topic (topic.id)}
					<option value={topic.id}>{topic.name}</option>
				{/each}
			</select>
		</div>

		<div class="*:block">
			<label for="name">Name:</label>
			<input type="text" id="name" name="name" class="text-sm rounded" />
		</div>

		<div class="*:block">
			<label for="description">Description</label>
			<textarea
				name="description"
				id="description"
				class="rounded text-sm min-h-20"
			></textarea>
		</div>

		<button type="submit" class="w-fit cursor-pointer">Submit</button>
	</fieldset>
</form>
