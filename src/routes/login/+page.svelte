<script>
import { enhance } from "$app/forms";
import FormInput from "$lib/components/FormInput.svelte";
</script>

<section>
	<form action="" method="post" use:enhance>
		<fieldset class="grid gap-5">
			<legend>Login</legend>
			<FormInput name="username" label="Username" />
			<FormInput type="password" name="password" label="Password" />
			<button class="w-fit">Login</button>
		</fieldset>
	</form>
</section>
