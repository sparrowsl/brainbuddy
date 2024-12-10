<script>
	import { enhance } from "$app/forms";

	export let data;
</script>

<form method="POST" use:enhance>
	<fieldset>
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
				cols="30"
				class="rounded text-sm"
			></textarea>
		</div>

		<button type="submit" class="block">Submit</button>
	</fieldset>
</form>
