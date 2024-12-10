<script>
	import { enhance } from "$app/forms";
</script>

<section>
	<form action="" method="post" use:enhance>
		<fieldset class="grid gap-5 *:block">
			<legend class="text-2xl text-accent font-semibold mb-5">Login</legend>

			<div class="*:block">
				<label for="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					class="rounded text-sm"
				/>
			</div>

			<div class="*:block">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					class="rounded text-sm"
				/>
			</div>

			<button
				type="submit"
				class="w-fit bg-accent text-sm text-white font-semibold px-6 py-2 rounded"
			>
				Login
			</button>
		</fieldset>
	</form>
</section>
