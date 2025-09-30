<script lang="ts">
	import { setSocket } from './context';
	import { Socket } from './Socket';
	import { onMount } from 'svelte';
	
	interface Props {
		children?: import('svelte').Snippet;
		hostname?: string;
	}
	
	let { children, hostname = 'localhost' }: Props = $props();
	
	let socket: Socket | null = $state(null);
	
	onMount(() => {
		socket = new Socket({ hostname });
		setSocket(socket);
	});
</script>

{#if socket}
	{@render children?.()}
{/if}
