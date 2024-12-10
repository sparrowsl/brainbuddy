<script>
import { enhance } from "$app/forms";
import FormInput from "$lib/components/FormInput.svelte";

export let data;
</script>

<form method="POST" use:enhance>
	<fieldset>
		<label for="topic">
			<span class="block">Topic:</span>
			<select name="topic" id="topic" class="rounded text-sm block">
				{#each data?.topics as topic (topic.id)}
					<option value={topic.id} selected={topic.id === data.room?.topicId}>{topic.name}</option>
				{/each}
			</select>
		</label>

		<FormInput label="Name:" name="name" value={data.room?.name} />

		<label for="description">
			<span class="block">Description:</span>
			<textarea
				name="description"
				id="description"
				value={data.room?.description}
				cols="30"
				class="rounded text-sm block"
			></textarea>
		</label>

		<button class="block">Submit</button>
	</fieldset>
</form>
