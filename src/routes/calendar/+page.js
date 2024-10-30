export async function load({ fetch, params }) {
	// Fetch data from an external API or server
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
	const data = await response.json();

	// Return the data to be used in the Svelte component
	return {
		props: {
			data
		}
	};
}
